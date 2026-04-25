import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Check, ChevronDown } from "lucide-react";
import { useSeoMeta } from "@/hooks/useSeoMeta";

const INK = "#073B4C";
const RED = "#EF476F";
const YELLOW = "#FFD166";
const GREEN = "#06D6A0";
const BLUE = "#118AB2";

const FREE_FEATURES = [
  "2 classroom credits, forever",
  "Professor Sage only",
  "Up to 10-min lessons",
  "Classroom chat + quizzes",
];

const PRO_FEATURES = [
  "30 classroom credits / month",
  "All AI Mates",
  "Full-length lessons (up to 45 min)",
  "Instant Classroom, no wait",
  "Import from PDF, YouTube, URL",
  "Progress analytics + streaks",
  "Priority generation queue",
];

const ENT_FEATURES = [
  "Team seats + admin console",
  "Custom course libraries",
  "SSO / SAML + audit logs",
  "Learner analytics dashboards",
  "Co-branded certificates",
  "Dedicated success manager",
];

const FAQS = [
  {
    q: "Will I be charged today?",
    a: "No, your 7-day trial is free. We'll email you 2 days before the trial ends so nothing surprises you.",
  },
  {
    q: "Can I switch plans later?",
    a: "Yes. Upgrade, downgrade, or cancel anytime from your account settings.",
  },
  {
    q: "What counts as a 'course credit'?",
    a: "One fully-generated course with slides, narration, chat, and quizzes. You can replay courses as many times as you want — replays don't cost credits.",
  },
  {
    q: "What happens when I run out of credits?",
    a: "You can top up anytime. Top-ups add 10 Standard Classroom credits, work on any plan, and never expire once purchased.",
  },
];

function FeatureItem({ text, tickColor = GREEN, dark = false }) {
  return (
    <li className="flex items-start gap-3">
      <span
        className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 border-2"
        style={{
          backgroundColor: tickColor,
          borderColor: dark ? "#000" : INK,
          color: dark ? INK : "#fff",
        }}
      >
        <Check size={11} strokeWidth={3} />
      </span>
      <span
        className="text-sm font-semibold leading-snug"
        style={{ color: dark ? "#E6EEF3" : "#334750", fontFamily: "Nunito, sans-serif" }}
      >
        {text}
      </span>
    </li>
  );
}

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <button
      onClick={() => setOpen(v => !v)}
      className="text-left w-full bg-white border-[2.5px] border-[#073B4C] rounded-2xl shadow-[4px_4px_0px_#073B4C] p-4 cursor-pointer flex flex-col gap-2 hover:shadow-[6px_6px_0px_#073B4C] transition-shadow"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="font-bold text-[#073B4C]" style={{ fontFamily: "Fredoka, sans-serif", fontSize: 15 }}>{q}</span>
        <span
          className="font-bold text-[#073B4C] text-xl transition-transform duration-200"
          style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)", display: "inline-block" }}
        >+</span>
      </div>
      {open && (
        <p className="text-sm text-[#495057] leading-relaxed" style={{ fontFamily: "Nunito, sans-serif", fontWeight: 500 }}>
          {a}
        </p>
      )}
    </button>
  );
}

export default function PricingPage() {
  useSeoMeta({
    title: "Pricing — Start Free, Upgrade Anytime | Slate",
    description: "Slate is free to start — 2 classrooms forever. Upgrade to Pro for 30 credits/month. Transparent, no hidden fees.",
    canonical: "https://slateup.ai/pricing",
  });

  const [billing, setBilling] = useState("monthly");

  const monthlyPrice = "$19";
  const yearlyPrice = "$15";
  const yearlyBilled = "Billed $180/yr, save $48";

  return (
    <div className="min-h-screen bg-[#FDFDFD]">
      {/* Navbar */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-sm border-b-2 border-[#073B4C]/10">
        <div className="max-w-6xl mx-auto px-6 py-3.5 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 no-underline"
          >
            <span className="font-heading text-2xl font-bold text-[#073B4C] tracking-[-0.025em]">SLATE UP</span>
          </Link>
          <a
            href="https://app.slateup.ai/auth/login"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#073B4C] text-white rounded-full px-5 py-2 font-bold text-sm border-2 border-[#073B4C] shadow-[3px_3px_0px_#073B4C] hover:scale-105 transition-transform no-underline"
          >
            Try Now
          </a>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-16 pb-24">
        {/* Header */}
        <div className="text-center mb-12">
          <div
            className="text-[11px] font-extrabold tracking-[0.18em] uppercase mb-3"
            style={{ color: RED, fontFamily: "Fredoka, sans-serif" }}
          >
            Slate Plans
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading font-bold text-[#073B4C] mb-4"
            style={{ fontSize: "clamp(36px, 6vw, 60px)", letterSpacing: "-0.03em", lineHeight: 1 }}
          >
            Build smarter.{" "}
            <span
              className="inline-block"
              style={{
                background: YELLOW,
                padding: "0 14px",
                border: `3px solid ${INK}`,
                borderRadius: 14,
                boxShadow: `4px 4px 0 ${INK}`,
                transform: "rotate(-1deg)",
              }}
            >
              Learn faster.
            </span>
          </motion.h1>
          <p className="font-body text-[#495057] max-w-lg mx-auto text-lg leading-relaxed mt-4">
            Start free, no card required. Upgrade any time to unlock Instant Classroom and 30 courses a month.
          </p>
        </div>

        {/* Billing toggle */}
        <div className="flex justify-center mb-10">
          <div
            className="inline-flex gap-1 p-1 bg-white rounded-full border-[3px] border-[#073B4C] shadow-[4px_4px_0px_#073B4C]"
          >
            {["monthly", "yearly"].map(c => {
              const active = billing === c;
              return (
                <button
                  key={c}
                  onClick={() => setBilling(c)}
                  className="px-5 py-2 rounded-full font-bold text-sm transition-all flex items-center gap-2"
                  style={{
                    background: active ? INK : "transparent",
                    color: active ? "#fff" : INK,
                    fontFamily: "Fredoka, sans-serif",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  {c === "monthly" ? "Monthly" : "Yearly"}
                  {c === "yearly" && (
                    <span
                      className="text-[9px] font-bold px-2 py-0.5 rounded-full"
                      style={{ background: GREEN, color: INK, letterSpacing: "0.08em" }}
                    >
                      SAVE 25%
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Plan cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">

          {/* FREE */}
          <div className="relative bg-white border-[3px] border-[#073B4C] rounded-3xl p-7 shadow-[6px_6px_0px_#073B4C] flex flex-col gap-4">
            <div className="text-[11px] font-bold tracking-[0.16em] uppercase" style={{ color: "#6B7B85", fontFamily: "Fredoka, sans-serif" }}>Free forever</div>
            <div className="font-heading text-3xl font-bold text-[#073B4C]">Starter</div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-heading text-5xl font-bold text-[#073B4C]">$0</span>
              <span className="text-sm text-[#6B7B85]">forever</span>
            </div>
            <p className="text-sm text-[#495057] font-semibold" style={{ fontFamily: "Nunito, sans-serif" }}>Dip a toe in. No card needed.</p>
            <ul className="flex flex-col gap-2.5 list-none p-0 m-0">
              {FREE_FEATURES.map(f => <FeatureItem key={f} text={f} tickColor={GREEN} />)}
            </ul>
            <div className="mt-auto pt-4">
              <a
                href="https://app.slateup.ai/auth/login"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center font-bold text-base py-3.5 rounded-2xl border-[3px] border-[#073B4C] shadow-[4px_4px_0px_#073B4C] bg-white text-[#073B4C] hover:scale-[1.02] transition-transform no-underline"
                style={{ fontFamily: "Fredoka, sans-serif" }}
              >
                Get Started Free
              </a>
              <p className="text-center text-[11px] font-semibold text-[#6B7B85] mt-2.5" style={{ fontFamily: "Nunito, sans-serif" }}>No card. No catch. Upgrade whenever.</p>
            </div>
          </div>

          {/* PRO – highlighted */}
          <div className="relative bg-white border-[3px] border-[#073B4C] rounded-3xl p-7 shadow-[8px_8px_0px_#EF476F] flex flex-col gap-4">
            <div
              className="absolute -top-3.5 right-5 text-white text-[10px] font-bold tracking-[0.12em] uppercase px-3 py-1.5 rounded-full border-2 shadow-[2px_2px_0px_#073B4C]"
              style={{ background: RED, borderColor: INK, fontFamily: "Fredoka, sans-serif" }}
            >
              {billing === "yearly" ? "SAVE $48/YR" : "MOST POPULAR"}
            </div>
            <div className="text-[11px] font-bold tracking-[0.16em] uppercase" style={{ color: RED, fontFamily: "Fredoka, sans-serif" }}>
              Pro · {billing === "monthly" ? "Monthly" : "Yearly"}
            </div>
            <div className="font-heading text-3xl font-bold text-[#073B4C]">Slate Pro</div>
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-heading text-5xl font-bold text-[#073B4C]">
                  {billing === "monthly" ? monthlyPrice : yearlyPrice}
                </span>
                <span className="text-sm text-[#6B7B85]">/ month</span>
              </div>
              {billing === "yearly" && (
                <div className="text-xs font-bold mt-1" style={{ color: "#05A37A", fontFamily: "Nunito, sans-serif" }}>
                  {yearlyBilled}
                </div>
              )}
            </div>
            <p className="text-sm text-[#495057] font-semibold" style={{ fontFamily: "Nunito, sans-serif" }}>Everything to actually build momentum.</p>
            <div
              className="rounded-2xl p-3 flex items-center gap-2.5"
              style={{ background: YELLOW, border: `2.5px solid ${INK}`, boxShadow: `3px 3px 0 ${INK}` }}
            >
              <span className="text-2xl">🎁</span>
              <div>
                <div className="font-bold text-sm text-[#073B4C]" style={{ fontFamily: "Fredoka, sans-serif" }}>50% off your first month</div>
                <div className="font-bold text-xs text-[#073B4C]" style={{ fontFamily: "Nunito, sans-serif" }}>just $10 to start</div>
              </div>
            </div>
            <ul className="flex flex-col gap-2.5 list-none p-0 m-0">
              {PRO_FEATURES.map(f => <FeatureItem key={f} text={f} tickColor={RED} />)}
            </ul>
            <div className="mt-auto pt-4">
              <a
                href="https://app.slateup.ai/auth/login"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center font-bold text-base py-3.5 rounded-2xl border-[3px] border-[#073B4C] shadow-[4px_4px_0px_#073B4C] text-white hover:scale-[1.02] transition-transform no-underline"
                style={{ background: RED, fontFamily: "Fredoka, sans-serif" }}
              >
                Start 7-day free trial →
              </a>
              <p className="text-center text-[11px] font-semibold text-[#6B7B85] mt-2.5" style={{ fontFamily: "Nunito, sans-serif" }}>Card required. We'll remind you 2 days before charge.</p>
            </div>
          </div>

          {/* ENTERPRISE */}
          <div className="relative rounded-3xl p-7 flex flex-col gap-4" style={{ background: "#0F1B24", border: `3px solid ${INK}`, boxShadow: `6px 6px 0 ${INK}` }}>
            <div className="text-[11px] font-bold tracking-[0.16em] uppercase" style={{ color: YELLOW, fontFamily: "Fredoka, sans-serif" }}>Enterprise</div>
            <div className="font-heading text-3xl font-bold text-white">Custom</div>
            <div className="text-sm font-bold" style={{ color: "#B7C4CD", fontFamily: "Nunito, sans-serif" }}>Volume pricing · annual agreements</div>
            <p className="text-sm font-semibold" style={{ color: "#D9E2E8", fontFamily: "Nunito, sans-serif" }}>For schools, bootcamps, and teams learning together.</p>
            <ul className="flex flex-col gap-2.5 list-none p-0 m-0">
              {ENT_FEATURES.map(f => <FeatureItem key={f} text={f} tickColor={YELLOW} dark />)}
            </ul>
            <div className="mt-auto pt-4">
              <a
                href="mailto:hello@slateup.ai?subject=Slate%20Enterprise%20Inquiry&body=Hi%20Slate%20team%2C%20I%27d%20like%20to%20learn%20more%20about%20your%20Enterprise%20plan."
                className="block w-full text-center font-bold text-base py-3.5 rounded-2xl border-[3px] border-[#073B4C] shadow-[4px_4px_0px_#000] hover:scale-[1.02] transition-transform no-underline"
                style={{ background: YELLOW, color: INK, fontFamily: "Fredoka, sans-serif" }}
              >
                Contact sales →
              </a>
              <p className="text-center text-[11px] font-semibold mt-2.5" style={{ color: "#B7C4CD", fontFamily: "Nunito, sans-serif" }}>Talk to our team · typically replies same day.</p>
            </div>
          </div>
        </div>

        {/* Trust strip */}
        <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm font-bold text-[#6B7B85]" style={{ fontFamily: "Nunito, sans-serif" }}>
          <span>✓ Cancel anytime</span>
          <span>✓ Secure checkout</span>
          <span>✓ No hidden fees</span>
          <span>✓ 7-day free trial</span>
        </div>

        {/* How credits work */}
        <div
          className="mt-12 rounded-3xl p-6"
          style={{ background: "#fff", border: `3px solid ${INK}`, boxShadow: `6px 6px 0 ${INK}`, maxWidth: 880, margin: "40px auto 0" }}
        >
          <div className="flex items-center gap-2.5 mb-4">
            <span
              className="w-6 h-6 rounded-full flex items-center justify-center font-bold text-sm text-white border-2"
              style={{ background: BLUE, borderColor: INK, fontFamily: "Fredoka, sans-serif" }}
            >i</span>
            <h3 className="font-bold text-sm uppercase tracking-[0.14em] text-[#073B4C]" style={{ fontFamily: "Fredoka, sans-serif" }}>
              How credits work
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.14em] text-[#6B7B85] mb-1.5" style={{ fontFamily: "Fredoka, sans-serif" }}>Free</div>
              <p className="text-sm font-semibold text-[#334750] leading-relaxed" style={{ fontFamily: "Nunito, sans-serif" }}>
                2 lifetime classroom credits. Once used, top up for $5 per 10 extra classrooms.
              </p>
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.14em] mb-1.5" style={{ color: BLUE, fontFamily: "Fredoka, sans-serif" }}>Pro</div>
              <p className="text-sm font-semibold text-[#334750] leading-relaxed" style={{ fontFamily: "Nunito, sans-serif" }}>
                30 classroom credits per month (Standard + Instant), reset on your billing date. Unused credits don't carry over.
              </p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t-2 border-[#073B4C]/10 flex items-center gap-2.5 text-sm font-semibold text-[#6B7B85]" style={{ fontFamily: "Nunito, sans-serif" }}>
            <span>↻</span>
            <span>Top-ups add 10 Standard Classroom credits for $5 and work on any plan. Credits never expire once purchased.</span>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-16" style={{ maxWidth: 880, margin: "64px auto 0" }}>
          <div className="text-center mb-8">
            <div className="text-[11px] font-bold tracking-[0.18em] uppercase mb-2" style={{ color: RED, fontFamily: "Fredoka, sans-serif" }}>Questions?</div>
            <h2 className="font-heading font-bold text-[#073B4C]" style={{ fontSize: "clamp(26px, 4vw, 36px)", letterSpacing: "-0.02em" }}>
              Good, we have answers.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {FAQS.map(f => <FAQItem key={f.q} q={f.q} a={f.a} />)}
          </div>
        </div>
      </main>

      {/* Footer */}
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
