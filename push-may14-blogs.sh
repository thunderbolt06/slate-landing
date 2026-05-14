#!/usr/bin/env bash
# Run this from the slate-landing/ directory.
# Pushes the May 14, 2026 blog posts + registry.

set -e
cd "$(dirname "$0")"

echo "==> Removing stale git locks"
rm -f .git/index.lock .git/HEAD.lock || true

echo "==> Fetching origin"
git fetch origin main

echo "==> Pulling with rebase"
git pull --rebase origin main || {
  echo "Rebase had conflicts. Resolve them, then: git rebase --continue && git push origin main"
  exit 1
}

echo "==> Staging new blog posts and registry"
git add frontend/content/blog/best-ai-learning-apps-for-students-2026.md \
        frontend/content/blog/ai-personalized-learning-future-of-education-2026.md \
        frontend/src/generated/blogRegistry.js \
        push-may14-blogs.sh 2>/dev/null || true

echo "==> Committing"
git commit -m "feat(seo): add May 14 blog posts (AI learning apps + personalized learning)

- Add best-ai-learning-apps-for-students-2026
- Add ai-personalized-learning-future-of-education-2026
- Rebuild blog registry to 147 posts"

echo "==> Pushing"
git push origin main

echo "==> Done."
