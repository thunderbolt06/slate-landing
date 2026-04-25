import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight, BookOpen, Home, Sparkles, GraduationCap,
  Star, ChevronRight, Zap
} from "lucide-react";
import { useSeoMeta } from "@/hooks/useSeoMeta";

const CHAPTERS = [
  { num: 1,  name: "Real Numbers",                              url: "https://app.slateup.ai/classroom/D2HsNZ0lMN", color: "#D4F0FF", accent: "#118AB2" },
  { num: 2,  name: "Polynomials",                               url: "https://app.slateup.ai/classroom/wvoeW2ht26", color: "#FFF8E1", accent: "#FFD166" },
  { num: 3,  name: "Pair of Linear Equations in Two Variables", url: "https://app.slateup.ai/classroom/-FQ-QFoZlY", color: "#E0FFF4", accent: "#06D6A0" },
  { num: 4,  name: "Quadratic Equations",                       url: "https://app.slateup.ai/classroom/OG1dOHon3k", color: "#F0E6FF", accent: "#8338EC" },
  { num: 5,  name: "Arithmetic Progressions",                   url: "https://app.slateup.ai/classroom/Ad0H0nC8Ec", color: "#FFE4EC", accent: "#EF476F" },
  { num: 6,  name: "Triangles",                                 url: "https://app.slateup.ai/classroom/mnjYquccEr", color: "#FFF0E0", accent: "#FF6B35" },
  { num: 7,  name: "Coordinate Geometry",                       url: "https://app.slateup.ai/classroom/UU_8cZF496", color: "#D4F0FF", accent: "#118AB2" },
  { num: 8,  name: "Introduction to Trigonometry",              url: "https://app.slateup.ai/classroom/ff78WM5s5h", color: "#FFF8E1", accent: "#FFD166" },
  { num: 9,  name: "Some Applications of Trigonometry",         url: "https://app.slateup.ai/classroom/sXSw6IQybk", color: "#E0FFF4", accent: "#06D6A0" },
  { num: 10, name: "Circles",                                   url: "https://app.slateup.ai/classroom/iq9u1Vs-70", color: "#F0E6FF", accent: "#8338EC" },
  { num: 11, name: "Areas Related to Circles",                  url: "https://app.slateup.ai/classroom/Nz26bV3gqa", color: "#FFE4EC", accent: "#EF476F" },
  { num: 12, name: "Surface Areas and Volumes",                 url: "https://app.slateup.ai/classroom/nTmHnqc0Q7", color: "#FFF0E0", accent: "#FF6B35" },
  { num: 13, name: "Statistics",                                url: "https://app.slateup.ai/classroom/XhdLnwyL90", color: "#D4F0FF", accent: "#118AB2" },
  { num: 14, name: "Probability",                               url: "https://app.slateup.ai/classroom/EoPSVpGN6J", color: "#FFF8E1", accent: "#FFD166" },
];

const FEATURES = [
  { icon: Sparkles, text: "AI-powered explanations", color: "#FFD166" },
  { icon: BookOpen,  text: "Step-by-step solutions",  color: "#06D6A0" },
  { icon: Zap,       text: "Practice with instant feedback", color: "#EF476F" },
  { icon: Star,      text: "Learn at your own pace",  color: "#8338EC" },
];

export default function NcertClass10MathPage() {
  useSeoMeta({
    title: "NCERT Class 10 Maths — AI-powered Lessons | Slate",
    description: "Study NCERT Class 10 Mathematics with Slate's AI classroom. Interactive lessons for all 15 chapters — Real Numbers, Polynomials, Trigonometry, Statistics and more.",
    canonical: "https://slateup.ai/learn/ncert-class-10-mathematics",
  });

  const [activeChapter, setActiveChapter] = useState(null);

  useEffect(() => {
    document.title = "NCERT Class 10 Mathematics – All Chapters | SlateUp AI";
    const metas = [
      { name: "description",        content: "Master NCERT Class 10 Mathematics with AI-powered interactive classrooms. Covers all 14 chapters — Real Numbers to Probability — with step-by-step explanations and practice." },
      { name: "keywords",           content: "NCERT Class 10 Maths, CBSE Class 10 Mathematics, Class 10 Maths chapters, Real Numbers, Polynomials, Quadratic Equations, Trigonometry, Coordinate Geometry, NCERT solutions" },
      { property: "og:title",       content: "NCERT Class 10 Mathematics – All Chapters | SlateUp AI" },
      { property: "og:description", content: "Learn all 14 NCERT Class 10 Maths chapters interactively with AI on SlateUp. Ask questions, get explanations, and practise problems — free." },
      { property: "og:type",        content: "website" },
      { name: "robots",             content: "index, follow" },
    ];
    const added = metas.map(attrs => {
      const el = document.createElement("meta");
      Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
      document.head.appendChild(el);
      return el;
    });
    return () => added.forEach(el => el.remove());
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFDFD] flex flex-col overflow-y-auto pb-[4.75rem] md:pb-0">
      {/* ── Navbar ── */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-sm border-b-2 border-[#073B4C]/10 px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2" aria-label="SlateUp Home">
            <span className="font-heading text-2xl font-bold text-[#073B4C] tracking-[-0.025em]">SLATE UP</span>
          </Link>
          <nav className="hidden md:flex items-center gap-2 text-sm font-semibold text-[#073B4C]/50">
            <Link to="/" className="flex items-center gap-1 hover:text-[#073B4C] transition-colors">
              <Home size={14} /> Home
            </Link>
            <ChevronRight size={14} />
            <span className="text-[#073B4C]/50">CBSE / NCERT</span>
            <ChevronRight size={14} />
            <span className="text-[#073B4C]/50">Class 10</span>
            <ChevronRight size={14} />
            <span className="text-[#073B4C]">Mathematics</span>
          </nav>
          <a
            href="https://app.slateup.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-press bg-[#EF476F] text-white rounded-full px-5 py-2 font-bold text-sm border-2 border-[#073B4C] shadow-[3px_3px_0px_#073B4C] hover:scale-105 transition-transform inline-flex items-center gap-1.5"
          >
            Start Learning <ArrowRight size={14} />
          </a>
        </div>
      </header>

      <main>
        {/* ── Hero ── */}
        <section className="bg-[#FFD166] border-b-4 border-[#073B4C] px-6 py-16 md:py-20 overflow-hidden relative">
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="floating-shape absolute top-[10%] right-[5%] w-20 h-20 bg-[#EF476F] rounded-full border-4 border-[#073B4C] opacity-40" style={{ animationDelay: "0s" }} />
            <div className="floating-shape-reverse absolute bottom-[15%] left-[3%] w-14 h-14 bg-[#118AB2] rounded-2xl border-4 border-[#073B4C] opacity-30" style={{ animationDelay: "1.2s" }} />
            <div className="floating-shape absolute bottom-[5%] right-[15%] w-10 h-10 bg-[#06D6A0] rounded-full border-3 border-[#073B4C] opacity-35" style={{ animationDelay: "2s" }} />
          </div>

          <div className="max-w-5xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-[#073B4C] text-[#FFD166] rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest mb-5 border-2 border-[#073B4C]">
                <GraduationCap size={14} /> CBSE · NCERT · Class 10
              </div>
              <h1 className="font-heading text-5xl md:text-7xl font-bold text-[#073B4C] tracking-tight leading-tight mb-4">
                Class 10<br />Mathematics
              </h1>
              <p className="font-body text-lg md:text-xl text-[#073B4C]/75 max-w-2xl mb-8 leading-relaxed">
                Master all 14 chapters of the NCERT Class 10 Maths syllabus with AI-powered interactive classrooms.
                Get step-by-step explanations, ask questions, and practise problems — exactly the way you learn best.
              </p>
              <div className="flex flex-wrap gap-3 mb-2">
                <a
                  href="https://app.slateup.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-press inline-flex items-center gap-2 bg-[#EF476F] text-white rounded-full px-7 py-3.5 font-bold text-base border-2 border-[#073B4C] shadow-[4px_4px_0px_#073B4C] hover:scale-105 transition-transform"
                >
                  Start Learning Free <ArrowRight size={18} />
                </a>
                <a
                  href="#chapters"
                  className="btn-press inline-flex items-center gap-2 bg-white text-[#073B4C] rounded-full px-7 py-3.5 font-bold text-base border-2 border-[#073B4C] shadow-[4px_4px_0px_#073B4C] hover:scale-105 transition-transform"
                >
                  Browse Chapters <BookOpen size={18} />
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Quick features strip ── */}
        <section className="bg-[#073B4C] px-6 py-5 border-b-2 border-[#073B4C]">
          <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {FEATURES.map(({ icon: Icon, text, color }) => (
              <div key={text} className="flex items-center gap-2 text-white/80 text-sm font-semibold">
                <span className="w-7 h-7 rounded-lg flex items-center justify-center border-2 border-white/20" style={{ backgroundColor: color }}>
                  <Icon size={14} color="#073B4C" strokeWidth={2.5} />
                </span>
                {text}
              </div>
            ))}
          </div>
        </section>

        {/* ── Chapters Grid ── */}
        <section id="chapters" className="px-6 py-16 md:py-20">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="font-heading text-xs font-bold uppercase tracking-widest text-[#FFD166] bg-[#073B4C] rounded-full px-4 py-1.5 inline-block mb-4">
                All 14 Chapters
              </span>
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-[#073B4C] mb-3">
                Pick a Chapter, Start Now
              </h2>
              <p className="font-body text-[#495057] max-w-xl mx-auto">
                Every chapter opens an AI classroom built for NCERT Class 10. Click any chapter to dive in.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {CHAPTERS.map((ch, i) => (
                <motion.a
                  key={ch.num}
                  href={ch.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04, duration: 0.4 }}
                  whileHover={{ y: -5, transition: { type: "spring", stiffness: 300, damping: 18 } }}
                  onMouseEnter={() => setActiveChapter(ch.num)}
                  onMouseLeave={() => setActiveChapter(null)}
                  className="group block rounded-3xl border-4 border-[#073B4C] p-6 shadow-[5px_5px_0px_#073B4C] transition-shadow hover:shadow-[8px_8px_0px_#073B4C] cursor-pointer no-underline"
                  style={{ backgroundColor: ch.color }}
                  aria-label={`Chapter ${ch.num}: ${ch.name}`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <span
                      className="w-11 h-11 rounded-xl border-2 border-[#073B4C] flex items-center justify-center font-heading font-bold text-lg text-[#073B4C]"
                      style={{ backgroundColor: ch.accent + "30" }}
                    >
                      {ch.num}
                    </span>
                    <span
                      className="w-8 h-8 rounded-full border-2 border-[#073B4C] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ backgroundColor: ch.accent }}
                    >
                      <ArrowRight size={14} color="#073B4C" />
                    </span>
                  </div>
                  <h3 className="font-heading text-lg font-bold text-[#073B4C] leading-snug mb-2">
                    {ch.name}
                  </h3>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-[#073B4C]/60 group-hover:text-[#073B4C] transition-colors">
                    Open classroom <ChevronRight size={12} />
                  </span>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* ── SEO / About section ── */}
        <section className="bg-[#F0F4F8] border-y-4 border-[#073B4C] px-6 py-16">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#073B4C] mb-6">
                Why Learn NCERT Class 10 Maths on SlateUp?
              </h2>
              <div className="grid md:grid-cols-2 gap-8 font-body text-[#495057] leading-relaxed">
                <div>
                  <p className="mb-4">
                    The <strong className="text-[#073B4C]">NCERT Class 10 Mathematics</strong> syllabus is the foundation for board exams and competitive preparation. Covering topics from <em>Real Numbers and Polynomials</em> to <em>Trigonometry, Statistics, and Probability</em>, it demands both conceptual clarity and problem-solving practice.
                  </p>
                  <p>
                    SlateUp's AI classrooms break each chapter into interactive lessons you can follow at your own pace, ask questions mid-lesson, and revisit any concept instantly.
                  </p>
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold text-[#073B4C] mb-3">What's inside each classroom?</h3>
                  <ul className="space-y-2">
                    {[
                      "AI-narrated concept explanations",
                      "NCERT exercise walkthroughs",
                      "Live Q&A with your AI study group",
                      "Key formulas and quick-revision notes",
                      "Board exam tips chapter-by-chapter",
                    ].map(item => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-1 w-4 h-4 rounded-full bg-[#06D6A0] border-2 border-[#073B4C] flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Chapter Index for SEO ── */}
        <section className="px-6 py-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-2xl font-bold text-[#073B4C] mb-5">NCERT Class 10 Maths — Chapter List</h2>
            <ol className="grid sm:grid-cols-2 gap-2 font-body text-sm text-[#073B4C]">
              {CHAPTERS.map(ch => (
                <li key={ch.num} className="flex items-center gap-2">
                  <span className="font-bold text-[#118AB2] w-7 flex-shrink-0">{ch.num}</span>
                  <a
                    href={ch.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#118AB2] transition-colors border-b border-dashed border-[#073B4C]/30 hover:border-[#118AB2]"
                  >
                    {ch.name}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── CTA Banner ── */}
        <section className="bg-[#EF476F] border-t-4 border-[#073B4C] px-6 py-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 bg-white/20 text-white rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest mb-5 border-2 border-white/40">
              <Sparkles size={13} /> Free to start
            </div>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
              Ready to ace Class 10 Maths?
            </h2>
            <p className="font-body text-lg text-white/85 mb-8 leading-relaxed">
              Join thousands of students using SlateUp's AI classrooms to understand every NCERT chapter, solve problems confidently, and prepare for board exams.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://app.slateup.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-press inline-flex items-center gap-2 bg-white text-[#073B4C] rounded-full px-8 py-4 font-bold text-lg border-2 border-[#073B4C] shadow-[4px_4px_0px_#073B4C] hover:scale-105 transition-transform"
              >
                Join SlateUp — It's Free <ArrowRight size={20} />
              </a>
              <a
                href="#chapters"
                className="btn-press inline-flex items-center gap-2 bg-transparent text-white rounded-full px-8 py-4 font-bold text-lg border-2 border-white hover:bg-white/10 transition-colors"
              >
                Browse Chapters
              </a>
            </div>
          </motion.div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="bg-[#073B4C] px-6 py-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
          <div>
            <span className="font-heading text-2xl font-bold text-white tracking-[-0.025em]">SLATE UP</span>
            <p className="font-body text-white/40 text-sm mt-2 max-w-xs">
              AI-powered interactive classrooms for every learner.
            </p>
          </div>
          <div className="flex flex-col gap-2 text-sm text-white/60 text-center md:text-left">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <Link to="/blogs" className="hover:text-white transition-colors">Blogs</Link>
            <a href="https://app.slateup.ai" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">App</a>
            <span>hello@slateup.ai</span>
          </div>
        </div>
        <div className="border-t border-white/10 mt-8 pt-5 text-center">
          <p className="font-body text-white/30 text-xs">
            &copy; {new Date().getFullYear()} Slate Up. All rights reserved. · NCERT is a trademark of the National Council of Educational Research and Training.
          </p>
        </div>
      </footer>
    </div>
  );
}
