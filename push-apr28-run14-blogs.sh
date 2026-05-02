#!/bin/bash
# Run this from the slate-landing directory to push Apr 28 Run 14 blog posts
cd "$(dirname "$0")"

# Clear stale git locks from previous automated runs
rm -f .git/index.lock .git/HEAD.lock
git worktree prune

# Pull latest first to avoid divergence
git pull origin main --rebase

# Rebuild blog registry to include all new posts
cd frontend && node scripts/build-blog-data.mjs && cd ..

git add \
  frontend/content/blog/best-ai-tools-engineering-students-2026.md \
  frontend/content/blog/how-to-study-smarter-not-harder-ai-2026.md \
  frontend/content/blog/ai-personalized-learning-future-of-education-2026.md \
  frontend/src/generated/blogRegistry.js

git commit -m "feat: add 3 SEO blog posts (Apr 28, 2026 run 14)"
git push origin main
echo "Done! Pushed to main."
