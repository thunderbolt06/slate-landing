#!/bin/bash
# Push May 3 blog posts: procrastination + research papers + visual learners
cd "$(dirname "$0")"

echo "Clearing stale git locks..."
rm -f .git/index.lock .git/HEAD.lock .git/MERGE_HEAD
git worktree prune 2>/dev/null

echo "Fetching latest..."
git fetch origin

echo "Switching to main and resetting..."
git checkout main 2>/dev/null || git checkout -b main origin/main
git reset --hard origin/main

echo "Re-adding new blog posts (in case reset removed them)..."
# Files were already written to frontend/content/blog/ before this script ran.
# If reset wiped them, this script will need to be re-run after re-writing.

echo "Rebuilding blog registry..."
cd frontend && node scripts/build-blog-data.mjs && cd ..

echo "Staging new posts..."
git add \
  frontend/content/blog/how-ai-helps-overcome-procrastination-2026.md \
  frontend/content/blog/how-to-read-research-papers-faster-with-ai-2026.md \
  frontend/content/blog/ai-tools-for-visual-learners-2026.md \
  frontend/src/generated/blogRegistry.js

git commit -m "blog: add 3 SEO posts - procrastination + research papers + visual learners (May 3)"
git push origin main
echo "Done! Posts live on main."
