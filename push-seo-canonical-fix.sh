#!/bin/bash
# SEO fix: remove hardcoded canonical + add per-page meta injection postbuild
# Run this from the slate-landing root to commit and push the changes.

cd "$(dirname "$0")"

echo "Clearing stale git locks..."
rm -f .git/index.lock .git/HEAD.lock

echo "Pulling latest from origin..."
git pull origin main --rebase

echo "Staging SEO changes..."
git add \
  frontend/public/index.html \
  frontend/scripts/inject-page-meta.mjs \
  frontend/package.json

git commit -m "seo: remove hardcoded canonical + add per-page meta injection postbuild

- Remove <link rel=\"canonical\"> from index.html — was telling Google
  every page (all 70+ blog posts, features, etc.) was a duplicate of
  the homepage. This is the root cause of zero pages indexed.
- Add scripts/inject-page-meta.mjs: post-build script that writes a
  per-route index.html with correct title, description, canonical and
  OG/Twitter tags for every blog post and key static page.
- Add postbuild npm script so Vercel runs meta injection automatically
  on every deploy."

git push origin main
echo "Done! SEO fix is live."
