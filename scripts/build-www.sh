#!/bin/sh
# Assemble the native web bundle in www/ from the repo root.
# GitHub Pages serves the root directly; the native apps get this copy.
# sw.js is deliberately left out: WKWebView has no service worker on the
# capacitor:// scheme, and the native bundle is already offline.
set -e
cd "$(dirname "$0")/.."
rm -rf www
mkdir -p www
cp index.html manifest.webmanifest icon-192.png icon-512.png apple-touch-icon.png www/
cp -R vendor data www/
echo "www/ built: $(du -sh www | cut -f1)"
