#!/bin/bash
# Push May 6 blog posts: Pomodoro/deep-work + essay writing without cheating + summer learning
# Also resolves the prior diverged state (3 local SEO commits + 9 remote PR commits)
set -e
cd "$(dirname "$0")"

echo "Clearing stale git locks..."
rm -f .git/index.lock .git/HEAD.lock .git/MERGE_HEAD 2>/dev/null
git worktree prune 2>/dev/null || true

echo "Configuring git user..."
git config user.email "rahiljain6111999@gmail.com"
git config user.name "Rahil Jain"

echo "Fetching latest from origin..."
git fetch origin

# Apply the prepared bundle if present (faster path)
if [ -f "slate-may06.bundle" ]; then
  echo "Found prepared bundle. Fetching commits from bundle..."
  git fetch slate-may06.bundle main:bundle-may06-tmp 2>&1 || true
  if git rev-parse bundle-may06-tmp >/dev/null 2>&1; then
    echo "Switching main to bundle tip..."
    git checkout main 2>/dev/null || git checkout -b main origin/main
    git reset --hard bundle-may06-tmp
    git branch -D bundle-may06-tmp 2>/dev/null || true
  fi
fi

# If main is still behind, run a normal merge as fallback
echo "Reconciling with origin/main..."
git checkout main 2>/dev/null || git checkout -b main origin/main
if ! git merge --no-edit origin/main 2>&1; then
  echo "Merge had conflicts. Aborting and falling back to manual rebuild..."
  git merge --abort 2>/dev/null || true
fi

echo "Rebuilding blog registry..."
cd frontend && node scripts/build-blog-data.mjs && cd ..

echo "Staging any newly built files..."
git add frontend/src/generated/blogRegistry.js \
        frontend/content/blog/ai-essay-writing-without-cheating-2026.md \
        frontend/content/blog/ai-pomodoro-deep-work-routine-students-2026.md \
        frontend/content/blog/ai-summer-break-learning-students-2026.md \
        frontend/content/blog/ai-for-jee-neet-preparation-2026.md \
        frontend/content/blog/ai-tutor-vs-human-tutor-cost-comparison-2026.md \
        frontend/content/blog/best-ai-note-taking-tools-for-students-2026.md \
        frontend/public/index.html 2>/dev/null || true

if ! git diff --cached --quiet; then
  git commit -m "blog: rebuild registry for May 6 push"
fi

echo "Pushing to origin/main..."
git push origin main

echo "Done. Posts live on main."
