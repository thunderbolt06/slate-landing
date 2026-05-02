#!/bin/bash
# Push Apr 30 blog posts: best-ai-tools-self-paced-learning + how-to-study-effectively
cd "$(dirname "$0")"

echo "Clearing stale git locks..."
rm -f .git/index.lock .git/HEAD.lock
git worktree prune

echo "Pulling latest from origin..."
git pull origin main --rebase

echo "Rebuilding blog registry..."
cd frontend && node scripts/build-blog-data.mjs && cd ..

echo "Staging new posts..."
git add \
  frontend/content/blog/best-ai-tools-self-paced-learning-2026.md \
  frontend/content/blog/how-to-study-effectively-ai-2026.md \
  frontend/src/generated/blogRegistry.js

git commit -m "blog: add 2 SEO posts - self-paced learning + how to study with AI (Apr 30)"
git push origin main
echo "Done! Posts live on main."
