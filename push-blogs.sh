#!/bin/bash
# Run this from the slate-landing directory to push all new blog posts
cd "$(dirname "$0")"

# Clear stale git locks from previous automated runs
rm -f .git/index.lock .git/HEAD.lock
git worktree prune

git add \
  frontend/content/blog/ai-for-gate-exam-preparation-2026.md \
  frontend/content/blog/bloom-taxonomy-active-learning-ai-students-2026.md \
  frontend/content/blog/ai-study-tools-for-working-professionals-upskilling-2026.md \
  frontend/src/generated/blogRegistry.js

git commit -m "feat: add 3 SEO blog posts (Apr 26, 2026 run 5)"
git push origin main
echo "Done! Pushed to main."
