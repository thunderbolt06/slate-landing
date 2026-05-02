#!/bin/bash
# Push Apr 28 Run 2 blog posts — run from slate-landing directory
cd "$(dirname "$0")"

rm -f .git/index.lock .git/HEAD.lock
git fetch origin
git reset --hard origin/main

git add \
  frontend/content/blog/ai-tools-high-school-students-2026.md \
  frontend/content/blog/best-ai-flashcard-apps-2026.md \
  frontend/content/blog/ai-tools-college-students-2026.md \
  frontend/content/blog/ai-study-habits-science-backed-2026.md \
  frontend/src/generated/blogRegistry.js

git commit -m "blog: add 4 SEO posts + rebuild registry (Apr 28, 2026 run 2)"
git push origin main
echo "Done!"
