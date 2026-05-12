/**
 * Writes public/sitemap.xml and public/robots.txt from routes + generated blog slugs.
 *
 * Usage: node scripts/generate-sitemap.mjs
 * Base URL: SITEMAP_SITE_URL or REACT_APP_SITE_URL, else https://slateup.ai
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const REGISTRY = path.join(ROOT, "src", "generated", "blogRegistry.js");
const OUT_SITEMAP = path.join(ROOT, "public", "sitemap.xml");
const OUT_ROBOTS = path.join(ROOT, "public", "robots.txt");

const SITE_URL = (
  process.env.SITEMAP_SITE_URL ||
  process.env.REACT_APP_SITE_URL ||
  "https://www.slateup.ai"
).replace(/\/$/, "");

const STATIC_PATHS = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/characters", changefreq: "monthly", priority: "0.8" },
  { path: "/how-it-works", changefreq: "monthly", priority: "0.8" },
  { path: "/features", changefreq: "monthly", priority: "0.8" },
  { path: "/waitlist", changefreq: "monthly", priority: "0.9" },
  // /thank-you intentionally omitted from sitemap (noindex post-conversion page)
  { path: "/blogs", changefreq: "weekly", priority: "0.9" },
  { path: "/learn/ncert-class-10-mathematics", changefreq: "monthly", priority: "0.85" },
  { path: "/learn/ncert-class-10-science", changefreq: "monthly", priority: "0.85" },
  { path: "/pricing", changefreq: "monthly", priority: "0.8" },
  { path: "/contact", changefreq: "yearly", priority: "0.5" },
  { path: "/terms", changefreq: "yearly", priority: "0.3" },
  { path: "/privacy", changefreq: "yearly", priority: "0.3" },
];

function extractBlogPosts(registrySource) {
  // Same approach inject-page-meta.mjs uses: BLOG_POSTS is valid JSON, so parse it.
  const m = registrySource.match(/export const BLOG_POSTS\s*=\s*(\[[\s\S]*?\]);/);
  if (!m) {
    console.error(
      "[sitemap] blogRegistry.js missing BLOG_POSTS - run yarn blog:build first.",
    );
    process.exit(1);
  }
  let parsed;
  try {
    parsed = JSON.parse(m[1]);
  } catch (e) {
    console.error("[sitemap] failed to JSON.parse BLOG_POSTS:", e.message);
    process.exit(1);
  }
  return parsed.map((p) => ({ slug: p.slug, date: p.date || null }));
}

function escapeXml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function main() {
  const today = new Date().toISOString().slice(0, 10);
  const registrySource = fs.readFileSync(REGISTRY, "utf8");
  const blogPosts = extractBlogPosts(registrySource);

  const urlEntries = [];

  for (const { path: p, changefreq, priority } of STATIC_PATHS) {
    const loc = `${SITE_URL}${p === "/" ? "/" : p}`;
    urlEntries.push(`  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`);
  }

  for (const { slug, date } of blogPosts) {
    const loc = `${SITE_URL}/blogs/${encodeURIComponent(slug)}`;
    const lastmod = (date && /^\d{4}-\d{2}-\d{2}/.test(date))
      ? date.slice(0, 10)
      : today;
    urlEntries.push(`  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`);
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries.join("\n")}
</urlset>
`;

  fs.writeFileSync(OUT_SITEMAP, sitemap, "utf8");

  const robots = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;

  fs.writeFileSync(OUT_ROBOTS, robots, "utf8");

  console.log(
    `[sitemap] Wrote ${OUT_SITEMAP} and ${OUT_ROBOTS} (${STATIC_PATHS.length} static + ${blogPosts.length} blog URLs, base ${SITE_URL})`,
  );
}

main();
