/**
 * One-time migration script: Jekyll _posts/*.markdown → AstroPaper content collection
 *
 * Outputs:
 *   src/content/posts/<slug>.md          (migrated post)
 *   src/generated-redirects.mjs          (redirect map for astro.config.ts)
 *
 * Run: node scripts/migrate.mjs
 */

import { readFileSync, writeFileSync, readdirSync, mkdirSync } from "fs";
import { join, basename } from "path";
import matter from "../node_modules/gray-matter/index.js";

const POSTS_DIR = join(import.meta.dirname, "../_posts");
const OUT_DIR = join(import.meta.dirname, "../src/content/posts");
const REDIRECTS_OUT = join(import.meta.dirname, "../src/generated-redirects.mjs");

mkdirSync(OUT_DIR, { recursive: true });

// Slugify: lowercase, strip non-alphanumeric (except hyphens), collapse hyphens
function slugify(str) {
  return String(str)
    .trim()
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")   // remove non-word chars (keep underscores+spaces+hyphens)
    .replace(/[\s_]+/g, "-")    // spaces and underscores → hyphens
    .replace(/-+/g, "-")        // collapse multiple hyphens
    .replace(/^-|-$/g, "");     // trim leading/trailing hyphens
}

// Slugify for old Jekyll URL path segment (preserves underscores per Jekyll behaviour,
// converts spaces to hyphens, lowercases). We still need to handle the special case
// where frontmatter slug has underscores (they stay in the old URL).
function jekyllSlugify(str) {
  return String(str)
    .trim()
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")  // remove non-word chars but keep underscores
    .replace(/\s+/g, "-")      // spaces → hyphens
    .replace(/-+/g, "-")       // collapse hyphens
    .replace(/^-|-$/g, "");
}

// Parse categories: handles string ("design"), space-separated string ("jekyll update"),
// and YAML list (["agile", "testing"])
function parseCategories(raw) {
  if (!raw) return [];
  if (Array.isArray(raw)) return raw.map(c => String(c).trim()).filter(Boolean);
  // String value: in Jekyll, space-separated = multiple categories
  return String(raw).split(/\s+/).map(c => c.trim()).filter(Boolean);
}

// Extract a plain-text description from markdown body (~155 chars)
function extractDescription(body) {
  return body
    .replace(/---[\s\S]*?---/g, "")        // remove nested frontmatter blocks
    .replace(/```[\s\S]*?```/g, "")        // remove code blocks
    .replace(/`[^`]*`/g, "")              // remove inline code
    .replace(/<[^>]+>/g, "")              // remove HTML tags
    .replace(/!\[.*?\]\(.*?\)/g, "")      // remove images
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1") // links → text
    .replace(/^#{1,6}\s+/gm, "")          // remove headings
    .replace(/[*_~]{1,3}([^*_~]+)[*_~]{1,3}/g, "$1") // bold/italic → text
    .replace(/^\s*[-*+]\s+/gm, "")        // remove list bullets
    .replace(/^\s*\d+\.\s+/gm, "")        // remove numbered list markers
    .replace(/\n+/g, " ")                  // collapse newlines
    .replace(/\s+/g, " ")                  // collapse whitespace
    .trim()
    .slice(0, 155)
    .replace(/\s+\S*$/, "")              // trim at word boundary
    .trim();
}

const files = readdirSync(POSTS_DIR)
  .filter(f => f.endsWith(".markdown") || f.endsWith(".md"))
  .sort();

const redirects = {};
const skipped = [];
const migrated = [];

for (const filename of files) {
  const filePath = join(POSTS_DIR, filename);
  const raw = readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  // Skip unpublished/draft posts (like the Jekyll sample post)
  if (data.published === false || data.layout !== "post") {
    skipped.push(filename);
    console.log(`⏭  Skipping: ${filename}`);
    continue;
  }

  // Derive filename slug (strip YYYY-MM-DD- prefix and extension)
  const filenameSlug = basename(filename).replace(/^\d{4}-\d{2}-\d{2}-/, "").replace(/\.(markdown|md)$/, "");

  // New slug for the Astro site: use frontmatter slug (slugified) or filename slug
  const rawFrontmatterSlug = data.slug ? String(data.slug) : null;
  const newSlug = rawFrontmatterSlug ? slugify(rawFrontmatterSlug) : filenameSlug;

  // Old Jekyll URL slug: preserves underscores (Jekyll's default slugify keeps them)
  const oldUrlSlug = rawFrontmatterSlug ? jekyllSlugify(rawFrontmatterSlug) : filenameSlug;

  // Categories
  const categories = parseCategories(data.categories);
  const tags = categories.map(c => c.trim());

  // Old URL: /:categories/:title (each category slugified, joined with /)
  let oldCatPath = "";
  if (categories.length > 0) {
    // For string categories, Jekyll splits on whitespace ("jekyll update" → jekyll/update)
    // For list categories, each item is slugified individually
    const catSlugs = categories.map(c => jekyllSlugify(c));
    oldCatPath = catSlugs.join("/") + "/";
  }
  const oldUrl = `/${oldCatPath}${oldUrlSlug}`;

  // Date
  const pubDate = data.date ? new Date(data.date) : new Date();
  const pubDatetime = pubDate.toISOString();

  // Description
  const description = extractDescription(content) || data.title;

  // Build AstroPaper frontmatter
  const newFrontmatter = {
    title: data.title,
    pubDatetime: pubDate,
    description,
    tags: tags.length > 0 ? tags : ["uncategorised"],
    slug: newSlug,
    draft: false,
  };

  // Serialize to YAML manually (keep it simple - no external yaml dep)
  const tagsYaml = newFrontmatter.tags.map(t => `  - "${t.replace(/"/g, '\\"')}"`).join("\n");
  const titleEscaped = newFrontmatter.title.replace(/'/g, "''");
  const descEscaped = newFrontmatter.description.replace(/'/g, "''");

  const newContent = `---
title: '${titleEscaped}'
pubDatetime: ${pubDatetime}
description: '${descEscaped}'
tags:
${tagsYaml}
slug: ${newSlug}
draft: false
---
${content}`;

  const outPath = join(OUT_DIR, `${newSlug}.md`);
  writeFileSync(outPath, newContent);

  // Record redirect (without trailing slash; astro trailingSlash:ignore handles both)
  const newPath = `/writing/${newSlug}`;
  redirects[oldUrl] = newPath;

  migrated.push({ filename, oldUrl, newPath, newSlug });
  console.log(`✅  ${filename}`);
  console.log(`     ${oldUrl} → ${newPath}`);
}

// Also add feed.xml redirect
redirects["/feed.xml"] = "/rss.xml";

// Write redirect map
const redirectsExport = `// Auto-generated by scripts/migrate.mjs — do not edit manually
export const generatedRedirects = ${JSON.stringify(redirects, null, 2)};
`;
writeFileSync(REDIRECTS_OUT, redirectsExport);

console.log(`\n✅  Migrated ${migrated.length} posts, skipped ${skipped.length}`);
console.log(`📝  Redirect map written to src/generated-redirects.mjs (${Object.keys(redirects).length} entries)`);

// Print summary of edge cases
const multiCat = migrated.filter(m => m.oldUrl.split("/").length > 3);
if (multiCat.length > 0) {
  console.log("\n⚠️  Multi-category posts (verify redirects):");
  for (const m of multiCat) {
    console.log(`     ${m.filename}: ${m.oldUrl} → ${m.newPath}`);
  }
}
