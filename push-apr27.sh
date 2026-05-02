#!/bin/bash
# Push Apr 27 blog posts — run from slate-landing directory
cd "$(dirname "$0")"
rm -f .git/index.lock .git/HEAD.lock
git worktree prune
git add \
  frontend/content/blog/ai-tools-law-students-2026.md \
  frontend/content/blog/ai-language-learning-tools-2026.md \
  frontend/content/blog/ai-tools-upsc-preparation-2026.md \
  frontend/src/generated/blogRegistry.js
git commit -m "feat: add 3 SEO blog posts (Apr 27, 2026) — law students, language learning, UPSC prep"
git push origin main
echo "Done!"
