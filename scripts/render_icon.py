#!/usr/bin/env python3
"""Render the Roundings app icon (flat sun + two sails) at any size.
Geometry is the 512px original measured pixel-for-pixel; drawn 4x
supersampled so edges are crisp at 1024 for the App Store.
Usage: render_icon.py SIZE OUT.png
"""
import sys
from PIL import Image, ImageDraw

BG, SUN, MAIN, JIB = "#081420", "#ff7a33", "#ffffff", "#eff2f1"

def render(size):
    ss = 4
    S = 512 * ss                         # work in 512-space, supersampled
    k = lambda v: v * ss
    im = Image.new("RGB", (S, S), BG)
    d = ImageDraw.Draw(im)
    cx, cy, r = 255.5, 255, 204
    d.ellipse([k(cx - r), k(cy - r), k(cx + r), k(cy + r)], fill=SUN)
    d.rectangle([0, k(378), S, S], fill=BG)              # flat horizon
    d.polygon([(k(133), k(348)), (k(271), k(101)), (k(271), k(348))], fill=MAIN)
    d.polygon([(k(291), k(152)), (k(291), k(348)), (k(389), k(348))], fill=JIB)
    return im.resize((size, size), Image.LANCZOS)

if __name__ == "__main__":
    size, out = int(sys.argv[1]), sys.argv[2]
    render(size).save(out, optimize=True)
    print(out, size)
