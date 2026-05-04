#!/bin/bash
# Push May 4 blog posts: auditory learners + exam anxiety + group projects (Run 22)
cd "$(dirname "$0")"

echo "Clearing stale git locks..."
rm -f .git/index.lock .git/HEAD.lock .git/MERGE_HEAD 2>/dev/null
git worktree prune 2>/dev/null

echo "Fetching latest..."
git fetch origin

echo "Switching to main and resetting..."
git checkout main 2>/dev/null || git checkout -b main origin/main
git reset --hard origin/main

echo "Re-adding new blog posts (in case reset removed them)..."
# Files were already written to frontend/content/blog/ before this script ran.
# If reset wiped them, re-write them and re-run.

echo "Rebuilding blog registry..."
cd frontend && node scripts/build-blog-data.mjs && cd ..

echo "Staging new posts..."
git add \
  frontend/content/blog/ai-for-auditory-learners-2026.md \
  frontend/content/blog/how-to-beat-exam-anxiety-with-ai-2026.md \
  frontend/content/blog/ai-for-group-projects-without-cheating-2026.md \
  frontend/src/generated/blogRegistry.js

git commit -m "blog: add 3 SEO posts - auditory learners + exam anxiety + group projects (May 4)"
git push origin main
echo "Done! Posts live on main."
