#!/bin/bash
# Push May 5 blog posts: AI note-taking + JEE/NEET AI prep + AI tutor vs human (Run 23)
cd "$(dirname "$0")"

echo "Clearing stale git locks..."
rm -f .git/index.lock .git/HEAD.lock .git/MERGE_HEAD 2>/dev/null
git worktree prune 2>/dev/null

echo "Fetching latest..."
git fetch origin

echo "Switching to main and resetting..."
git checkout main 2>/dev/null || git checkout -b main origin/main
git reset --hard origin/main

echo "Rebuilding blog registry..."
cd frontend && node scripts/build-blog-data.mjs && cd ..

echo "Staging new posts..."
git add \
  frontend/content/blog/best-ai-note-taking-tools-for-students-2026.md \
  frontend/content/blog/ai-for-jee-neet-preparation-2026.md \
  frontend/content/blog/ai-tutor-vs-human-tutor-cost-comparison-2026.md \
  frontend/src/generated/blogRegistry.js

git commit -m "blog: add 3 SEO posts - AI note-taking + JEE/NEET prep + AI tutor vs human (May 5)"
git push origin main
echo "Done! Posts live on main."
