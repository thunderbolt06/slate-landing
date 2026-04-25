import { useEffect } from "react";

const DEFAULT_TITLE = "Slate — AI-powered Interactive Classroom";
const DEFAULT_DESCRIPTION =
  "Slate is an AI-powered interactive classroom where you learn with AI classmates — not just a chatbot. Personalised explanations, instant doubt resolution, and adaptive courses for NCERT, JEE, NEET and beyond.";

/**
 * Sets per-page <title>, <meta name="description">, <link rel="canonical">
 * and optionally <meta name="robots"> for noindex pages.
 *
 * @param {{ title: string, description: string, noindex?: boolean, canonical?: string }} opts
 */
export function useSeoMeta({ title, description, noindex = false, canonical } = {}) {
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
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, description, noindex, canonical]);
}
