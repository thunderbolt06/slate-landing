# Slate SEO and Backlinks Report - May 21, 2026 (Run 30)

## TL;DR

- 3 new SEO blog posts written and built into the registry (DSAT, AP exams, Olympiads).
- Blog registry rebuilt to 156 posts. Sitemap regenerated with 156 URLs.
- Local commit `54fe3d3` created in slate-landing. Push to GitHub requires manual step.
- 4 directories tested live this run. 0 completed submissions. Logo upload, login walls, 404s, and GitHub-PR-only flows all triggered.
- IndexNow ping accepted (HTTP 202) for slateup.ai.
- Notion sub-page logged as Run 30: https://www.notion.so/367d70add6ce8113ab21e8b68cbcdf70

## New Blog Posts (May 21)

| # | Post | Slug |
|---|------|------|
| 1 | AI for Digital SAT (DSAT) Prep in 2026: Hit 1500+ With Adaptive Practice | `/blogs/ai-dsat-digital-sat-prep-2026` |
| 2 | AI for AP Exam Prep in 2026: How to Score a 5 on AP Calc, Bio, and Lang | `/blogs/ai-for-ap-exam-prep-score-5-2026` |
| 3 | AI for Olympiad Prep in 2026: Math, Physics, and Chemistry Pathways | `/blogs/ai-for-olympiad-math-physics-chemistry-prep-2026` |

## Manual Git Push Required

Sandbox lacks GitHub credentials. The commit is already created locally. Run:

```bash
cd ~/Documents/projects/Slate-all/slate-landing
git push origin main
```

Or use the script:

```bash
chmod +x push-may21-blogs.sh
./push-may21-blogs.sh
```

## Live Submission Attempts

| Directory | Result |
|-----------|--------|
| AI Agents Live | Form fully filled, blocked by mandatory logo file upload |
| TheAiSurf | 404 + login wall |
| Bowora | Rebrand of bestofweb.site, registration required |
| AI Tool List | GitHub-PR only, not a form |

Confirms the Run 23-29 pattern. Same three blockers: logo upload, OAuth login, GitHub-only flow.

## Search Engine Pings

| Service | Status |
|---------|--------|
| IndexNow | 202 Accepted |
| Bing sitemap ping | 410 (deprecated) |
| Google sitemap ping | 404 (deprecated 2023) |

## To Hit 20 Backlinks Today

Open Notion Run 30 page. Copy prefilled submission data. Hit Tier 1 + 2 + 3 + 4 in the 30-minute routine documented there.

Tier 1: 10 no-logo dofollow directories
Tier 2: 5 logo-required (have logo.png ready)
Tier 3: 5 account-required (one-time setup)
Tier 4: 5 GitHub PRs to awesome-ai-tools lists

## Unlocks Needed for Autonomous Submission

1. Host slateup.ai/logo.png and save local copy at ~/slate-assets/logo.png
2. Authenticate the GitHub MCP for autonomous PR creation
3. Single OAuth session for Tier 3 directories

With those, scheduled runs can hit 8 to 12 backlinks per day autonomously.

## Notion Log

Full Run 30 details + 28 directory targets + guest post list:
https://www.notion.so/367d70add6ce8113ab21e8b68cbcdf70
