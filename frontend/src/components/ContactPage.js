import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Send, CheckCircle, Mail, Building, User, MessageSquare } from "lucide-react";
import axios from "axios";
import { useSeoMeta } from "@/hooks/useSeoMeta";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function ContactPage() {
  useSeoMeta({
    title: "Contact Us | Slate",
    description: "Get in touch with the Slate team — questions about the product, partnerships, schools or press.",
    canonical: "https://www.slateup.ai/contact",
  });

  const [form, setForm] = useState({
    name: "",
    email: "",
    organization: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");
    try {
      await axios.post(`${API}/contact`, form);
      setStatus("success");
    } catch (err) {
      setErrorMsg(err.response?.data?.detail || "Something went wrong. Please try emailing us directly at hello@slateup.ai");
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD]">
      {/* Navbar */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-sm border-b-2 border-[#073B4C]/10">
        <div className="max-w-6xl mx-auto px-6 py-3.5 flex items-center justify-between">
          <Link to="/" className="font-heading text-2xl font-bold text-[#073B4C] tracking-[-0.025em] no-underline">
            SLATE UP
          </Link>
          <a
            href="https://app.slateup.ai/auth/login"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-[#073B4C] text-white rounded-full px-5 py-2 font-bold text-sm border-2 border-[#073B4C] shadow-[3px_3px_0px_#073B4C] hover:scale-105 transition-transform no-underline"
          >
            Try Now
          </a>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-16 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

          {/* Left: Info */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-[11px] font-extrabold tracking-[0.18em] uppercase text-[#118AB2] mb-3" style={{ fontFamily: "Fredoka, sans-serif" }}>
                Get in touch
              </div>
              <h1 className="font-heading text-5xl font-bold text-[#073B4C] mb-4 leading-tight">
                Let's talk about your needs.
              </h1>
              <p className="font-body text-[#495057] text-lg leading-relaxed mb-8">
                Whether you're interested in a demo, exploring our enterprise plan, or just have a question —
                we'd love to hear from you. Fill in the form and we'll get back to you within 24 hours.
              </p>

              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FFD166] border-2 border-[#073B4C] flex items-center justify-center shadow-[2px_2px_0px_#073B4C]">
                    <Mail size={18} className="text-[#073B4C]" strokeWidth={2.5} />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-[#073B4C]">Email us directly</p>
                    <a href="mailto:hello@slateup.ai" className="font-body text-[#118AB2] text-sm hover:underline">hello@slateup.ai</a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#06D6A0] border-2 border-[#073B4C] flex items-center justify-center shadow-[2px_2px_0px_#073B4C]">
                    <MessageSquare size={18} className="text-[#073B4C]" strokeWidth={2.5} />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-[#073B4C]">Typical response time</p>
                    <p className="font-body text-[#495057] text-sm">Within 24 hours on business days</p>
                  </div>
                </div>
              </div>

              {/* Decorative shapes */}
              <div className="relative mt-12 hidden md:block">
                <div className="absolute -left-4 top-0 w-20 h-20 bg-[#FFD166] rounded-full border-4 border-[#073B4C] opacity-60" />
                <div className="absolute left-16 top-12 w-12 h-12 bg-[#EF476F] rounded-2xl border-3 border-[#073B4C] opacity-50" />
                <div className="absolute left-6 top-28 w-8 h-8 bg-[#8338EC] rounded-full border-2 border-[#073B4C] opacity-40" />
              </div>
            </motion.div>
          </div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {status === "success" ? (
              <div className="bg-white border-4 border-[#073B4C] rounded-3xl p-10 shadow-[8px_8px_0px_#073B4C] text-center flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-[#06D6A0] border-3 border-[#073B4C] flex items-center justify-center shadow-[3px_3px_0px_#073B4C]">
                  <CheckCircle size={32} className="text-[#073B4C]" strokeWidth={2.5} />
                </div>
                <h2 className="font-heading text-3xl font-bold text-[#073B4C]">Message sent!</h2>
                <p className="font-body text-[#495057] leading-relaxed">
                  Thanks for reaching out. We've sent a confirmation to <strong>{form.email}</strong> and our team will get back to you shortly.
                </p>
                <button
                  onClick={() => { setStatus("idle"); setForm({ name: "", email: "", organization: "", subject: "", message: "" }); }}
                  className="mt-2 font-bold text-sm text-[#118AB2] hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white border-4 border-[#073B4C] rounded-3xl p-8 shadow-[8px_8px_0px_#073B4C] flex flex-col gap-5"
              >
                <div className="flex flex-col gap-1.5">
                  <label className="font-bold text-sm text-[#073B4C]" htmlFor="name">
                    <User size={14} className="inline mr-1.5 mb-0.5" />Full Name *
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className="h-12 rounded-xl border-2 border-[#073B4C] px-4 text-sm font-semibold text-[#073B4C] placeholder:text-[#495057]/40 focus:outline-none focus:border-[#118AB2] transition-colors shadow-[2px_2px_0px_#073B4C]"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-bold text-sm text-[#073B4C]" htmlFor="email">
                    <Mail size={14} className="inline mr-1.5 mb-0.5" />Email Address *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="h-12 rounded-xl border-2 border-[#073B4C] px-4 text-sm font-semibold text-[#073B4C] placeholder:text-[#495057]/40 focus:outline-none focus:border-[#118AB2] transition-colors shadow-[2px_2px_0px_#073B4C]"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-bold text-sm text-[#073B4C]" htmlFor="organization">
                    <Building size={14} className="inline mr-1.5 mb-0.5" />Organisation
                  </label>
                  <input
                    id="organization"
                    name="organization"
                    type="text"
                    value={form.organization}
                    onChange={handleChange}
                    placeholder="School, company, or institution (optional)"
                    className="h-12 rounded-xl border-2 border-[#073B4C] px-4 text-sm font-semibold text-[#073B4C] placeholder:text-[#495057]/40 focus:outline-none focus:border-[#118AB2] transition-colors shadow-[2px_2px_0px_#073B4C]"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-bold text-sm text-[#073B4C]" htmlFor="subject">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={form.subject}
                    onChange={handleChange}
                    className="h-12 rounded-xl border-2 border-[#073B4C] px-4 text-sm font-semibold text-[#073B4C] focus:outline-none focus:border-[#118AB2] transition-colors shadow-[2px_2px_0px_#073B4C] bg-white"
                  >
                    <option value="">Select a topic…</option>
                    <option value="Schedule a Demo">Schedule a Demo</option>
                    <option value="Enterprise / Schools">Enterprise / Schools</option>
                    <option value="Pricing Question">Pricing Question</option>
                    <option value="Technical Support">Technical Support</option>
                    <option value="Partnership">Partnership</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-bold text-sm text-[#073B4C]" htmlFor="message">
                    <MessageSquare size={14} className="inline mr-1.5 mb-0.5" />Your Requirements *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us about your needs, your team size, or anything else you'd like us to know…"
                    className="rounded-xl border-2 border-[#073B4C] px-4 py-3 text-sm font-semibold text-[#073B4C] placeholder:text-[#495057]/40 focus:outline-none focus:border-[#118AB2] transition-colors shadow-[2px_2px_0px_#073B4C] resize-none"
                  />
                </div>

                {status === "error" && (
                  <p className="text-[#EF476F] text-sm font-semibold">{errorMsg}</p>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="btn-press h-14 rounded-xl bg-[#073B4C] text-white font-bold text-base border-2 border-[#073B4C] shadow-[4px_4px_0px_#073B4C] hover:scale-[1.02] transition-transform disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {status === "submitting" ? (
                    "Sending…"
                  ) : (
                    <>
                      <Send size={18} strokeWidth={2.5} />
                      Send Message
                    </>
                  )}
                </button>

                <p className="text-center text-xs text-[#495057]/60 font-semibold">
                  We'll send a confirmation copy to your email.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </main>

      <footer className="bg-[#073B4C] px-6 py-8 text-center">
        <p className="font-body text-white/40 text-sm">&copy; {new Date().getFullYear()} Slate Up. All rights reserved.</p>
        <div className="flex justify-center gap-6 mt-3">
          <Link to="/terms" className="font-body text-white/40 hover:text-white text-sm transition-colors no-underline">Terms</Link>
          <Link to="/privacy" className="font-body text-white/40 hover:text-white text-sm transition-colors no-underline">Privacy</Link>
          <Link to="/contact" className="font-body text-white/40 hover:text-white text-sm transition-colors no-underline">Contact</Link>
        </div>
      </footer>
    </div>
  );
}
