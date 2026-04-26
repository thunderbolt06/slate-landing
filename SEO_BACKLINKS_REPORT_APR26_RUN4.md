# Slate SEO & Backlinks Report — April 26, 2026 (Run 4, Scheduled Task)

## TL;DR

- 2 new SEO blog posts written and built locally — **needs manual git push** (commands below).
- Blog registry: **81 posts** (was 79).
- 14 directory submission attempts. **0 fully completed** through automation; **1 form fully prepared** (AI Toolz Dir).
- 30+ fresh directories curated with submission URLs and per-site blockers.
- Notion sub-page logged: "Run 4 — Apr 26, 2026 (Backlinks + Blog)" under SEO doc.

---

## New Blog Posts (Run 4)

| # | Post | Slug | Target Keywords |
|---|------|------|-----------------|
| 1 | AI Study Tools for the SAT: How to Prep Smarter in 2026 | `/blogs/ai-study-tools-sat-prep-2026` | "AI for SAT prep", "digital SAT 2026", "AI test prep" |
| 2 | AI Study Tools for ADHD Students: Focus, Notes, and Habits That Actually Stick | `/blogs/ai-study-tools-adhd-students-focus-2026` | "AI for ADHD students", "ADHD study tools", "AI focus tools" |

## Manual Git Push Required

The sandbox has stale git worktree references and a permission-locked `.git/index.lock`. Run locally:

```bash
cd slate-landing
rm -f .git/index.lock
rm -rf .claude/worktrees
git worktree prune
git add frontend/content/blog/ai-study-tools-sat-prep-2026.md \
        frontend/content/blog/ai-study-tools-adhd-students-focus-2026.md \
        frontend/src/generated/blogRegistry.js
git commit -m "feat: add 2 SEO blog posts (Apr 26, 2026 run 4)"
git push origin main
```

---

## Directory Submission Attempts

| # | Directory | Status | Blocker |
|---|-----------|--------|---------|
| 1 | AI Toolz Dir | Form filled | Free option requires mutual backlink on slateup.ai; or $25 paid |
| 2 | Submit AI Tools | CAPTCHA | Color-button human verification |
| 3 | AIChief | Cloudflare | Bot challenge |
| 4 | Best of Web (bowora.com) | 404 | Submit URL broken |
| 5 | Productivity Directory | Login | Account creation required |
| 6 | Stratup.ai | Login | Sign-in required |
| 7 | Microlaunch | Signup | Account required |
| 8 | Kick Product | Signup | Account required |
| 9 | Thank John | Google OAuth | Free tier needs Google sign-in + mutual backlink |
| 10 | Find An AI Tools | Login | Sign-in required |
| 11 | AI Tool Trek | 404 | Submit page not found |
| 12 | Spiff.store | 404 | Submit page not found |
| 13 | HeyAIWorld | Page error | Submit page errors |
| 14 | AI Parabellum | reCAPTCHA | Google reCAPTCHA blocks automation |

---

## Why Autonomous "20 backlinks/day" Doesn't Work

Every directory falls into one of:

1. Google/GitHub OAuth required (needs your account)
2. Paid listing (needs payment authorization)
3. CAPTCHA / Cloudflare bot challenge
4. Mutual backlink required (needs `<a>` on slateup.ai first)
5. Email verification loop (you click confirmation)

## Recommended Workflow Change

1. **Add a `/partners` or footer mutual-backlink section to slateup.ai** — unlocks ~10 free tier-1 dirs.
2. **Budget $25–$50/month** for paid dofollow listings (AI Toolz Dir, Aura++, Tap4).
3. **Authorize Cowork to use your Google account for OAuth** — unlocks 50+ Tier B dirs.
4. **Run a 30-min weekly batch session** where Cowork drives the browser and you click "verify" buttons. Realistic 20+/week.

## Highest-Leverage Backlinks for Next Manual Session

### Tier A — Open form, no auth

- AI Toolz Dir: https://www.aitoolzdir.com/submit
- Dofollow.Tools: https://dofollow.tools/submit
- Aura++: https://auraplusplus.com
- The Next AI: https://www.thenextai.com/submit-ai-tool/
- AI Valley: https://aivalley.ai/submit-tool

### Tier B — One-click OAuth signup

- Uneed.best (DR 74)
- Thank John
- Productivity Directory
- Microlaunch
- Altern AI
- BetaList
- OpenFuture AI
- EliteAI Tools

### GitHub PR Backlinks (no captcha, DR 100 source)

- https://github.com/best-of-ai/ai-directories
- https://github.com/mahseema/awesome-ai-tools
- https://github.com/eudk/awesome-ai-tools
- https://github.com/tomrzv/AI-Directories
- https://github.com/refined-so/awesome-backlinks

Suggested PR text for each:

```markdown
- [Slate](https://slateup.ai) - AI-powered interactive classroom where you learn by discussing your course material with AI classmates.
```

---

## Tier C — Bulk targets for future runs

AIToolsHunt, AI Pulse, AI Pedia Hub, NavTools AI, Tool Pilot, NeonRev, Stackviv, AI Library, AI Hubs, AI Hunt List, Insidr AI Directory, ChooseTheAI, AI Resource Pro, AI Respo, God of Prompt, BuildVoyage, Aixyz, AskAIForIt, NavFolders, Tools.so

---

Notion sub-page: https://www.notion.so/34ed70add6ce815fb0e2df7e50d532a7
