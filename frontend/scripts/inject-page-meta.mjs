/**
 * Post-build script: injects per-page <title>, <meta description>, <link canonical>,
 * and Open Graph / Twitter Card tags into each route's index.html in the build output.
 *
 * This gives Googlebot (and social scrapers) correct meta tags even before JS executes.
 *
 * Usage: node scripts/inject-page-meta.mjs
 * Run AFTER `craco build` (e.g. via `postbuild` in package.json).
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const BUILD_DIR = path.join(ROOT, "build");
const REGISTRY = path.join(ROOT, "src", "generated", "blogRegistry.js");

const SITE_URL = "https://www.slateup.ai";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

// --- Read blog registry -------------------------------------------------------
const require = createRequire(import.meta.url);
// blogRegistry.js uses ES module syntax, so we parse it manually
const registrySource = fs.readFileSync(REGISTRY, "utf-8");
const match = registrySource.match(/export const BLOG_POSTS\s*=\s*(\[[\s\S]*?\]);/);
const BLOG_POSTS = match ? JSON.parse(match[1]) : [];

// --- Known static routes (non-blog) -------------------------------------------
const STATIC_ROUTES = [
  {
    path: "/",
    title: "Slate — AI-powered Interactive Classroom",
    description:
      "Slate is an AI-powered interactive classroom where you learn with AI classmates — not just a chatbot. Personalised explanations, instant doubt resolution, and adaptive courses for NCERT, JEE, NEET and beyond.",
  },
  {
    path: "/blogs",
    title: "Blog — AI Learning, NCERT Guides & EdTech Insights | Slate",
    description:
      "Tips, guides and deep dives on AI-powered learning, NCERT preparation, JEE, NEET and how to study smarter with Slate.",
  },
  {
    path: "/learn/ncert-class-10-mathematics",
    title: "NCERT Class 10 Maths — AI-powered Lessons | Slate",
    description:
      "Study NCERT Class 10 Mathematics with Slate's AI classroom. Interactive lessons for all 14 chapters — Real Numbers, Polynomials, Trigonometry, Statistics and more.",
  },
  {
    path: "/learn/ncert-class-10-science",
    title: "NCERT Class 10 Science — AI-powered Lessons | Slate",
    description:
      "Study NCERT Class 10 Science with Slate's AI classroom. Interactive lessons covering Physics, Chemistry and Biology chapters.",
  },
  {
    path: "/features",
    title: "Features — AI Classroom, Adaptive Courses & Doubt Resolution | Slate",
    description:
      "Explore Slate's features: AI classmates, personalised adaptive courses, instant doubt resolution and NCERT-aligned content for Indian students.",
  },
  {
    path: "/how-it-works",
    title: "How Slate Works — AI-powered Interactive Learning | Slate",
    description:
      "Learn how Slate's AI classroom works. Upload notes, get a personalised course, and learn with AI classmates who explain, quiz and challenge you.",
  },
  {
    path: "/characters",
    title: "Meet Your AI Classmates | Slate",
    description:
      "Meet Slate's AI classmates — each with a unique personality and teaching style. Learn with friends, not just a chatbot.",
  },
  {
    path: "/waitlist",
    title: "Join the Waitlist — Slate AI Classroom",
    description:
      "Join the Slate waitlist and be among the first to experience AI-powered interactive learning. Built for students in India.",
  },
  {
    path: "/pricing",
    title: "Pricing — Slate AI Classroom",
    description:
      "See Slate's pricing plans. Start free and upgrade as you grow with AI-powered interactive courses and personalised learning.",
  },
];

// --- Helpers ------------------------------------------------------------------
function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function injectMeta(html, { title, description, canonical, ogImage = DEFAULT_OG_IMAGE }) {
  const safeTitle = escapeHtml(title);
  const safeDesc = escapeHtml(description);
  const safeCanon = escapeHtml(canonical);
  const safeImage = escapeHtml(ogImage);

  // Title
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${safeTitle}</title>`);

  // Description
  html = html.replace(
    /(<meta\s+name="description"\s+content=")[^"]*(")/,
    `$1${safeDesc}$2`
  );

  // Canonical - insert after <meta name="robots" ...> (or after charset if not found)
  if (!html.includes('rel="canonical"')) {
    html = html.replace(
      /(<meta\s+name="robots"[^>]*>)/,
      `$1\n    <link rel="canonical" href="${safeCanon}" />`
    );
  } else {
    html = html.replace(
      /(<link\s+rel="canonical"\s+href=")[^"]*(")/,
      `$1${safeCanon}$2`
    );
  }

  // OG title
  html = html.replace(
    /(<meta\s+property="og:title"\s+content=")[^"]*(")/,
    `$1${safeTitle}$2`
  );
  // OG description
  html = html.replace(
    /(<meta\s+property="og:description"\s+content=")[^"]*(")/,
    `$1${safeDesc}$2`
  );
  // OG URL
  html = html.replace(
    /(<meta\s+property="og:url"\s+content=")[^"]*(")/,
    `$1${safeCanon}$2`
  );
  // OG image
  html = html.replace(
    /(<meta\s+property="og:image"\s+content=")[^"]*(")/,
    `$1${safeImage}$2`
  );

  // Twitter title
  html = html.replace(
    /(<meta\s+name="twitter:title"\s+content=")[^"]*(")/,
    `$1${safeTitle}$2`
  );
  // Twitter description
  html = html.replace(
    /(<meta\s+name="twitter:description"\s+content=")[^"]*(")/,
    `$1${safeDesc}$2`
  );
  // Twitter image
  html = html.replace(
    /(<meta\s+name="twitter:image"\s+content=")[^"]*(")/,
    `$1${safeImage}$2`
  );

  return html;
}

function writeRouteHtml(routePath, meta) {
  const canonical = `${SITE_URL}${routePath}`;
  const destDir = path.join(BUILD_DIR, routePath === "/" ? "" : routePath);

  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  const srcHtml = fs.readFileSync(path.join(BUILD_DIR, "index.html"), "utf-8");
  const injected = injectMeta(srcHtml, { ...meta, canonical });
  fs.writeFileSync(path.join(destDir, "index.html"), injected, "utf-8");
}

// --- Main ---------------------------------------------------------------------
if (!fs.existsSync(BUILD_DIR)) {
  console.error("No build/ directory found. Run craco build first.");
  process.exit(1);
}

const baseHtml = fs.readFileSync(path.join(BUILD_DIR, "index.html"), "utf-8");
console.log(`Injecting per-page meta into build/ ...`);

let count = 0;

// Static routes
for (const route of STATIC_ROUTES) {
  if (route.path === "/") continue; // homepage already has correct meta in index.html
  writeRouteHtml(route.path, route);
  console.log(`  [static] ${route.path}`);
  count++;
}

// Blog posts
for (const post of BLOG_POSTS) {
  const routePath = `/blogs/${post.slug}`;
  writeRouteHtml(routePath, {
    title: `${post.title} | Slate Blog`,
    description: post.blurb,
  });
  console.log(`  [blog]   ${routePath}`);
  count++;
}

console.log(`\nDone. Injected meta for ${count} routes.`);
