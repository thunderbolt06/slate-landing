#!/bin/bash
cd "$(dirname "$0")"
git add frontend/content/blog/best-ai-tools-for-high-school-students-2026.md
git add frontend/content/blog/how-to-write-research-paper-with-ai-2026.md
git add frontend/src/generated/blogRegistry.js
git add frontend/public/sitemap.xml
git commit -m "Add May 15 SEO blog posts: best AI tools for high school students + how to write research paper with AI"
git push origin main
