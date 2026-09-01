#!/usr/bin/env python3
"""Mirror ORC RMS certificate data into data/orc/ as slim per-country JSON files.

Downloads each country's full certificate file from data.orc.org, keeps only
identity + scoring fields (drops polar tables and regional scoring variants,
~95% of the bytes), and writes an index the app uses for its country picker.
"""
import json, os, sys, time, urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import datetime, timezone

COUNTRIES = [
    ("ORC", "International (ORC)"), ("AUS", "Australia"), ("AUT", "Austria"),
    ("BRA", "Brazil"), ("BUL", "Bulgaria"), ("CAN", "Canada"), ("CYP", "Cyprus"),
    ("DEN", "Denmark"), ("ESP", "Spain"), ("EST", "Estonia"), ("FIN", "Finland"),
    ("FRA", "France"), ("GBR", "Great Britain"), ("GER", "Germany"), ("GRE", "Greece"),
    ("HUN", "Hungary"), ("IRL", "Ireland"), ("ISR", "Israel"), ("ITA", "Italy"),
    ("JPN", "Japan"), ("KOR", "Korea"), ("LTU", "Lithuania"), ("NED", "Netherlands"),
    ("NOR", "Norway"), ("POR", "Portugal"), ("RSA", "South Africa"), ("SLO", "Slovenia"),
    ("SUI", "Switzerland"), ("SWE", "Sweden"), ("UKR", "Ukraine"),
    ("USA", "United States"), ("MU_", "Multihulls"), ("SY_", "Superyachts"),
]

KEEP = ["YachtName", "SailNo", "Class", "CertNo", "IssueDate", "GPH",
        "TMF_Inshore", "TMF_Offshore",
        "TN_Inshore_Low", "TN_Inshore_Medium", "TN_Inshore_High",
        "TN_Offshore_Low", "TN_Offshore_Medium", "TN_Offshore_High",
        "TND_Inshore_Low", "TND_Inshore_Medium", "TND_Inshore_High",
        "TND_Offshore_Low", "TND_Offshore_Medium", "TND_Offshore_High"]

URL = "https://data.orc.org/public/WPub.dll?action=DownRMS&ext=json&Family=ORC&CountryId={}"
OUT = os.path.join(os.path.dirname(__file__), "..", "data", "orc")


def fetch(cid, name):
    req = urllib.request.Request(URL.format(cid), headers={"User-Agent": "roundings-app-mirror"})
    for attempt in (1, 2):
        try:
            with urllib.request.urlopen(req, timeout=300) as r:
                raw = r.read().decode("utf-8-sig")
            d = json.loads(raw)
            boats = [{k: c.get(k) for k in KEEP} for c in d.get("rms", [])]
            boats.sort(key=lambda b: (b.get("YachtName") or "").upper())
            return cid, name, boats
        except Exception as e:
            if attempt == 2:
                print(f"  FAIL {cid}: {e}", file=sys.stderr)
                return cid, name, None
            time.sleep(5)


def main():
    os.makedirs(OUT, exist_ok=True)
    now = datetime.now(timezone.utc).strftime("%Y-%m-%d")
    index = []
    with ThreadPoolExecutor(max_workers=6) as ex:
        futs = [ex.submit(fetch, cid, name) for cid, name in COUNTRIES]
        for f in as_completed(futs):
            cid, name, boats = f.result()
            if boats is None:
                # keep a previously mirrored file rather than dropping the country
                path = os.path.join(OUT, cid + ".json")
                if os.path.exists(path):
                    old = json.load(open(path, encoding="utf-8"))
                    index.append({"id": cid, "name": name, "count": len(old.get("boats", [])), "updated": old.get("updated")})
                continue
            path = os.path.join(OUT, cid + ".json")
            with open(path, "w", encoding="utf-8") as fh:
                json.dump({"country": cid, "updated": now, "boats": boats}, fh, separators=(",", ":"))
            index.append({"id": cid, "name": name, "count": len(boats), "updated": now})
            print(f"  {cid}: {len(boats)} certificates")
    index.sort(key=lambda x: x["name"])
    with open(os.path.join(OUT, "index.json"), "w", encoding="utf-8") as fh:
        json.dump({"updated": now, "countries": index}, fh, separators=(",", ":"))
    print(f"index: {len(index)} countries")
    # fail the workflow only if we got nothing at all
    if not index:
        sys.exit(1)


if __name__ == "__main__":
    main()
