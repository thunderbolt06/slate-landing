#!/bin/bash
# Push May 1 blog posts: psychology students + CLAT law entrance India
cd "$(dirname "$0")"

echo "Clearing stale git locks..."
rm -f .git/index.lock .git/HEAD.lock .git/MERGE_HEAD
git worktree prune 2>/dev/null

echo "Resetting to origin/main..."
git fetch origin
git reset --hard origin/main

echo "Rebuilding blog registry..."
cd frontend && node scripts/build-blog-data.mjs && cd ..

echo "Staging new posts..."
git add \
  frontend/content/blog/ai-tools-psychology-students-2026.md \
  frontend/content/blog/ai-tools-clat-law-entrance-india-2026.md \
  frontend/src/generated/blogRegistry.js

git commit -m "blog: add 2 SEO posts - psychology students + CLAT prep India (May 1)"
git push origin main
echo "Done! Posts live on main."
