# SEO Run 25 — May 8, 2026 — Manual Push Steps

## What was done in this run
- New blog post written: `frontend/content/blog/ai-classroom-vs-online-courses-2026.md`
- `yarn blog:build` ran successfully, registry now has 142 posts
- Notion log updated: see Run 25 page under SEO doc

## Why git push could not run automatically
The sandbox cannot delete `.git/index.lock` and `.git/HEAD.lock`. They are held with permissions the sandbox cannot override.

## To push the blog and pending content

```bash
cd "/Users/thunderbolt/Documents/projects/Slate-all/slate-landing"

# 1. Clean up stale locks
rm -f .git/index.lock .git/HEAD.lock .git/HEAD.lock.bak2 .git/HEAD.lock.old

# 2. Sync with origin (the branch is 9 commits behind from prior PR merges)
git pull --rebase origin main

# 3. Stage everything new + modified
git add frontend/content/blog/ai-classroom-vs-online-courses-2026.md
git add frontend/content/blog/ai-essay-writing-without-cheating-2026.md
git add frontend/content/blog/ai-for-jee-neet-preparation-2026.md
git add frontend/content/blog/ai-pomodoro-deep-work-routine-students-2026.md
git add frontend/content/blog/ai-summer-break-learning-students-2026.md
git add frontend/content/blog/ai-tutor-vs-human-tutor-cost-comparison-2026.md
git add frontend/content/blog/best-ai-note-taking-tools-for-students-2026.md
git add frontend/src/generated/blogRegistry.js
git add frontend/public/index.html

# 4. Commit and push
git commit -m "feat: blog posts catch-up + ai-classroom-vs-online-courses-2026 (May 8 run 25)"
git push origin main
```

## Backlinks
See the Notion Run 25 page for a curated list of 25 free, no-login directories plus 12 high-DR sites that need a one-time login session. Estimate: 30-45 minutes of manual work to submit to all 25 free ones.
