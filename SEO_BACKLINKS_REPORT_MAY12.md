# Slate SEO and Backlinks Report - May 12, 2026 (Run 27)

## TL;DR

- 2 new SEO blog posts written and built into the registry (career change + public speaking).
- Blog registry rebuilt to 146 posts (was 144). Sitemap regenerated with new URLs.
- Push script ready: `push-may12-blogs.sh`. User must run locally.
- 30+ fresh directory targets curated from the latest best-of-ai/ai-directories list plus new finds.
- 0 automated directory submissions completed. Same blocker as May 6 / Apr 26: Cloudflare, account-required, CAPTCHA, and paid tiers block automated submission.
- Notion sub-page logged inside the SEO doc as Run 27.

## New Blog Posts (May 12)

| # | Post | Slug | Target Keywords |
|---|------|------|-----------------|
| 1 | How to Use AI to Change Careers in 2026: Pivoting Without a Bootcamp | `/blogs/ai-career-change-pivot-learn-new-skills-2026` | "AI career change", "career pivot AI", "career switch with AI" |
| 2 | AI for Public Speaking and Presentation Practice in 2026 | `/blogs/ai-public-speaking-presentation-practice-2026` | "AI public speaking", "AI presentation practice", "AI speaking coach" |

Both posts are 1500+ words, structured for featured-snippet capture, and link back to slateup.ai.

## Manual Git Push Required

Sandbox lacks GitHub credentials. Run locally on your Mac:

```bash
cd ~/Documents/projects/Slate-all/slate-landing
chmod +x push-may12-blogs.sh
./push-may12-blogs.sh
```

## Prefilled Submission Data (Copy-Paste Ready)

Use this block when filling any directory form by hand. 30 seconds per directory.

```
Tool Name:        Slate
Website URL:      https://slateup.ai
App URL:          https://app.slateup.ai
Category:         Education / AI Learning / AI Tools for Students
Pricing:          Freemium
Short Description (120 chars):
  AI-powered interactive classroom. Generate courses, learn with AI classmates,
  and practice with AI roleplays.
Full Description:
  Slate is an AI-powered interactive classroom for self-directed learners.
  Generate a full course from any topic or your own notes. Learn with AI
  classmates who ask questions, debate, and roleplay scenarios with you.
  Practice job interviews, public speaking, exam prep, and any subject with
  AI tutors that adapt to your pace. Built for students, professionals, and
  career changers who want to learn faster than traditional courses allow.
Tags:             AI learning, education, AI tutor, classroom, course
                  generator, study tools, exam prep, AI classmates
Email:            hello@slateup.ai
Phone:            +91 9110894452
Logo URL:         https://slateup.ai/logo.png  (verify path)
Founder:          Rahil Jain
Founded:          2025
Country:          India (Global)
```

## Fresh Directory Submission Targets (30+ for Today)

Top targets sorted by Domain Rating descending. All checked via best-of-ai/ai-directories May 12 fetch plus new finds.

### Tier 1: Highest leverage (free + dofollow, no paid tier required)

| # | Directory | Submission URL | Notes |
|---|-----------|----------------|-------|
| 1 | The Next AI | https://www.thenextai.com/submit-ai-tool/ | Free basic listing, dofollow, 120k visitors. Form has anti-bot quick-check. Manual 2 min. |
| 2 | Best of Web | https://www.bestofweb.site | Startup directory, free dofollow |
| 3 | Aura++ | https://auraplusplus.com | Launch + featured post + dofollow |
| 4 | AI Toolz Dir | https://www.aitoolzdir.com | Free DR 27 dofollow with mutual link, or $25 |
| 5 | Dofollow.Tools | https://dofollow.tools/submit | Logo upload + manual form |
| 6 | Beyond AI Tools | https://www.beyondaitools.com | Free listing, multilingual |
| 7 | AI Agents Live | https://aiagentslive.com | Free, AI-agent focused |
| 8 | Aixyz | https://www.aixyz.co | Free, 1500+ tools listed |
| 9 | AI Tool List | https://www.aitoollist.org | Free directory |
| 10 | TheAISurf | https://theaisurf.com | DR-claimed dofollow on approval |
| 11 | AI Hunt List | https://aihuntlist.com | 3000+ tools, free |
| 12 | EveryDev.ai | https://www.everydev.ai | Developer-curated, free |
| 13 | Find My AI Tool | https://findmyaitool.com | Free |
| 14 | Free AI Tool | https://freeaitool.ai | Free |
| 15 | Foundr | https://foundr.ai | Free |
| 16 | Insidr AI | https://www.insidr.ai/ai-tools | Free |
| 17 | NavTools AI | https://navtools.ai | Free |
| 18 | NeonRev | https://www.neonrev.com | Free |
| 19 | OpenHunts | https://openhunts.com | Free, product hunt alternative |
| 20 | Spiff.store | https://spiff.store | Free |

### Tier 2: Free but requires account creation

| # | Directory | Submission URL | Time Estimate |
|---|-----------|----------------|---------------|
| 21 | Altern AI | https://altern.ai | 5 min (OAuth signup) |
| 22 | Uneed.best | https://uneed.best/submit-a-tool | 5 min |
| 23 | OpenFuture AI | https://openfuture.ai | 5 min |
| 24 | Futurepedia | https://www.futurepedia.io/submit-tool | Free option, account needed |
| 25 | AI Pedia Hub | https://aipediahub.com | Account |
| 26 | Stackviv | https://stackviv.ai | Account |
| 27 | Product Hunt | https://www.producthunt.com/posts/new | Plan launch day |
| 28 | Crunchbase | https://www.crunchbase.com/add-new | High DA, free |

### Tier 3: GitHub PR (low friction, single PR per repo)

| # | Repo | URL |
|---|------|-----|
| 29 | best-of-ai/ai-directories | https://github.com/best-of-ai/ai-directories |
| 30 | mahseema/awesome-ai-tools | https://github.com/mahseema/awesome-ai-tools |
| 31 | eudk/awesome-ai-tools | https://github.com/eudk/awesome-ai-tools |
| 32 | submitaitools/Free-AI-Directories | https://github.com/submitaitools/Free-AI-Directories |
| 33 | ozgrozer/top-ai-directories | https://github.com/ozgrozer/top-ai-directories |

PR template:
```
* [Slate](https://slateup.ai) - AI-powered interactive classroom. Generate
  courses from any topic, learn with AI classmates, and practice with AI
  roleplays for interviews, exam prep, and public speaking.
```

## Why 0 Auto Submissions (Same as May 6)

Tested 4 directories live in this run. Same blockers held.

1. Cloudflare bot challenges on most modern directories. Requires real browser.
2. Modern SPAs render forms via React/Next.js. Static HTML has no form to POST against.
3. WordPress + Fluent Forms have CSRF nonces tied to browser session.
4. Forms with simple POST endpoints still require CAPTCHA or "quick-check" math questions.

The viable paths.

- User manually clicks through 5 to 10 directories per day with prefilled data (15 min/day).
- Pay AI Toolz Dir $25 for one DR 27 dofollow.
- Authorize a Chrome extension session for Cowork to drive the user's browser end to end.

## Daily Backlink Plan for Rahil (20 per day target)

To hit 20 backlinks per day reliably, here is a 30-minute daily routine.

| Time | Action | Backlinks |
|------|--------|-----------|
| 0–10 min | Open 10 Tier-1 directories in tabs. Paste prefilled data. Submit. | 10 |
| 10–20 min | 5 Tier-2 directories (account already created from Day 1). | 5 |
| 20–25 min | 2 GitHub PRs to awesome lists. | 2 |
| 25–30 min | 1 guest-post pitch email or 2 forum comments with link. | 2-3 |

Total: 20 per day. After 7 days you have 140 backlinks and 30+ accounts ready to use as one-click submits going forward.

## Guest Posting Targets

Low-friction outreach. These accept ed-tech / AI-learning content with founder bio + dofollow link.

| # | Site | Topic Fit | Contact |
|---|------|-----------|---------|
| 1 | Smashing Magazine | UX of AI learning apps | smashingmagazine.com/write-for-us |
| 2 | freeCodeCamp News | Learn-to-code with AI | freecodecamp.org/news/how-to-contribute |
| 3 | EdSurge | Edtech for students | edsurge.com/contribute |
| 4 | Hackernoon | AI / startup pieces | hackernoon.com/write |
| 5 | Medium publications (Better Programming, The Startup) | AI learning, founders | each pub's submission guidelines |
| 6 | Dev.to | Educational AI | self-publish, dofollow on canonical |
| 7 | Indian Express Tech | Indian edtech angle | indianexpress.com (PR pitch) |
| 8 | YourStory | India startup | yourstory.com (PR pitch) |
| 9 | Inc42 | India SaaS | inc42.com (contributor program) |
| 10 | Analytics India Magazine | AI India coverage | analyticsindiamag.com |

Pitch template attached in the Notion sub-page (Run 27).

## Next-Run Priorities

1. Get user to actually push and run 10 Tier-1 submissions (most leverage).
2. Authorize Cowork Chrome extension so future runs can drive the user's browser.
3. Spin up Crunchbase + Product Hunt profile (high-DA, one-time setup).
4. Send 3 guest-post pitches per week.
