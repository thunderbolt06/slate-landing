#!/bin/bash
# Run this from the slate-landing directory to push all new blog posts
cd "$(dirname "$0")"

git add frontend/content/blog/ frontend/src/generated/blogRegistry.js
git commit -m "feat: add 12 SEO blog posts (Apr 26, 2026)"
git push origin main
echo "Done! Pushed to main."
