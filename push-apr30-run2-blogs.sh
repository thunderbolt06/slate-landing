#!/bin/bash
# Push Apr 30 (run 2) — 38 accumulated blog posts + 2 new ones
# Run this from the slate-landing directory: bash push-apr30-run2-blogs.sh

cd "$(dirname "$0")"

echo "Clearing stale git locks..."
rm -f .git/index.lock .git/HEAD.lock
git worktree prune

echo "Pulling latest from origin..."
git pull origin main --rebase

echo "Rebuilding blog registry..."
cd frontend && node scripts/build-blog-data.mjs && cd ..

echo "Staging all accumulated blog posts..."
git add \
  frontend/content/blog/ai-certification-exam-prep-2026.md \
  frontend/content/blog/ai-for-competitive-programming-coding-contests-2026.md \
  frontend/content/blog/ai-for-gate-exam-preparation-2026.md \
  frontend/content/blog/ai-for-remote-online-learning-2026.md \
  frontend/content/blog/ai-homework-help-tools-2026.md \
  frontend/content/blog/ai-language-learning-tools-2026.md \
  frontend/content/blog/ai-note-taking-apps-for-students-2026.md \
  frontend/content/blog/ai-personalized-learning-future-of-education-2026.md \
  frontend/content/blog/ai-study-habits-science-backed-2026.md \
  frontend/content/blog/ai-study-tools-for-working-professionals-upskilling-2026.md \
  frontend/content/blog/ai-study-tools-nursing-students-2026.md \
  frontend/content/blog/ai-tools-adult-learners-lifelong-learning-2026.md \
  frontend/content/blog/ai-tools-college-students-2026.md \
  frontend/content/blog/ai-tools-corporate-training-employee-learning-2026.md \
  frontend/content/blog/ai-tools-engineering-students-2026.md \
  frontend/content/blog/ai-tools-finance-students-cfa-cpa-ca-2026.md \
  frontend/content/blog/ai-tools-for-teachers-educators-2026.md \
  frontend/content/blog/ai-tools-high-school-students-2026.md \
  frontend/content/blog/ai-tools-ielts-toefl-preparation-2026.md \
  frontend/content/blog/ai-tools-law-students-2026.md \
  frontend/content/blog/ai-tools-mba-students-business-school-2026.md \
  frontend/content/blog/ai-tools-medical-students-mbbs-neet-pg-2026.md \
  frontend/content/blog/ai-tools-middle-school-students-2026.md \
  frontend/content/blog/ai-tools-phd-research-academic-writing-2026.md \
  frontend/content/blog/ai-tools-special-education-learning-disabilities-2026.md \
  frontend/content/blog/ai-tools-ssc-banking-exam-prep-2026.md \
  frontend/content/blog/ai-tools-upsc-preparation-2026.md \
  frontend/content/blog/ai-tutor-vs-human-tutor-2026.md \
  frontend/content/blog/ai-tutors-vs-human-tutors-2026.md \
  frontend/content/blog/ai-writing-tools-for-students-essays-research-2026.md \
  frontend/content/blog/best-ai-flashcard-apps-2026.md \
  frontend/content/blog/best-ai-tools-engineering-students-2026.md \
  frontend/content/blog/best-ai-tools-homeschooling-2026.md \
  frontend/content/blog/best-ai-tools-self-paced-learning-2026.md \
  frontend/content/blog/bloom-taxonomy-active-learning-ai-students-2026.md \
  frontend/content/blog/how-to-study-effectively-ai-2026.md \
  frontend/content/blog/how-to-study-smarter-not-harder-ai-2026.md \
  frontend/content/blog/learn-programming-with-ai-from-scratch-2026.md \
  frontend/content/blog/upsc-cat-ai-exam-prep-guide-2026.md \
  frontend/src/generated/blogRegistry.js

git commit -m "blog: add 38 SEO posts batch (Apr 30 run 2) — 125 total posts"
git push origin main
echo "Done! All posts live on main."
