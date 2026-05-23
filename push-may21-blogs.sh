#!/bin/bash
cd "$(dirname "$0")"
git add frontend/content/blog/ai-dsat-digital-sat-prep-2026.md
git add frontend/content/blog/ai-for-ap-exam-prep-score-5-2026.md
git add frontend/content/blog/ai-for-olympiad-math-physics-chemistry-prep-2026.md
git add frontend/src/generated/blogRegistry.js
git add frontend/public/sitemap.xml
git add frontend/public/robots.txt
git commit -m "Add May 21 SEO blog posts: DSAT prep, AP exam scoring, Olympiad math/physics/chem"
git push origin main
