#!/bin/bash
# Run this from the slate-landing directory to push Apr 27 blog posts
cd "$(dirname "$0")"

# Clear stale git locks from previous automated runs
rm -f .git/index.lock .git/HEAD.lock
git worktree prune

# Pull latest first to avoid divergence
git pull origin main --rebase

# Rebuild blog registry to include all new posts
cd frontend && node scripts/build-blog-data.mjs && cd ..

git add \
  frontend/content/blog/ai-study-tools-nursing-students-2026.md \
  frontend/content/blog/best-ai-tools-homeschooling-2026.md \
  frontend/src/generated/blogRegistry.js

git commit -m "blog: add nursing students AI study tools + homeschooling guide (Apr 27, 2026)"
git push origin main
echo "Done! Pushed to main."
