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

## 🛡️ DevOps & Security Practices
- CI checks for build and optional linting
- All dependencies pinned and reproducible
- Artifacts archived on every build for traceability
- Deployment via GitHub Actions workflow

## 📄 License

MIT License

---

**Built with ♥ by Apoorv Katiyar**
