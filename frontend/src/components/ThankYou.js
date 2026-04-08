import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail, BookOpen, Users, Presentation, Sparkles, Home } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const HIGHLIGHTS = [
  { icon: Sparkles, title: "AI Course Generation", desc: "Full courses created instantly from any topic", color: "#FFD166" },
  { icon: Users, title: "AI Classmates", desc: "Notes Taker, Deep Thinker, Funny Mate & Curious Mind", color: "#8338EC" },
  { icon: Presentation, title: "Interactive Slides", desc: "Beautiful slides with narration and visuals", color: "#118AB2" },
  { icon: BookOpen, title: "Learn Anything", desc: "From Python to Philosophy — at your own pace", color: "#06D6A0" },
];

export default function ThankYou() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    axios.get(`${API}/waitlist/count`).then(r => setCount(r.data.count)).catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFDFD] flex flex-col">
      {/* Header */}
      <header className="px-6 py-4 flex items-center justify-between max-w-6xl mx-auto w-full">
        <Link to="/" className="flex items-center gap-2" data-testid="thank-you-home-link">
          <span className="font-heading text-2xl font-bold text-[#073B4C] tracking-tight">SLATE</span>
          <span className="bg-[#EF476F] text-white text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#073B4C]">BETA</span>
        </Link>
        <Link
          to="/"
          className="flex items-center gap-1.5 text-sm font-semibold text-[#073B4C] hover:text-[#118AB2] transition-colors"
        >
          <Home size={16} /> Back to Home
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        {/* Success Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-white border-4 border-[#073B4C] rounded-3xl p-8 md:p-12 shadow-[8px_8px_0px_#073B4C] max-w-2xl w-full text-center"
          data-testid="thank-you-card"
        >
          {/* Checkmark */}
          <div className="mx-auto w-20 h-20 rounded-full bg-[#06D6A0] border-4 border-[#073B4C] flex items-center justify-center mb-6 shadow-[4px_4px_0px_#073B4C]">
            <Mail size={36} color="white" strokeWidth={2.5} />
          </div>

          <h1 className="font-heading text-3xl md:text-4xl font-bold text-[#073B4C] mb-3" data-testid="thank-you-title">
            You're on the list!
          </h1>
          <p className="font-body text-lg text-[#495057] mb-2">
            We've sent a welcome email to your inbox.
          </p>
          {count > 0 && (
            <p className="font-body text-sm text-[#495057] mb-6" data-testid="thank-you-count">
              You're joining <span className="font-bold text-[#073B4C]">{count}</span> other learners on the waitlist.
            </p>
          )}

          {/* CTA to SLATE App */}
          <a
            href="https://slate-app.thechalklabs.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-press inline-flex items-center gap-2 bg-[#EF476F] text-white rounded-full px-8 py-4 font-bold text-lg border-2 border-[#073B4C] shadow-[4px_4px_0px_#073B4C] hover:scale-105 transition-transform"
            data-testid="enter-slate-button"
          >
            Enter SLATE <ArrowRight size={20} />
          </a>
        </motion.div>

        {/* What's Coming */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="max-w-3xl w-full mt-12"
        >
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-[#073B4C] text-center mb-8">
            Here's what awaits you
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {HIGHLIGHTS.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1, duration: 0.4 }}
                className="neo-card bg-white border-3 border-[#073B4C] rounded-2xl p-5 shadow-[4px_4px_0px_#073B4C] flex items-start gap-4"
                data-testid={`highlight-card-${i}`}
              >
                <div
                  className="w-12 h-12 shrink-0 rounded-xl border-2 border-[#073B4C] flex items-center justify-center"
                  style={{ backgroundColor: item.color }}
                >
                  <item.icon size={22} color="#073B4C" strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="font-heading text-base font-bold text-[#073B4C]">{item.title}</h3>
                  <p className="font-body text-sm text-[#495057] mt-0.5">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Secondary Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-10 text-center"
        >
          <a
            href="https://slate-app.thechalklabs.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-press inline-flex items-center gap-2 bg-[#FFD166] text-[#073B4C] rounded-full px-8 py-3 font-bold border-2 border-[#073B4C] shadow-[4px_4px_0px_#073B4C] hover:scale-105 transition-transform"
            data-testid="try-slate-button"
          >
            Try SLATE Now <ArrowRight size={18} />
          </a>
          <p className="font-body text-sm text-[#495057] mt-4">
            Or <Link to="/" className="font-bold text-[#118AB2] hover:underline">go back to the homepage</Link>
          </p>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="bg-[#073B4C] px-6 py-6 text-center">
        <p className="font-body text-white/40 text-sm">&copy; {new Date().getFullYear()} Chalk Labs. All rights reserved.</p>
      </footer>
    </div>
  );
}
