# Blog authoring (local Markdown)

Posts live on disk as Markdown under `frontend/content/blog/`. A small build step turns those files into `frontend/src/generated/blogRegistry.js`, which the React app imports so routes like `/blogs/your-slug` work without a CMS.

## Prerequisites

- From the `frontend/` directory, dependencies are installed (`yarn`).
- You edit `.md` files; you do not edit `blogRegistry.js` by hand.

## Steps to add or edit a post

### 1. Create or open a Markdown file

- Put each post in **`frontend/content/blog/`**.
- Filename becomes the URL slug unless you override it in frontmatter (see below). Example: `learning-react-patterns.md` → `/blogs/learning-react-patterns`.
- Files whose names start with **`_`** are ignored by the build (for example `_template.md`). Use that prefix for drafts or snippets you do not want published.

### 2. Add YAML frontmatter at the top

Every post must start with frontmatter between `---` lines:

| Field    | Required | Purpose |
|----------|----------|---------|
| `title`  | Yes      | Page title and listing headline. |
| `blurb`  | Yes      | Short summary on `/blogs` and under the title on the post page. |
| `date`   | Yes      | ISO date string (e.g. `2026-04-19`). Used for ordering and display. |
| `slug`   | No       | If set, overrides the slug derived from the filename. |

Example:

```yaml
---
title: "My post title"
blurb: "One line for the blog index cards."
date: "2026-04-19"
slug: optional-custom-url-segment
---

Your article body starts here in **Markdown**.
```

Missing `title`, `blurb`, or `date` causes the build to fail with an error naming the file.

### 3. Write the body in Markdown

Below the closing `---`, write normal Markdown (headings, lists, links, fenced code blocks, tables via GFM, etc.). See `_template.md` in the same folder for a starter.

### 4. Regenerate the registry

From **`frontend/`**:

```bash
yarn blog:build
```

This runs `scripts/build-blog-data.mjs`, which:

- Reads every `*.md` in `content/blog/` except names starting with `_`.
- Parses frontmatter and bodies.
- Sorts the index list by **`date`** descending (newest first).
- Writes **`src/generated/blogRegistry.js`**.

### 5. Commit both source and generated output

Include in version control:

- The Markdown file(s) under `content/blog/`.
- The updated `src/generated/blogRegistry.js`.

That way clones and CI stay consistent without extra secrets or services.

### Production builds

`yarn build` runs **`yarn blog:build` automatically** (`prebuild`), so production bundles always reflect the Markdown on disk at build time.

During local development, run **`yarn blog:build`** whenever you add or change a `.md` post so the dev server picks up new slugs and copy.

## How it appears in the app

- **`/blogs`** lists all posts from `BLOG_POSTS` (title, blurb, date, link to `/blogs/<slug>`).
- **`/blogs/:slug`** renders `BlogPostPage`, which loads Markdown for that slug. Unknown slugs redirect to `/blogs`.

## Troubleshooting

- **Build errors about missing frontmatter:** Add `title`, `blurb`, and `date` to the file listed in the message.
- **Duplicate slug:** Two files resolved to the same `slug` (explicit or from filename). Rename the file or change `slug` so only one post uses each slug.
- **Post does not show in dev:** Run `yarn blog:build` again after saving the Markdown file.

## Files to know

| Path | Role |
|------|------|
| `content/blog/*.md` | Author-editable sources. |
| `content/blog/_template.md` | Copy-paste starter (ignored by build). |
| `scripts/build-blog-data.mjs` | Compiles Markdown → registry module. |
| `src/generated/blogRegistry.js` | Generated; do not hand-edit. |
| `src/components/BlogPostPage.js` | Renders a single post from the registry. |
| `src/components/BlogsPage.js` | Blog index using `BLOG_POSTS`. |
