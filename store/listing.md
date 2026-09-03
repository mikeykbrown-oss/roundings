# Roundings — App Store Connect listing

Paste-ready copy for the App Store Connect record. Character limits are Apple's.

## App information

| Field | Value |
|---|---|
| Name (30) | Roundings — Race Timer |
| Subtitle (30) | Mark roundings to live results |
| Bundle ID | com.michaelbrown.roundings |
| SKU | roundings-ios |
| Primary category | Sports |
| Secondary category | Utilities |
| Age rating | 4+ (no objectionable content) |
| Price | Free (or paid — decide before submitting; can be changed later) |
| Copyright | 2026 Michael Brown |
| Support URL | https://mikeykbrown-oss.github.io/roundings/ |
| Privacy policy URL | https://mikeykbrown-oss.github.io/roundings/privacy.html |
| Marketing URL (optional) | https://mikeykbrown-oss.github.io/roundings/ |

## Promotional text (170)

Tap each boat as it rounds the mark and watch the corrected-time leaderboard update live. ORC certificates built in; IRC and PHRF by hand. Results straight to PDF.

## Description (4000)

Roundings turns a phone into a race timer and live scoreboard for handicap yacht racing. Built for the navigator who wants to know where the boat really stands at every mark, and for the race officer who needs clean results the moment the last boat finishes.

HOW IT WORKS
Set up the course and the fleet before the start. Hit Start at the gun, or run the built-in five-minute sequence and sync it to the committee boat's flags. Then tap a boat's button each time it rounds a mark. That is all the input the app needs.

At every rounding, Roundings applies each boat's handicap and re-sorts the fleet on corrected time. Your own boat gets a big PING button, so you can log your own roundings without taking your eyes off the racecourse for long.

HANDICAPS BUILT IN
ORC certificate data for 33 countries is bundled with the app: International, Club, Non-Spinnaker and Double-Handed families. Pick a country, pick a certificate type, and tick the boats in your fleet. Every scoring figure on the certificate comes with them, labelled exactly as printed on the certificate itself.

Time-on-time scoring uses ORC ToT, TMF, Triple Number, or IRC TCC figures. Time-on-distance uses ORC GPH, Triple Number ToD, or PHRF, with distances entered per mark. Manual handicaps work for any other system.

RE-RATE AFTER THE RACE
Sailed a windward-leeward but scored on the coastal figure? Switch the whole fleet, or a single class, to any certificate figure after racing, and the leaderboard, CSV and PDF all recompute instantly.

FOR THE RACE BRIDGE
Multi-fleet mode runs rolling starts for several classes from one screen. Each fleet gets its own gun or countdown, elapsed times are measured from each fleet's own start, and results are scored per fleet. One tap per boat, whichever class it is in.

RESULTS YOU CAN HAND OVER
Export a results sheet as PDF for the noticeboard, or copy the fleet as CSV for a spreadsheet. Fix a mis-timed rounding in the log with either the clock time from your GPS or the elapsed time from the start. Skip mode advances a boat past a mark you missed so the rest of its race still scores.

WORKS WITHOUT SIGNAL
Everything runs on the phone. No account, no subscription, no data leaves the device unless you choose to export it.

FEATURES
• Immediate start or five-minute sequence with sync buttons
• One tap per boat per mark; own-boat PING button
• Live corrected-time leaderboard with gaps to the leader
• ORC certificate import for 33 countries, all certificate families
• Time-on-time and time-on-distance scoring
• Re-rate the fleet to any certificate figure after the race
• Multi-fleet rolling starts with per-fleet scoring
• Editable log with GPS clock time or elapsed time
• Skip mode for missed roundings
• PDF results sheet and CSV export
• Race archive
• Fully offline

## Keywords (100, comma-separated, no spaces)

sailing,yacht,regatta,timer,ORC,IRC,PHRF,handicap,corrected,leaderboard,scoring,navigator,fleet,tactics

## What's new (version 1.0)

First release. Tap mark roundings, get a live corrected-time leaderboard. ORC certificates built in, multi-fleet starts, post-race re-rating, PDF and CSV results.

## App Review notes

No sign-in is required. To try the app: on the Setup tab, tap Add boat to enter two or three boats with any rating (1.000 is fine), then on the Race tab tap Start and tap each boat's button to log roundings. The Board tab shows corrected results. Works fully offline.

## App privacy questionnaire

- Data collection: **No, we do not collect data from this app.**
- Third-party analytics/advertising: none.
- Encryption: uses only standard HTTPS; `ITSAppUsesNonExemptEncryption` is already set to false in Info.plist, so no export documentation is needed.

## Screenshots

Six iPhone 6.9" screenshots (1320 × 2868, the only iPhone size Apple now requires; it scales them for smaller phones) are in `store/screenshots/`, rendered from the seeded demo race at native pixel density. Upload in this order:

1. Race — "One tap per boat, per mark"
2. Board — "Corrected time, live"
3. Setup — "ORC certificates built in, re-rate after the race"
4. Log — "Fix a rounding from your GPS clock"
5. Countdown — "Five-minute sequence, synced to the flags"
6. Multi-fleet — "Rolling starts for the race bridge"

The app is iPhone-only for 1.0 (`TARGETED_DEVICE_FAMILY = 1`), so no iPad screenshots are needed. iPads can still install it in compatibility mode. Adding a proper iPad layout later means switching the target back to "1,2" and supplying 13" iPad shots (2064 × 2752).

To regenerate after UI changes: `npm run sync`, inject `store/seed.js` into `ios/App/App/public/index.html`, and capture either from the simulator or with headless Chromium at 440 × 956 CSS px, device scale 3.

## Before first upload

- Bundle ID `com.michaelbrown.roundings` becomes permanent once the app record exists in App Store Connect. It is never shown to users; it only needs to be unique. Fine to keep.
- Set your Apple Developer team under Signing & Capabilities in Xcode.
- Version 1.0, build 1 (in the Xcode target's General tab). Bump the build number for every upload.

## Google Play listing

Assets in `store/android/`: six phone screenshots (1080 × 2160, within Play's 2:1 limit), `feature-graphic-1024x500.png` (required), and the 512 × 512 icon is `store/app-icon-1024.png` downscaled (Play accepts 512 only; resize before upload or use `assets/icon-only.png` via `sips -z 512 512`).

| Field | Value |
|---|---|
| App name (30) | Roundings — Race Timer |
| Short description (80) | Tap mark roundings, get a live corrected-time leaderboard. ORC built in. |
| Full description (4000) | Reuse the App Store description above verbatim |
| Category | Sports |
| Content rating | Complete the IARC questionnaire; answers are all "no" → Everyone |
| Data safety | No data collected, no data shared |
| Privacy policy | https://mikeykbrown-oss.github.io/roundings/privacy.html |
| Package name | com.michaelbrown.roundings |

### Build and sign

```
npm run android:bundle
```

Produces `android/app/build/outputs/bundle/release/app-release.aab`, signed with the upload key in `~/roundings-keys/upload-keystore.jks`. The passwords are in `~/roundings-keys/keystore.properties` (a copy sits gitignored at `android/keystore.properties`). **Back up the `~/roundings-keys` folder somewhere safe.** With Play App Signing (the default when you create the app) Google holds the real signing key, so a lost upload key can be reset via support, but it is a slow process.

Bump `versionCode` in `android/app/build.gradle` for every upload; Play rejects a reused code.

### Play Console facts to know before you start

- One-time USD 25 registration at play.google.com/console, with identity verification.
- Personal developer accounts created after November 2023 must run a **closed test with at least 12 testers opted in for 14 continuous days** before Google grants production access. Plan for that: recruit club sailors as testers via the closed-testing link.
- Google reviews the first release; typically a few days.
