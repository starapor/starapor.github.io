# sarahtaraporewalla.com

Personal site and blog built with [Astro](https://astro.build) and the AstroPaper theme.

---

## Running locally

```bash
npm install        # first time only
npm run dev
```

The site will be available at **http://localhost:4321** (Astro will pick the next available port if 4321 is in use — check the terminal output).

---

## Creating a new post

1. Create a new `.md` file in `src/content/posts/`:

```bash
touch src/content/posts/my-post-title.md
```

The filename becomes the URL slug — `my-post-title.md` → `/writing/my-post-title/`.

2. Add frontmatter at the top of the file:

```markdown
---
title: "Your post title here"
pubDatetime: 2026-06-21T00:00:00.000Z
description: "A one or two sentence summary of the post."
tags:
  - "leadership"
  - "technology"
  - "engineering"
draft: false
---

Your post content starts here.
```

**Notes:**
- Use double quotes (`"`) around `title` and `description` if they contain apostrophes.
- `pubDatetime` controls the publish date and sort order. Use ISO 8601 format. Posts with the same date are sorted by time, so use `T01:00:00`, `T02:00:00` etc. to control ordering within a day.
- `draft: true` hides a post in production but shows it locally.
- Available tags: `leadership`, `technology`, `engineering` — or add new ones freely.
- Do **not** repeat the title as an `# H1` in the body — the layout renders it automatically.

3. The dev server hot-reloads, so the post appears immediately at its URL.

---

## Pushing to GitHub

Commit and push to `master` — GitHub Actions builds and deploys automatically.

```bash
git add src/content/posts/my-post-title.md
git commit -m "Add post: your post title"
git push origin master
```

Deployment usually takes 1–2 minutes. Check progress at:
**https://github.com/starapor/starapor.github.io/actions**

---

## Other things worth knowing

| What | Where |
|---|---|
| Site config (title, description, socials) | `astro-paper.config.ts` |
| Homepage content | `src/pages/index.astro` |
| About page | `src/content/pages/about.md` |
| Talks page | `src/content/pages/conferences-presentations.md` |
| Theme colours | `src/styles/theme.css` |
| Hero background image | `public/assets/environment1.jpg` |
