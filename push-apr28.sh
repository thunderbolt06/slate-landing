#!/bin/bash
# Push Apr 28 blog posts — run from slate-landing directory
cd "$(dirname "$0")"

# Remove stale locks if present
rm -f .git/index.lock .git/HEAD.lock
git worktree prune

# Pull latest from origin first to sync
git fetch origin
git reset --hard origin/main

# Add all new blog posts from Apr 28 run
git add \
  frontend/content/blog/ai-tools-phd-research-academic-writing-2026.md \
  frontend/content/blog/ai-tools-corporate-training-employee-learning-2026.md \
  frontend/content/blog/ai-for-competitive-programming-coding-contests-2026.md \
  frontend/content/blog/ai-for-gate-exam-preparation-2026.md \
  frontend/content/blog/ai-language-learning-tools-2026.md \
  frontend/content/blog/ai-study-tools-for-working-professionals-upskilling-2026.md \
  frontend/content/blog/ai-study-tools-nursing-students-2026.md \
  frontend/content/blog/ai-tools-law-students-2026.md \
  frontend/content/blog/ai-tools-upsc-preparation-2026.md \
  frontend/content/blog/best-ai-tools-homeschooling-2026.md \
  frontend/content/blog/bloom-taxonomy-active-learning-ai-students-2026.md \
  frontend/src/generated/blogRegistry.js

git commit -m "blog: add 11 SEO posts + rebuild registry (Apr 28, 2026)"
git push origin main
echo "Done! All Apr 28 blog posts pushed."
