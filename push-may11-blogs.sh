#!/usr/bin/env bash
# Run this from the slate-landing/ directory.
# Cleans stale git locks and pushes the May 11, 2026 blog posts + registry.

set -e

cd "$(dirname "$0")"

echo "==> Removing stale git locks"
rm -f .git/index.lock .git/HEAD.lock .git/HEAD.lock.bak2 .git/HEAD.lock.old || true

echo "==> Fetching origin"
git fetch origin main

echo "==> Pulling with rebase (sandbox is 3 ahead, 9 behind from prior runs)"
git pull --rebase origin main || {
  echo "Rebase had conflicts. Resolve them, then run: git rebase --continue && git push origin main"
  exit 1
}

echo "==> Staging new blog posts and registry"
git add frontend/content/blog/ \
        frontend/src/generated/blogRegistry.js \
        frontend/public/index.html \
        frontend/public/sitemap.xml \
        frontend/src/components/ThankYou.js \
        SEO_BACKLINKS_REPORT_MAY06.md \
        SEO_RUN25_MAY08_PUSH_INSTRUCTIONS.md 2>/dev/null || true

echo "==> Committing"
git commit -m "feat(seo): add May 11 blog posts + rebuild blog registry (run 26)

- Add learn-new-domain-30-days-with-ai-2026
- Add ai-learning-roleplays-conversation-practice-2026
- Rebuild blog registry to 144 posts
- Sync prior-run blog posts that never got pushed"

echo "==> Pushing"
git push origin main

echo "Done."
