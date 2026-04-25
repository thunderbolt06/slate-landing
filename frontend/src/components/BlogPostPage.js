import { motion } from "framer-motion";
import { Link, Navigate, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft, ExternalLink, Home } from "lucide-react";
import { BLOG_POSTS, getBlogMarkdown } from "@/generated/blogRegistry";
import { useSeoMeta } from "@/hooks/useSeoMeta";

/** Split intro, numbered ### 1. … ### 11. … tool blocks, and trailing content after horizontal rule */
function partitionNumberedToolSections(md) {
  const trimmed = md.replace(/^\uFEFF/, "").trim();
  const parts = trimmed.split(/\n---\s*\n/);
  const body = parts[0] ?? "";
  const afterRule = parts.length > 1 ? parts.slice(1).join("\n---\n").trim() : null;

  const hasTools = /^###\s+\d+\.\s/m.test(body);
  if (!hasTools) {
    return { kind: "single", full: trimmed };
  }

  const chunks = body.split(/\n(?=###\s+\d+\.\s)/);
  const [intro, ...tools] = chunks;
  return {
    kind: "tools",
    intro: (intro ?? "").trim(),
    tools: tools.map((t) => t.trim()).filter(Boolean),
    seo: afterRule,
  };
}

function createMarkdownComponents({ inToolCard = false } = {}) {
  return {
    h3: ({ children }) => (
      <h3
        className={`font-heading text-xl font-bold text-[#073B4C] ${
          inToolCard ? "mt-0 mb-2" : "mt-10 mb-3 first:mt-0"
        }`}
      >
        {children}
      </h3>
    ),
    h2: ({ children }) => (
      <h2 className="font-heading text-2xl font-bold text-[#073B4C] mt-12 mb-4 first:mt-0">{children}</h2>
    ),
    p: ({ children }) => (
      <p
        className={`font-body text-[#495057] leading-relaxed ${
          inToolCard
            ? "mb-0 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between sm:gap-4"
            : "mb-4 last:mb-0"
        }`}
      >
        {children}
      </p>
    ),
    a: ({ href, children }) => {
      const external = typeof href === "string" && (href.startsWith("http") || href.startsWith("//"));
      if (external) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-press inline-flex items-center justify-center gap-1.5 rounded-full border-2 border-[#073B4C] bg-[#06D6A0]/15 px-4 py-2 font-body text-sm font-bold text-[#073B4C] shadow-[3px_3px_0px_#073B4C] transition-transform hover:scale-105 no-underline align-middle my-0.5 sm:shrink-0"
          >
            {children}
            <ExternalLink size={14} strokeWidth={2.5} className="shrink-0 opacity-90" aria-hidden />
          </a>
        );
      }
      return (
        <a
          href={href}
          className="font-semibold text-[#118AB2] underline underline-offset-[3px] hover:text-[#073B4C] transition-colors"
        >
          {children}
        </a>
      );
    },
    ul: ({ children }) => <ul className="font-body text-[#495057] list-disc pl-6 mb-4 space-y-2">{children}</ul>,
    ol: ({ children }) => <ol className="font-body text-[#495057] list-decimal pl-6 mb-4 space-y-2">{children}</ol>,
    li: ({ children }) => <li className="leading-relaxed">{children}</li>,
    strong: ({ children }) => <strong className="font-bold text-[#073B4C]">{children}</strong>,
    hr: () => <hr className="my-10 border-[#073B4C]/15" />,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-[#118AB2] pl-4 my-6 italic text-[#495057]/90">{children}</blockquote>
    ),
    code: ({ children, className }) => {
      const inline = !className;
      if (inline) {
        return (
          <code className="rounded-md bg-[#073B4C]/[0.06] px-1.5 py-0.5 font-mono text-[0.9em] text-[#073B4C]">{children}</code>
        );
      }
      return <code className={className}>{children}</code>;
    },
    pre: ({ children }) => (
      <pre className="neo-card bg-white border-4 border-[#073B4C] rounded-2xl p-4 overflow-x-auto mb-6 text-sm shadow-[4px_4px_0px_#073B4C]">
        {children}
      </pre>
    ),
  };
}

const markdownComponentsDefault = createMarkdownComponents({ inToolCard: false });
const markdownComponentsToolCard = createMarkdownComponents({ inToolCard: true });

export default function BlogPostPage() {
  const { slug } = useParams();
  const meta = BLOG_POSTS.find((p) => p.slug === slug);
  const markdown = slug ? getBlogMarkdown(slug) : null;

  useSeoMeta({
    title: meta ? `${meta.title} | Slate Blog` : "Blog | Slate",
    description: meta?.blurb ?? "Read the latest from the Slate blog — AI learning, NCERT guides and EdTech insights.",
    canonical: meta ? `https://slateup.ai/blogs/${meta.slug}` : undefined,
  });

  if (!meta || !markdown) {
    return <Navigate to="/blogs" replace />;
  }

  const sections = partitionNumberedToolSections(markdown);

  const articleBody =
    sections.kind === "single" ? (
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponentsDefault}>
        {sections.full}
      </ReactMarkdown>
    ) : (
      <>
        {sections.intro ? (
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponentsDefault}>
            {sections.intro}
          </ReactMarkdown>
        ) : null}
        <div className="flex flex-col gap-4 mt-2">
          {sections.tools.map((block, i) => (
            <div
              key={`tool-${i}`}
              className="neo-card bg-white border-4 border-[#073B4C] rounded-2xl p-5 md:p-6 shadow-[4px_4px_0px_#073B4C] transition-[transform,box-shadow] hover:-translate-y-0.5"
            >
              <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponentsToolCard}>
                {block}
              </ReactMarkdown>
            </div>
          ))}
        </div>
        {sections.seo ? (
          <div className="mt-14 pt-10 border-t-2 border-[#073B4C]/15 [&_h2:first-child]:mt-0">
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponentsDefault}>
              {sections.seo}
            </ReactMarkdown>
          </div>
        ) : null}
      </>
    );

  return (
    <div className="min-h-screen bg-[#FDFDFD] flex flex-col overflow-y-auto pb-[4.75rem] md:pb-0">
      <header className="px-6 py-4 flex items-center justify-between max-w-3xl mx-auto w-full gap-4">
        <Link to="/" className="shrink-0 flex items-center gap-2">
          <span className="font-heading text-2xl font-bold text-[#073B4C] tracking-[-0.025em]">SLATE UP</span>
        </Link>
        <div className="flex items-center gap-3 shrink-0">
          <Link
            to="/blogs"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-[#073B4C] hover:text-[#118AB2] transition-colors"
          >
            <ArrowLeft size={16} /> Blogs
          </Link>
          <Link
            to="/"
            className="hidden md:inline-flex items-center gap-1.5 text-sm font-semibold text-[#073B4C] hover:text-[#118AB2] transition-colors"
          >
            <Home size={16} /> Home
          </Link>
        </div>
      </header>

      <article className="flex-1 px-6 py-6 max-w-3xl mx-auto w-full">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
          <Link
            to="/blogs"
            className="inline-flex sm:hidden items-center gap-1.5 text-sm font-semibold text-[#118AB2] mb-6 hover:underline"
          >
            <ArrowLeft size={16} /> All posts
          </Link>

          <header className="mb-10">
            <time
              dateTime={meta.date}
              className="font-body text-xs font-semibold uppercase tracking-wider text-[#073B4C]/50"
            >
              {new Date(meta.date + "T12:00:00").toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <h1 className="font-heading text-3xl md:text-[2.65rem] font-bold text-[#073B4C] mt-3 leading-[1.1] tracking-tight">
              {meta.title}
            </h1>
          </header>

          <div className="blog-markdown">{articleBody}</div>
        </motion.div>
      </article>

      <footer className="bg-[#073B4C] px-6 py-6 text-center hidden md:block mt-auto">
        <p className="font-body text-white/40 text-sm">&copy; {new Date().getFullYear()} Slate Up. All rights reserved.</p>
      </footer>
    </div>
  );
}
