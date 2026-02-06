# Apoorv Katiyar - Portfolio Website

[![Deploy](https://github.com/apoorv-katiyar/apoorv-katiyar.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/apoorv-katiyar/apoorv-katiyar.github.io/actions/workflows/deploy.yml)

> Modern, maintainable portfolio website with markdown blog support

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server (builds and serves at http://localhost:8000)
npm run dev

# Build for production
npm run build

# Clean build artifacts
npm run clean
```

## 📝 Writing Blog Posts

Create a new markdown file in `src/content/posts/` with the format `YYYY-MM-DD-post-title.md`:

```markdown
---
title: "Your Post Title"
date: 2024-11-28
author: "Apoorv Katiyar"
category: "DevOps"
tags: ["CI/CD", "Kubernetes"]
description: "Brief description"
readTime: "5 min"
---

# Your Content Here

Write your blog post in markdown...

- ✔️ Markdown posts are **fully compatible with Obsidian** (YAML frontmatter, wiki-links, callouts, mermaid diagrams, math, footnotes, etc.)
- ✔️ Use Obsidian’s advanced markdown features including:
  - YAML frontmatter
  - [!NOTE], [!WARNING] callouts
  - $$math$$ and $inline$ equations
  - Wiki-style links: `[[2024-11-28-cicd-pipelines-best-practices]]`
  - Mermaid diagrams/code blocks
  - GFM tables, task lists, and footnotes
  - Emoji, nested lists, tables, and more

See `src/content/posts/2024-12-01-markdown-showcase.md` for a feature showcase.

Then run `npm run build` to generate the HTML.

## 📁 Project Structure

```
├── src/                    # Source files
│   ├── assets/            # CSS, JS, images
│   ├── content/posts/     # Blog posts (Markdown)
│   ├── templates/         # HTML templates
│   └── pages/             # HTML pages
├── scripts/               # Build scripts
├── dist/                  # Build output
└── package.json
```

## 🛠️ Technologies

- **Build**: Node.js
- **Markdown**: marked.js + gray-matter
- **Syntax Highlighting**: highlight.js
- **Math**: katex
- **Diagrams**: mermaid
- **Dev Server**: live-server
- **Deployment**: GitHub Pages
- **CI/CD**: GitHub Actions

## 🌐 Deployment (GitHub Pages)

The workflow uses GitHub’s official Actions (`upload-pages-artifact` + `deploy-pages`) to build and deploy the site—no third-party actions or `gh-pages` branch.

1. Go to **Settings → Pages** in this repo.
2. Under **Build and deployment**, set **Source** to **GitHub Actions** (not “Deploy from a branch”).
3. Pushing to `main` or `master` (or running the “Deploy to GitHub Pages” workflow manually) will build and deploy. The site at `https://apoorv-katiyar.github.io` will serve the built portfolio.

### ⚠️ Troubleshooting: I see the README instead of my portfolio

If the live site shows this README (Quick Start, Writing Blog Posts, etc.) instead of your portfolio UI, **the publishing source is still set to “Deploy from a branch”**. For full debug and verification, see **DEBUG-GITHUB-PAGES.md**. In that mode, GitHub serves the **root of the branch** (where there is no `index.html`), so it renders `README.md` as the index.

**Fix (per [GitHub’s docs](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site#publishing-with-a-custom-github-actions-workflow)):**

1. In the repo, go to **Settings** → in the left sidebar **Pages** (under “Code and automation”).
2. Under **Build and deployment** → **Source**, choose **GitHub Actions** (not “Deploy from a branch”).
3. Click **Save**.
4. Trigger a deploy: push a commit to `main` or `master`, or go to **Actions** → “Deploy to GitHub Pages” → **Run workflow**.
5. Wait 1–2 minutes. Reload `https://apoorv-katiyar.github.io` (hard refresh: Ctrl+Shift+R or Cmd+Shift+R).

After this, the site will be built from the workflow’s artifact (your `dist/` output) and you’ll see the full portfolio with styling.

## 🛡️ DevOps & Security Practices
- CI checks for build and optional linting
- All dependencies pinned and reproducible
- Artifacts archived on every build for traceability
- Deployment via GitHub Actions workflow

## 📄 License

MIT License

---

**Built with ♥ by Apoorv Katiyar**
