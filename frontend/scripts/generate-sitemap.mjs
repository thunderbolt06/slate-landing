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
  "https://slateup.ai"
).replace(/\/$/, "");

const STATIC_PATHS = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/characters", changefreq: "monthly", priority: "0.8" },
  { path: "/how-it-works", changefreq: "monthly", priority: "0.8" },
  { path: "/features", changefreq: "monthly", priority: "0.8" },
  { path: "/waitlist", changefreq: "monthly", priority: "0.9" },
  { path: "/thank-you", changefreq: "yearly", priority: "0.3" },
  { path: "/blogs", changefreq: "weekly", priority: "0.9" },
  {
    path: "/learn/ncert-class-10-mathematics",
    changefreq: "monthly",
    priority: "0.85",
  },
];

function extractBlogSlugs(registrySource) {
  const start = registrySource.indexOf("export const BLOG_POSTS = [");
  const end = registrySource.indexOf("export const BLOG_MARKDOWN_BY_SLUG");
  if (start === -1 || end === -1 || end <= start) {
    console.error(
      "[sitemap] blogRegistry.js missing BLOG_POSTS or BLOG_MARKDOWN_BY_SLUG — run yarn blog:build first.",
    );
    process.exit(1);
  }
  const slice = registrySource.slice(start, end);
  const slugs = [];
  const re = /"slug":\s*"([^"]+)"/g;
  let m;
  while ((m = re.exec(slice)) !== null) slugs.push(m[1]);
  return slugs;
}

function escapeXml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function main() {
  const lastmod = new Date().toISOString().slice(0, 10);
  const registrySource = fs.readFileSync(REGISTRY, "utf8");
  const blogSlugs = extractBlogSlugs(registrySource);

  const urlEntries = [];

  for (const { path: p, changefreq, priority } of STATIC_PATHS) {
    const loc = `${SITE_URL}${p === "/" ? "/" : p}`;
    urlEntries.push(`  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`);
  }

  for (const slug of blogSlugs) {
    const loc = `${SITE_URL}/blogs/${encodeURIComponent(slug)}`;
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
    `[sitemap] Wrote ${OUT_SITEMAP} and ${OUT_ROBOTS} (${STATIC_PATHS.length} static + ${blogSlugs.length} blog URLs, base ${SITE_URL})`,
  );
}

main();
