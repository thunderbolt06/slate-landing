#!/bin/bash
# May 22, 2026 SEO blog push (Run 31)
# 2 new blog posts: AI for LSAT prep + AI for community college transfers
cd "$(dirname "$0")"

# Clear any stale git lock files (sandbox sometimes leaves these behind).
rm -f .git/HEAD.lock .git/index.lock 2>/dev/null || true

git add frontend/content/blog/ai-for-lsat-prep-score-170-plus-2026.md
git add frontend/content/blog/ai-for-community-college-transfer-students-2026.md
git add frontend/src/generated/blogRegistry.js
git add frontend/public/sitemap.xml
git add frontend/public/robots.txt 2>/dev/null || true

git commit -m "Add May 22 SEO blogs: AI for LSAT prep + AI for community college transfers"
git push origin main
