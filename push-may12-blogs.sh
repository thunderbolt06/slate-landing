#!/usr/bin/env bash
# Run this from the slate-landing/ directory.
# Cleans stale git locks and pushes the May 12, 2026 blog posts + registry.

set -e

cd "$(dirname "$0")"

echo "==> Removing stale git locks"
rm -f .git/index.lock .git/HEAD.lock .git/HEAD.lock.bak2 .git/HEAD.lock.old || true

echo "==> Fetching origin"
git fetch origin main

echo "==> Pulling with rebase"
git pull --rebase origin main || {
  echo "Rebase had conflicts. Resolve them, then run: git rebase --continue && git push origin main"
  exit 1
}

echo "==> Staging new blog posts, registry, sitemap, and SEO report"
git add frontend/content/blog/ai-career-change-pivot-learn-new-skills-2026.md \
        frontend/content/blog/ai-public-speaking-presentation-practice-2026.md \
        frontend/src/generated/blogRegistry.js \
        frontend/public/sitemap.xml \
        frontend/public/robots.txt \
        SEO_BACKLINKS_REPORT_MAY12.md \
        push-may12-blogs.sh 2>/dev/null || true

echo "==> Committing"
git commit -m "feat(seo): add May 12 blog posts (career change + public speaking)

- Add ai-career-change-pivot-learn-new-skills-2026
- Add ai-public-speaking-presentation-practice-2026
- Rebuild blog registry to 146 posts
- Update sitemap with new URLs"

echo "==> Pushing"
git push origin main

echo "==> Done."
