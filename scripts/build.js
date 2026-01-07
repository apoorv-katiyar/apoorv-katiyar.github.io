import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";
import { marked } from "marked";
import matter from "gray-matter";
import hljs from "highlight.js";
import katex from "katex";
import markedFootnote from "marked-footnote";
import { mangle } from "marked-mangle";
import { markedEmoji } from "marked-emoji";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const renderer = {
  blockquote(token) {
    let quote = this.parser.parse(token.tokens);
    const calloutMatch = quote.match(
      /^<p>\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\](?:\s+(.+?))?<\/p>\n?([\s\S]*)/i
    );

    if (calloutMatch) {
      const type = calloutMatch[1].toUpperCase();
      const title =
        calloutMatch[2] || type.charAt(0) + type.slice(1).toLowerCase();
      const content = calloutMatch[3] || "";
      const icons = {
        NOTE: "📝",
        TIP: "💡",
        IMPORTANT: "❗",
        WARNING: "⚠️",
        CAUTION: "🚨",
      };
      return `<div class="callout callout-${type.toLowerCase()}"><div class="callout-title"><span class="callout-icon">${
        icons[type]
      }</span><span class="callout-title-text">${title}</span></div><div class="callout-content">${content}</div></div>`;
    }
    return `<blockquote>\n${quote}</blockquote>`;
  },

  code(token) {
    const { text, lang } = token;
    if (lang === "mermaid") {
      return `<div class="mermaid-container"><pre class="mermaid">${text}</pre></div>`;
    }

    let highlighted = text;
    if (lang && hljs.getLanguage(lang)) {
      try {
        highlighted = hljs.highlight(text, { language: lang }).value;
      } catch (e) {
        // Fallback to plain text on highlight error
      }
    } else if (!lang) {
      try {
        highlighted = hljs.highlightAuto(text).value;
      } catch (e) {
        // Auto-detection failed
      }
    }
    return `<pre><code class="hljs ${
      lang ? `language-${lang}` : ""
    }">${highlighted}</code></pre>`;
  },

  heading(token) {
    const { depth, tokens } = token;
    const text = this.parser.parseInline(tokens);
    const plainText = text.replace(/<[^>]*>/g, "").trim();
    const slug = plainText
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
    return `<h${depth} id="${slug}">${text}</h${depth}>`;
  },
};

// Configure marked with syntax highlighting
marked.use({
  renderer,
  gfm: true,
  breaks: true,
  pedantic: false,
});

// Add extensions
marked.use(markedFootnote());
marked.use(mangle());
marked.use(
  markedEmoji({
    emojis: {
      smile: "😊",
      heart: "❤️",
      rocket: "🚀",
      fire: "🔥",
      star: "⭐",
      check: "✅",
      cross: "❌",
      warning: "⚠️",
      bulb: "💡",
      book: "📚",
      computer: "💻",
      cloud: "☁️",
      lock: "🔒",
      key: "🔑",
      gear: "⚙️",
      chart: "📊",
      trophy: "🏆",
      thumbsup: "👍",
      thumbsdown: "👎",
      eyes: "👀",
      brain: "🧠",
      target: "🎯",
    },
    unicode: true,
  })
);

function processMath(markdown) {
  if (!markdown) return "";
  markdown = markdown.replace(/\$\$([\s\S]+?)\$\$/g, (match, math) => {
    try {
      const html = katex.renderToString(math.trim(), {
        displayMode: true,
        throwOnError: false,
        output: "html",
      });
      return `<div class="math-block">${html}</div>`;
    } catch (e) {
      return `<div class="math-error">Math Error: ${e.message}</div>`;
    }
  });
  markdown = markdown.replace(/\$([^\$\n]+?)\$/g, (match, math) => {
    try {
      const html = katex.renderToString(math.trim(), {
        displayMode: false,
        throwOnError: false,
        output: "html",
      });
      return `<span class="math-inline">${html}</span>`;
    } catch (e) {
      return `<span class="math-error">Math Error: ${e.message}</span>`;
    }
  });
  return markdown;
}

const SRC_DIR = path.join(__dirname, "../src");
const DIST_DIR = path.join(__dirname, "../dist");
const POSTS_DIR = path.join(SRC_DIR, "content/posts");
const TEMPLATES_DIR = path.join(SRC_DIR, "templates");

async function setupDist() {
  await fs.emptyDir(DIST_DIR);
  console.log("✓ Cleaned dist");
}

async function copyAssets() {
  await fs.copy(path.join(SRC_DIR, "assets"), path.join(DIST_DIR, "assets"));
  await fs.copy(
    path.join(__dirname, "../favicon.ico"),
    path.join(DIST_DIR, "favicon.ico")
  );
  console.log("✓ Copied assets");
}

async function copyPages() {
  const pagesDir = path.join(SRC_DIR, "pages");
  const pages = await fs.readdir(pagesDir);
  for (const page of pages) {
    if (page.endsWith(".html")) {
      await fs.copy(path.join(pagesDir, page), path.join(DIST_DIR, page));
    }
  }
  console.log("✓ Copied pages");
}

async function loadTemplates() {
  const postTemplate = await fs.readFile(
    path.join(TEMPLATES_DIR, "layouts/post.html"),
    "utf-8"
  );
  const header = await fs.readFile(
    path.join(TEMPLATES_DIR, "partials/header.html"),
    "utf-8"
  );
  const footer = await fs.readFile(
    path.join(TEMPLATES_DIR, "partials/footer.html"),
    "utf-8"
  );
  const nav = await fs.readFile(
    path.join(TEMPLATES_DIR, "partials/nav.html"),
    "utf-8"
  );
  return { postTemplate, header, footer, nav };
}

function processWikiLinks(markdown) {
  if (!markdown) return "";
  return markdown.replace(/\[\[([^\]]+)\]\]/g, (match, link) => {
    const cleanLink = link.replace(/^\d{4}-\d{2}-\d{2}-/, "");
    return `[${cleanLink}](./posts/${cleanLink}.html)`;
  });
}

async function processPosts() {
  const templates = await loadTemplates();
  if (!templates.postTemplate) throw new Error("postTemplate missing");

  const postsOutputDir = path.join(DIST_DIR, "posts");
  await fs.ensureDir(postsOutputDir);

  const postFiles = await fs.readdir(POSTS_DIR);
  const posts = [];

  for (const file of postFiles) {
    if (!file.endsWith(".md")) continue;

    const filePath = path.join(POSTS_DIR, file);
    const fileContent = await fs.readFile(filePath, "utf-8");
    const { data, content } = matter(fileContent);

    let processedContent = processWikiLinks(content || "");
    processedContent = processMath(processedContent);
    const htmlContent = marked.parse(processedContent);

    let html = templates.postTemplate;
    const replacements = {
      "{{HEADER}}": templates.header || "",
      "{{NAV}}": templates.nav || "",
      "{{FOOTER}}": templates.footer || "",
      "{{TITLE}}": data.title || "",
      "{{CATEGORY}}": data.category || "General",
      "{{DATE}}": data.date || "",
      "{{READ_TIME}}": data.readTime || "5 min",
      "{{TAGS}}": generateTags(data.tags || []),
      "{{CONTENT}}": typeof htmlContent === "string" ? htmlContent : "",
      "{{DESCRIPTION}}": data.description || "",
      "{{URL}}": `https://apoorv-katiyar.github.io/posts/${file.replace(
        ".md",
        ".html"
      )}`,
    };

    for (const [key, value] of Object.entries(replacements)) {
      html = html.split(key).join(value);
    }

    const outputFile = file.replace(".md", ".html");
    await fs.writeFile(path.join(postsOutputDir, outputFile), html);

    posts.push({
      title: data.title,
      date: data.date,
      category: data.category,
      tags: data.tags,
      description: data.description,
      readTime: data.readTime,
      url: `posts/${outputFile}`,
    });
  }

  console.log(`✓ Processed ${posts.length} posts`);
  return posts;
}

function generateTags(tags) {
  return tags
    .map((tag) => `<span class="skill-tag">${tag}</span>`)
    .join("\n                        ");
}

async function updateBlogIndex(posts) {
  const blogPath = path.join(DIST_DIR, "blog.html");
  let blogHtml = await fs.readFile(blogPath, "utf-8");
  posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  const blogCards = posts
    .map(
      (post) => `
                <article class="blog-card glass-card">
                    <div class="blog-card-header">
                        <span class="blog-category">${post.category}</span>
                        <time class="blog-date" datetime="${post.date}">
                            <span class="material-icons-round">calendar_today</span>
                            ${formatDate(post.date)}
                        </time>
                    </div>
                    <h2 class="blog-card-title">
                        <a href="${post.url}">${post.title}</a>
                    </h2>
                    <p class="blog-card-excerpt">${post.description}</p>
                    <div class="blog-card-footer">
                        <div class="blog-tags">
                            ${post.tags
                              .map(
                                (tag) => `<span class="skill-tag">${tag}</span>`
                              )
                              .join("\n                            ")}
                        </div>
                        <a href="${post.url}" class="read-more">
                            Read More
                            <span class="material-icons-round">arrow_forward</span>
                        </a>
                    </div>
                </article>`
    )
    .join("\n            ");

  blogHtml = blogHtml.replace(
    /<!-- BLOG_POSTS_START -->[\s\S]*<!-- BLOG_POSTS_END -->/,
    `<!-- BLOG_POSTS_START -->\n            ${blogCards}\n            <!-- BLOG_POSTS_END -->`
  );

  await fs.writeFile(blogPath, blogHtml);
  console.log("✓ Updated blog index");
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

async function build() {
  console.log("🚀 Building...\n");
  try {
    await setupDist();
    await copyAssets();
    await copyPages();
    const posts = await processPosts();
    await updateBlogIndex(posts);
    console.log("\n✅ Build successful!");
  } catch (error) {
    console.error("❌ Build failed:", error.message);
    process.exit(1);
  }
}

build();
