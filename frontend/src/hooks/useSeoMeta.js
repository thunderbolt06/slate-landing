import { useEffect } from "react";

const DEFAULT_TITLE = "Slate — AI-powered Interactive Classroom";
const DEFAULT_DESCRIPTION =
  "Slate is an AI-powered interactive classroom where you learn with AI classmates — not just a chatbot. Personalised explanations, instant doubt resolution, and adaptive courses for NCERT, JEE, NEET and beyond.";

/**
 * Sets per-page <title>, <meta name="description">, <link rel="canonical">,
 * Open Graph tags, Twitter Card tags, and optionally <meta name="robots">.
 *
 * @param {{ title: string, description: string, noindex?: boolean, canonical?: string, ogImage?: string }} opts
 */
export function useSeoMeta({ title, description, noindex = false, canonical, ogImage } = {}) {
  useEffect(() => {
    // ── title ──────────────────────────────────────────────────────────────
    const prevTitle = document.title;
    document.title = title ?? DEFAULT_TITLE;

    // ── description ────────────────────────────────────────────────────────
    let descEl = document.querySelector('meta[name="description"]');
    const prevDesc = descEl ? descEl.getAttribute("content") : null;
    if (!descEl) {
      descEl = document.createElement("meta");
      descEl.setAttribute("name", "description");
      document.head.appendChild(descEl);
    }
    descEl.setAttribute("content", description ?? DEFAULT_DESCRIPTION);

    // ── robots (noindex) ───────────────────────────────────────────────────
    let robotsEl = document.querySelector('meta[name="robots"]');
    const prevRobots = robotsEl ? robotsEl.getAttribute("content") : null;
    if (noindex) {
      if (!robotsEl) {
        robotsEl = document.createElement("meta");
        robotsEl.setAttribute("name", "robots");
        document.head.appendChild(robotsEl);
      }
      robotsEl.setAttribute("content", "noindex, nofollow");
    }

    // ── canonical ──────────────────────────────────────────────────────────
    let canonEl = document.querySelector('link[rel="canonical"]');
    const prevCanon = canonEl ? canonEl.getAttribute("href") : null;
    if (canonical) {
      if (!canonEl) {
        canonEl = document.createElement("link");
        canonEl.setAttribute("rel", "canonical");
        document.head.appendChild(canonEl);
      }
      canonEl.setAttribute("href", canonical);
    }

    // ── Open Graph ─────────────────────────────────────────────────────────
    const ogTitleEl = document.querySelector('meta[property="og:title"]');
    const prevOgTitle = ogTitleEl ? ogTitleEl.getAttribute("content") : null;
    if (ogTitleEl && title) ogTitleEl.setAttribute("content", title);

    const ogDescEl = document.querySelector('meta[property="og:description"]');
    const prevOgDesc = ogDescEl ? ogDescEl.getAttribute("content") : null;
    if (ogDescEl && description) ogDescEl.setAttribute("content", description);

    const ogUrlEl = document.querySelector('meta[property="og:url"]');
    const prevOgUrl = ogUrlEl ? ogUrlEl.getAttribute("content") : null;
    if (ogUrlEl && canonical) ogUrlEl.setAttribute("content", canonical);

    const ogImageEl = document.querySelector('meta[property="og:image"]');
    const prevOgImage = ogImageEl ? ogImageEl.getAttribute("content") : null;
    if (ogImageEl && ogImage) ogImageEl.setAttribute("content", ogImage);

    // ── Twitter Card ───────────────────────────────────────────────────────
    const twTitleEl = document.querySelector('meta[name="twitter:title"]');
    const prevTwTitle = twTitleEl ? twTitleEl.getAttribute("content") : null;
    if (twTitleEl && title) twTitleEl.setAttribute("content", title);

    const twDescEl = document.querySelector('meta[name="twitter:description"]');
    const prevTwDesc = twDescEl ? twDescEl.getAttribute("content") : null;
    if (twDescEl && description) twDescEl.setAttribute("content", description);

    const twImageEl = document.querySelector('meta[name="twitter:image"]');
    const prevTwImage = twImageEl ? twImageEl.getAttribute("content") : null;
    if (twImageEl && ogImage) twImageEl.setAttribute("content", ogImage);

    // ── cleanup: restore previous values on unmount ────────────────────────
    return () => {
      document.title = prevTitle;
      if (descEl) descEl.setAttribute("content", prevDesc ?? DEFAULT_DESCRIPTION);
      if (robotsEl) {
        if (prevRobots) {
          robotsEl.setAttribute("content", prevRobots);
        } else if (noindex) {
          robotsEl.remove();
        }
      }
      if (canonEl && canonical) {
        if (prevCanon) {
          canonEl.setAttribute("href", prevCanon);
        } else {
          canonEl.remove();
        }
      }
      if (ogTitleEl && prevOgTitle) ogTitleEl.setAttribute("content", prevOgTitle);
      if (ogDescEl && prevOgDesc) ogDescEl.setAttribute("content", prevOgDesc);
      if (ogUrlEl && prevOgUrl) ogUrlEl.setAttribute("content", prevOgUrl);
      if (ogImageEl && prevOgImage) ogImageEl.setAttribute("content", prevOgImage);
      if (twTitleEl && prevTwTitle) twTitleEl.setAttribute("content", prevTwTitle);
      if (twDescEl && prevTwDesc) twDescEl.setAttribute("content", prevTwDesc);
      if (twImageEl && prevTwImage) twImageEl.setAttribute("content", prevTwImage);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, description, noindex, canonical, ogImage]);
}
