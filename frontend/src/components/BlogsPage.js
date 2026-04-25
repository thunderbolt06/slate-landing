import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Home } from "lucide-react";
import { BLOG_POSTS } from "@/generated/blogRegistry";
import { useSeoMeta } from "@/hooks/useSeoMeta";

export default function BlogsPage() {
  useSeoMeta({
    title: "Blog — AI Learning, NCERT Guides & EdTech Insights | Slate",
    description: "Tips, guides and deep dives on AI-powered learning, NCERT preparation, JEE, NEET and how to study smarter with Slate.",
    canonical: "https://slateup.ai/blogs",
  });

  return (
    <div className="min-h-screen bg-[#FDFDFD] flex flex-col overflow-y-auto pb-[4.75rem] md:pb-0">
      <header className="px-6 py-4 flex items-center justify-between max-w-6xl mx-auto w-full">
        <Link to="/" className="flex items-center gap-2" data-testid="blogs-home-link">
          <span className="font-heading text-2xl font-bold text-[#073B4C] tracking-[-0.025em]">SLATE UP</span>
        </Link>
        <Link
          to="/"
          className="hidden md:flex items-center gap-1.5 text-sm font-semibold text-[#073B4C] hover:text-[#118AB2] transition-colors"
        >
          <Home size={16} /> Back to Home
        </Link>
      </header>

      <main className="flex-1 px-6 py-10 max-w-3xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="text-[#118AB2]" size={28} strokeWidth={2.25} />
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-[#073B4C]">Blogs</h1>
          </div>
          <p className="font-body text-[#495057] mb-10 max-w-xl leading-relaxed">
            Notes on learning, AI, and what we are excited about.
          </p>

          <ul className="flex flex-col gap-5">
            {BLOG_POSTS.map((post, i) => (
              <li key={post.slug}>
                <motion.article
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * i, duration: 0.35 }}
                >
                  <Link
                    to={`/blogs/${post.slug}`}
                    className="group block neo-card bg-white border-4 border-[#073B4C] rounded-3xl p-6 md:p-7 shadow-[6px_6px_0px_#073B4C] hover:translate-y-[-3px]"
                    data-testid={`blog-card-${post.slug}`}
                  >
                    <time
                      dateTime={post.date}
                      className="font-body text-xs font-semibold uppercase tracking-wider text-[#073B4C]/50"
                    >
                      {new Date(post.date + "T12:00:00").toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                    <h2 className="font-heading text-xl md:text-2xl font-bold text-[#073B4C] mt-2 mb-2 group-hover:text-[#118AB2] transition-colors">
                      {post.title}
                    </h2>
                    <p className="font-body text-sm md:text-base text-[#495057] leading-relaxed">{post.blurb}</p>
                    <span className="mt-5 inline-flex items-center gap-2 btn-press rounded-full bg-[#FFD166] text-[#073B4C] px-5 py-2.5 font-body text-sm font-bold border-2 border-[#073B4C] shadow-[3px_3px_0px_#073B4C] transition-transform group-hover:scale-105">
                      Read article <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" strokeWidth={2.5} />
                    </span>
                  </Link>
                </motion.article>
              </li>
            ))}
          </ul>
        </motion.div>
      </main>

      <footer className="bg-[#073B4C] px-6 py-6 text-center hidden md:block">
        <p className="font-body text-white/40 text-sm">&copy; {new Date().getFullYear()} Slate Up. All rights reserved.</p>
      </footer>
    </div>
  );
}
