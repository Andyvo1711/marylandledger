# Maryland Ledger

**Maryland's Stories. Every Day.**

A modern, dark-editorial local news website for the state of Maryland, built with Next.js App Router, TypeScript, and Tailwind CSS. Content is authored entirely in Markdown — no database, no CMS, no authentication.

## Tech Stack

- Next.js 16 (App Router, Turbopack)
- TypeScript
- Tailwind CSS v4
- Markdown content with `gray-matter` frontmatter
- `remark` / `remark-html` for article rendering
- `lucide-react` for icons

## Getting Started

Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

The site runs at [http://localhost:3000](http://localhost:3000).

### Production build

```bash
npm run build
npm start
```

`npm run build` performs a full static/SSG build with TypeScript type-checking and ESLint — it should complete with no errors.

### Lint

```bash
npm run lint
```

## Environment Variables

Copy `.env.example` to `.env.local` and set your deployed site URL (used for canonical URLs, sitemap, robots.txt, and Open Graph tags):

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

If unset, the site safely falls back to `http://localhost:3000`.

## Content System

All articles live in `content/articles/` as individual Markdown files with YAML frontmatter:

```yaml
---
title: "Article Headline"
slug: "article-headline"
excerpt: "One or two sentence summary."
date: "2026-07-30"
author: "Maryland Ledger Staff"
category: "news"
image: "https://images.unsplash.com/photo-xxxxx"
featured: false
breaking: false
tags:
  - Maryland
  - Local News
---

Article body in Markdown...
```

- `slug` must match the filename (without `.md`).
- `category` must be one of: `news`, `politics`, `business`, `lifestyle`, `travel`, `beauty-wellness`, `sports`, `opinion`.
- `date` must be `YYYY-MM-DD`. Invalid or missing dates render as "Date unavailable" instead of crashing.
- Malformed articles (missing required fields, bad category, duplicate slug) are skipped with a console warning rather than breaking the build.

The site ships with 40 original sample articles distributed across all eight categories, including 6 Travel and 6 Beauty & Wellness stories.

## Project Structure

```
app/                  Routes (App Router)
  api/search/         Search API endpoint
  article/[slug]/     Article pages
  category/[category]/  Category pages
  search/              Search results page
  sitemap.ts, robots.ts
components/           Shared UI components
content/articles/     Markdown article content
lib/                  Data access, search, dates, metadata utilities
types/                Shared TypeScript types
scripts/              One-time content generation script
```

## Deployment

### Vercel

1. Push this repository to GitHub.
2. Import the repository in [Vercel](https://vercel.com/new).
3. Set the `NEXT_PUBLIC_SITE_URL` environment variable to your production domain.
4. Deploy — no additional configuration is required.

### Git

```bash
git init
git add .
git commit -m "Initial Maryland Ledger website"
git branch -M main
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git push -u origin main
```
