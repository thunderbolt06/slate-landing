#!/bin/bash
# Push script for Run 11 — Apr 28, 2026
# Run this from the slate-landing/ directory

set -e

echo "Cleaning any stale git locks..."
rm -f .git/index.lock .git/HEAD.lock

echo "Syncing with remote..."
git fetch origin
git reset --hard origin/main

echo "Adding new blog posts and registry..."
git add frontend/content/blog/ai-homework-help-tools-2026.md \
  frontend/content/blog/ai-tools-for-teachers-educators-2026.md \
  frontend/content/blog/ai-tools-middle-school-students-2026.md \
  frontend/src/generated/blogRegistry.js

echo "Committing..."
git commit -m "blog: add 3 SEO posts + update registry (Apr 28, 2026 run 11)

- Best AI Homework Help Tools for Students in 2026
- Best AI Tools for Teachers and Educators in 2026
- Best AI Tools for Middle School Students in 2026

Blog registry now at 109 posts."

echo "Pushing to main..."
git push origin main

echo "Done!"
