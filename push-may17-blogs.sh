#!/bin/bash
# May 17, 2026 SEO blog push.
# Includes any leftover unpushed posts from May 15 / 16.
cd "$(dirname "$0")"

# Clear any stale git lock files (sandbox sometimes leaves these behind).
rm -f .git/HEAD.lock .git/index.lock 2>/dev/null || true

git add frontend/content/blog/ai-for-gre-prep-score-320-plus-2026.md
git add frontend/content/blog/ai-study-planner-build-perfect-schedule-2026.md
# Catch any May 15/16 posts that may still be untracked.
git add frontend/content/blog/best-ai-tools-for-high-school-students-2026.md 2>/dev/null || true
git add frontend/content/blog/how-to-write-research-paper-with-ai-2026.md 2>/dev/null || true
git add frontend/content/blog/ai-college-application-essay-personal-statement-2026.md 2>/dev/null || true
git add frontend/content/blog/ai-for-online-certifications-google-aws-azure-2026.md 2>/dev/null || true

git add frontend/src/generated/blogRegistry.js
git add frontend/public/sitemap.xml

git commit -m "Add May 17 SEO blog posts: GRE prep + AI study planner (catches May 15-16 leftovers)"
git push origin main
