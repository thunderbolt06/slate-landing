#!/bin/bash
# Push May 2 blog posts: CBSE learning apps + how to learn fast with AI
cd "$(dirname "$0")"

echo "Clearing stale git locks..."
rm -f .git/index.lock .git/HEAD.lock .git/MERGE_HEAD
git worktree prune 2>/dev/null

echo "Resetting to origin/main..."
git fetch origin
git reset --hard origin/main

echo "Copying new blog posts..."
# Blog posts already written to frontend/content/blog/ by Claude
# Just need to rebuild the registry and push

echo "Rebuilding blog registry..."
cd frontend && node scripts/build-blog-data.mjs && cd ..

echo "Staging new posts..."
git add \
  frontend/content/blog/best-ai-learning-apps-cbse-students-2026.md \
  frontend/content/blog/how-to-learn-anything-fast-with-ai-2026.md \
  frontend/src/generated/blogRegistry.js

git commit -m "blog: add 2 SEO posts - CBSE learning apps + how to learn fast with AI (May 2)"
git push origin main
echo "Done! Posts live on main."
