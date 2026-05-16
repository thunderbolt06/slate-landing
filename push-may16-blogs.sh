#!/bin/bash
cd "$(dirname "$0")"
git add frontend/content/blog/ai-college-application-essay-personal-statement-2026.md
git add frontend/content/blog/ai-for-online-certifications-google-aws-azure-2026.md
git add frontend/src/generated/blogRegistry.js
git add frontend/public/sitemap.xml
git commit -m "Add May 16 SEO blog posts: college application essay + online certifications guide"
git push origin main
