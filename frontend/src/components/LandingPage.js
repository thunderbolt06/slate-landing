import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  GraduationCap, BookOpen, PenLine, Brain, Laugh,
  ChevronDown, Sparkles, Presentation, MessageSquare,
  Zap, Users, BookMarked, Menu, X, ArrowRight
} from "lucide-react";
import { Input } from "@/components/ui/input";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

/* ─── Character Avatars (SVG) ─── */
const TeacherAvatar = () => (
  <svg width="130" height="140" viewBox="0 0 130 140" className="character-svg">
    <ellipse cx="65" cy="105" rx="38" ry="30" fill="#118AB2" stroke="#073B4C" strokeWidth="3.5"/>
    <circle cx="65" cy="52" r="28" fill="#FFF0DB" stroke="#073B4C" strokeWidth="3.5"/>
    <ellipse cx="65" cy="27" rx="30" ry="5" fill="#073B4C"/>
    <rect x="48" y="16" width="34" height="13" rx="1" fill="#073B4C"/>
    <line x1="82" y1="27" x2="88" y2="36" stroke="#FFD166" strokeWidth="2"/>
    <circle cx="88" cy="38" r="3" fill="#FFD166"/>
    <circle cx="55" cy="50" r="8" fill="none" stroke="#073B4C" strokeWidth="2.5"/>
    <circle cx="75" cy="50" r="8" fill="none" stroke="#073B4C" strokeWidth="2.5"/>
    <line x1="63" y1="50" x2="67" y2="50" stroke="#073B4C" strokeWidth="2"/>
    <circle cx="55" cy="50" r="3" fill="#073B4C"/>
    <circle cx="75" cy="50" r="3" fill="#073B4C"/>
    <circle cx="56" cy="48" r="1" fill="white"/>
    <circle cx="76" cy="48" r="1" fill="white"/>
    <path d="M 56 64 Q 65 72 74 64" fill="none" stroke="#073B4C" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M 27 100 Q 32 88 42 92" fill="none" stroke="#073B4C" strokeWidth="3" strokeLinecap="round"/>
    <path d="M 103 100 Q 98 88 88 92" fill="none" stroke="#073B4C" strokeWidth="3" strokeLinecap="round"/>
  </svg>
);

const StudentAvatar = () => (
  <svg width="130" height="140" viewBox="0 0 130 140" className="character-svg">
    <ellipse cx="65" cy="105" rx="38" ry="30" fill="#FFD166" stroke="#073B4C" strokeWidth="3.5"/>
    <circle cx="65" cy="52" r="28" fill="#FFF0DB" stroke="#073B4C" strokeWidth="3.5"/>
    <path d="M 40 42 Q 42 20 65 22 Q 88 20 90 42" fill="#073B4C" stroke="#073B4C" strokeWidth="2"/>
    <path d="M 48 32 L 52 20" stroke="#073B4C" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M 82 32 L 78 20" stroke="#073B4C" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M 65 28 L 65 16" stroke="#073B4C" strokeWidth="2.5" strokeLinecap="round"/>
    <circle cx="55" cy="50" r="5" fill="white" stroke="#073B4C" strokeWidth="2"/>
    <circle cx="75" cy="50" r="5" fill="white" stroke="#073B4C" strokeWidth="2"/>
    <circle cx="56" cy="49" r="2.5" fill="#073B4C"/>
    <circle cx="76" cy="49" r="2.5" fill="#073B4C"/>
    <ellipse cx="65" cy="65" rx="5" ry="4" fill="#073B4C"/>
    <circle cx="44" cy="58" r="5" fill="#EF476F" opacity="0.25"/>
    <circle cx="86" cy="58" r="5" fill="#EF476F" opacity="0.25"/>
    <rect x="85" y="88" width="16" height="22" rx="2" fill="#118AB2" stroke="#073B4C" strokeWidth="2"/>
    <line x1="88" y1="94" x2="98" y2="94" stroke="white" strokeWidth="1.5" opacity="0.6"/>
    <line x1="88" y1="98" x2="96" y2="98" stroke="white" strokeWidth="1.5" opacity="0.6"/>
  </svg>
);

const NotesTakerAvatar = () => (
  <svg width="130" height="140" viewBox="0 0 130 140" className="character-svg">
    <ellipse cx="65" cy="105" rx="38" ry="30" fill="#06D6A0" stroke="#073B4C" strokeWidth="3.5"/>
    <circle cx="65" cy="52" r="28" fill="#FFF0DB" stroke="#073B4C" strokeWidth="3.5"/>
    <path d="M 39 44 Q 40 22 65 25 Q 90 22 91 44" fill="#5D4037" stroke="#073B4C" strokeWidth="2"/>
    <line x1="88" y1="32" x2="100" y2="20" stroke="#FFD166" strokeWidth="3.5" strokeLinecap="round"/>
    <polygon points="100,20 104,15 97,17" fill="#EF476F"/>
    <ellipse cx="55" cy="50" rx="4" ry="3.5" fill="#073B4C"/>
    <ellipse cx="75" cy="50" rx="4" ry="3.5" fill="#073B4C"/>
    <circle cx="56" cy="49" r="1" fill="white"/>
    <circle cx="76" cy="49" r="1" fill="white"/>
    <line x1="49" y1="42" x2="61" y2="43.5" stroke="#073B4C" strokeWidth="2.5" strokeLinecap="round"/>
    <line x1="81" y1="43.5" x2="69" y2="42" stroke="#073B4C" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M 57 63 L 73 63" stroke="#073B4C" strokeWidth="2.5" strokeLinecap="round"/>
    <rect x="18" y="85" width="20" height="26" rx="2" fill="white" stroke="#073B4C" strokeWidth="2.5"/>
    <line x1="22" y1="91" x2="34" y2="91" stroke="#06D6A0" strokeWidth="1.5"/>
    <line x1="22" y1="96" x2="34" y2="96" stroke="#06D6A0" strokeWidth="1.5"/>
    <line x1="22" y1="101" x2="30" y2="101" stroke="#06D6A0" strokeWidth="1.5"/>
  </svg>
);

const DeepThinkerAvatar = () => (
  <svg width="130" height="140" viewBox="0 0 130 140" className="character-svg">
    <ellipse cx="65" cy="105" rx="38" ry="30" fill="#8338EC" stroke="#073B4C" strokeWidth="3.5"/>
    <circle cx="65" cy="52" r="28" fill="#FFF0DB" stroke="#073B4C" strokeWidth="3.5"/>
    <path d="M 39 48 Q 37 22 58 18 Q 78 15 86 24 Q 92 32 91 48" fill="#2D1B69" stroke="#073B4C" strokeWidth="2"/>
    <circle cx="96" cy="28" r="4" fill="white" stroke="#073B4C" strokeWidth="1.5"/>
    <circle cx="105" cy="18" r="6" fill="white" stroke="#073B4C" strokeWidth="1.5"/>
    <circle cx="115" cy="8" r="8" fill="white" stroke="#073B4C" strokeWidth="1.5"/>
    <path d="M 112 5 Q 115 2 118 5 Q 120 8 117 10" fill="none" stroke="#8338EC" strokeWidth="1.5"/>
    <circle cx="55" cy="50" r="4.5" fill="white" stroke="#073B4C" strokeWidth="2"/>
    <circle cx="75" cy="50" r="4.5" fill="white" stroke="#073B4C" strokeWidth="2"/>
    <circle cx="56" cy="48" r="2" fill="#073B4C"/>
    <circle cx="76" cy="48" r="2" fill="#073B4C"/>
    <path d="M 58 64 Q 65 67 72 64" fill="none" stroke="#073B4C" strokeWidth="2" strokeLinecap="round"/>
    <path d="M 80 68 Q 82 72 80 82" fill="none" stroke="#FFF0DB" strokeWidth="6"/>
    <path d="M 80 68 Q 82 72 80 82" fill="none" stroke="#073B4C" strokeWidth="2.5" strokeLinecap="round"/>
  </svg>
);

const FunnyMateAvatar = () => (
  <svg width="130" height="140" viewBox="0 0 130 140" className="character-svg">
    <ellipse cx="65" cy="105" rx="38" ry="30" fill="#EF476F" stroke="#073B4C" strokeWidth="3.5"/>
    <circle cx="65" cy="52" r="28" fill="#FFF0DB" stroke="#073B4C" strokeWidth="3.5"/>
    <path d="M 44 38 L 47 18 L 54 32 L 60 14 L 65 30 L 70 12 L 76 32 L 83 18 L 86 38" fill="#FF6B35" stroke="#073B4C" strokeWidth="2"/>
    <polygon points="100,34 102,28 104,34 99,31 105,31" fill="#FFD166" stroke="#073B4C" strokeWidth="1"/>
    <polygon points="28,30 30,24 32,30 27,27 33,27" fill="#FFD166" stroke="#073B4C" strokeWidth="1"/>
    <path d="M 49 48 Q 54 43 59 48" fill="none" stroke="#073B4C" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M 71 48 Q 76 43 81 48" fill="none" stroke="#073B4C" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M 52 62 Q 65 76 78 62" fill="white" stroke="#073B4C" strokeWidth="2.5" strokeLinecap="round"/>
    <line x1="58" y1="66" x2="72" y2="66" stroke="#073B4C" strokeWidth="1"/>
    <circle cx="44" cy="56" r="5" fill="#EF476F" opacity="0.35"/>
    <circle cx="86" cy="56" r="5" fill="#EF476F" opacity="0.35"/>
    <path d="M 103 96 Q 100 84 92 82 Q 96 74 102 68" fill="none" stroke="#073B4C" strokeWidth="3" strokeLinecap="round"/>
  </svg>
);

const AVATAR_MAP = {
  teacher: TeacherAvatar,
  student: StudentAvatar,
  notestaker: NotesTakerAvatar,
  deepthinker: DeepThinkerAvatar,
  funnymate: FunnyMateAvatar,
};

const CHARACTERS = [
  { key: "teacher", name: "Professor Sage", role: "The Teacher", color: "#118AB2", bg: "#D4F0FF", desc: "Guides your learning journey with expert knowledge and engaging narration" },
  { key: "student", name: "You", role: "The Student", color: "#FFD166", bg: "#FFF8E1", desc: "Ask anything, explore any topic, and learn at your own pace" },
  { key: "notestaker", name: "Noti", role: "Notes Taker", color: "#06D6A0", bg: "#E0FFF4", desc: "Captures every important detail so you never miss a thing" },
  { key: "deepthinker", name: "Deepa", role: "Deep Thinker", color: "#8338EC", bg: "#F0E6FF", desc: "Asks the tough questions and digs deeper into every topic" },
  { key: "funnymate", name: "Chuckle", role: "Funny Mate", color: "#EF476F", bg: "#FFE4EC", desc: "Makes learning fun with humor, memes, and witty commentary" },
];

const STEPS = [
  { icon: MessageSquare, title: "Ask", desc: "Type any topic you want to learn about in a simple prompt", color: "#FFD166", num: "01" },
  { icon: Sparkles, title: "Generate", desc: "AI creates personalized slides, narration, and your AI classmates", color: "#06D6A0", num: "02" },
  { icon: Presentation, title: "Learn", desc: "Enter your interactive classroom and start an engaging learning session", color: "#EF476F", num: "03" },
];

const FEATURES = [
  { icon: Sparkles, title: "AI Course Generation", desc: "Get a full course with slides and narration generated instantly from any topic", color: "#FFD166" },
  { icon: Users, title: "AI Classmates", desc: "Learn alongside smart AI characters that take notes, think deep, and crack jokes", color: "#8338EC" },
  { icon: Presentation, title: "Interactive Slides", desc: "Beautiful slides with narration, visuals, and interactive elements", color: "#118AB2" },
  { icon: Zap, title: "Instant Learning", desc: "No waiting. Type a topic and enter your personalized classroom in seconds", color: "#EF476F" },
  { icon: BookMarked, title: "Any Subject", desc: "From Python to Philosophy, quantum physics to cooking - learn anything", color: "#06D6A0" },
  { icon: BookOpen, title: "Personal Pace", desc: "Go fast or slow. Replay, revisit, and learn on your own schedule", color: "#FF6B35" },
];

/* ─── Animated Section Wrapper ─── */
const AnimSection = ({ children, className, id }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.section
      ref={ref}
      id={id}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6 }}
      className={className}
    >
      {children}
    </motion.section>
  );
};

/* ─── Character Card ─── */
const CharacterCard = ({ character, index }) => {
  const Avatar = AVATAR_MAP[character.key];
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -8, transition: { type: "spring", stiffness: 300, damping: 20 } }}
      className="neo-card bg-white border-4 border-[#073B4C] rounded-3xl p-5 shadow-[6px_6px_0px_#073B4C] flex flex-col items-center text-center"
      data-testid={`character-card-${character.key}`}
    >
      <div className="bobble mb-3" style={{ animationDelay: `${index * 0.4}s` }}>
        <Avatar />
      </div>
      <h3 className="font-heading text-lg font-bold text-[#073B4C]">{character.name}</h3>
      <span
        className="inline-block mt-1 mb-2 text-xs font-bold px-3 py-1 rounded-full border-2 border-[#073B4C] text-white shadow-[2px_2px_0px_#073B4C]"
        style={{ backgroundColor: character.color }}
      >
        {character.role}
      </span>
      <p className="text-sm text-[#495057] leading-snug">{character.desc}</p>
    </motion.div>
  );
};

/* ─── Waitlist Form ─── */
const WaitlistForm = ({ variant = "light" }) => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    setError("");
    try {
      await axios.post(`${API}/waitlist`, { email });
      setSubmitted(true);
    } catch (err) {
      setError(err.response?.data?.detail || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isDark = variant === "dark";
  const inputBg = isDark ? "bg-white text-[#073B4C] placeholder:text-[#495057] border-[#073B4C]" : "bg-white border-[#073B4C]";
  const btnClass = isDark
    ? "bg-[#FFD166] text-[#073B4C] hover:bg-[#ffe08a] border-[#073B4C]"
    : "bg-[#EF476F] text-white hover:bg-[#d63c5f] border-[#073B4C]";

  if (submitted) {
    return (
      <div className="text-center py-4" data-testid="waitlist-success">
        <p className={`font-heading text-2xl font-bold ${isDark ? "text-white" : "text-[#06D6A0]"}`}>
          Welcome aboard!
        </p>
        <p className={`mt-2 ${isDark ? "text-white/80" : "text-[#495057]"}`}>
          Check your email for a welcome message.
        </p>
        <a
          href="https://slate-app.thechalklabs.com"
          className={`inline-block mt-4 font-bold underline ${isDark ? "text-[#FFD166]" : "text-[#118AB2]"}`}
          data-testid="redirect-link"
        >
          Continue to SLATE →
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-lg mx-auto">
      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={`h-14 rounded-full px-6 text-lg border-3 shadow-[3px_3px_0px_#073B4C] ${inputBg}`}
        data-testid="waitlist-email-input"
        required
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className={`btn-press h-14 rounded-full px-8 font-bold text-lg border-2 shadow-[4px_4px_0px_#073B4C] transition-transform hover:scale-105 disabled:opacity-60 whitespace-nowrap ${btnClass}`}
        data-testid="waitlist-submit-button"
      >
        {isSubmitting ? "Joining..." : "Join Waitlist"}
      </button>
      {error && <p className="text-red-500 text-sm mt-1 col-span-full" data-testid="waitlist-error">{error}</p>}
    </form>
  );
};

/* ═══════════════════════════════════════════════════
   MAIN LANDING PAGE
   ═══════════════════════════════════════════════════ */
export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [waitlistCount, setWaitlistCount] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const onScroll = () => setScrolled(container.scrollTop > 50);
    container.addEventListener("scroll", onScroll);
    return () => container.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    axios.get(`${API}/waitlist/count`).then(r => setWaitlistCount(r.data.count)).catch(() => {});
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="h-screen flex flex-col">
      {/* ── Navbar ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "glass-nav shadow-sm" : "bg-transparent"}`}
        data-testid="navbar"
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <span className="font-heading text-2xl font-bold text-[#073B4C] tracking-tight">SLATE</span>
            <span className="bg-[#EF476F] text-white text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#073B4C]">BETA</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            {[["characters", "Characters"], ["how-it-works", "How It Works"], ["features", "Features"]].map(([id, label]) => (
              <button key={id} onClick={() => scrollTo(id)} className="font-body font-semibold text-[#073B4C] hover:text-[#118AB2] transition-colors">
                {label}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollTo("waitlist")}
              className="hidden md:inline-flex btn-press bg-[#EF476F] text-white rounded-full px-5 py-2 font-bold text-sm border-2 border-[#073B4C] shadow-[3px_3px_0px_#073B4C] hover:scale-105 transition-transform"
              data-testid="nav-join-waitlist"
            >
              Join Waitlist
            </button>
            <button className="md:hidden text-[#073B4C]" onClick={() => setMenuOpen(!menuOpen)} data-testid="mobile-menu-toggle">
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-white border-t-2 border-[#073B4C] px-6 py-4 flex flex-col gap-3"
          >
            {[["characters", "Characters"], ["how-it-works", "How It Works"], ["features", "Features"], ["waitlist", "Join Waitlist"]].map(([id, label]) => (
              <button key={id} onClick={() => scrollTo(id)} className="font-body font-semibold text-[#073B4C] text-left py-2 hover:text-[#118AB2]">
                {label}
              </button>
            ))}
          </motion.div>
        )}
      </header>

      {/* ── Main Scroll Container ── */}
      <div ref={containerRef} className="snap-container" data-testid="scroll-container">

        {/* ═══ HERO ═══ */}
        <section className="snap-section flex flex-col items-center justify-center bg-[#FDFDFD] overflow-hidden px-6 pt-16" id="hero" data-testid="hero-section">
          {/* Floating shapes */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="floating-shape absolute top-[8%] left-[4%] w-16 h-16 md:w-24 md:h-24 bg-[#FFD166] rounded-full border-4 border-[#073B4C] opacity-50" style={{ animationDelay: "0s" }} />
            <div className="floating-shape-reverse absolute top-[15%] right-[8%] w-14 h-14 md:w-20 md:h-20 bg-[#EF476F] rounded-2xl border-4 border-[#073B4C] opacity-50" style={{ animationDelay: "1s" }} />
            <div className="floating-shape absolute bottom-[12%] left-[12%] w-20 h-20 md:w-28 md:h-28 bg-[#118AB2] rounded-full border-4 border-[#073B4C] opacity-30" style={{ animationDelay: "2s" }} />
            <div className="floating-shape-reverse absolute bottom-[20%] right-[6%] w-12 h-12 md:w-16 md:h-16 bg-[#06D6A0] rounded-3xl border-4 border-[#073B4C] opacity-40" style={{ animationDelay: "0.5s" }} />
            <div className="floating-shape absolute top-[45%] left-[50%] w-10 h-10 bg-[#8338EC] rounded-full border-4 border-[#073B4C] opacity-25" style={{ animationDelay: "1.5s" }} />
            <div className="floating-shape-reverse absolute top-[60%] left-[25%] w-8 h-8 bg-[#FF6B35] rounded-lg border-3 border-[#073B4C] opacity-30" style={{ animationDelay: "3s" }} />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10 text-center max-w-4xl"
          >
            <div className="flex items-center justify-center gap-3 mb-3">
              <h1 className="font-heading text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-[#073B4C]" data-testid="hero-title">
                SLATE
              </h1>
              <span className="bg-[#EF476F] text-white text-sm font-bold px-3 py-1 rounded-full border-2 border-[#073B4C] shadow-[3px_3px_0px_#073B4C] self-start mt-4">
                BETA
              </span>
            </div>
            <p className="font-heading text-lg md:text-xl font-semibold text-[#118AB2] mb-2">by Chalk Labs</p>
            <p className="font-body text-base md:text-lg text-[#495057] max-w-2xl mx-auto mb-8 leading-relaxed">
              Your AI-powered interactive classroom. Ask for any topic and get a personalized course
              with slides, narration, and AI classmates — in seconds.
            </p>

            <WaitlistForm variant="light" />

            {waitlistCount > 0 && (
              <p className="mt-4 text-sm text-[#495057] font-medium">
                <span className="font-bold text-[#073B4C]">{waitlistCount}</span> learners on the waitlist
              </p>
            )}

            <button onClick={() => scrollTo("characters")} className="mt-10 inline-block" data-testid="scroll-down">
              <ChevronDown className="mx-auto animate-bounce text-[#073B4C]" size={32} />
            </button>
          </motion.div>
        </section>

        {/* ═══ CHARACTERS ═══ */}
        <AnimSection id="characters" className="snap-section flex flex-col items-center justify-center bg-[#FFD166] px-6 py-20" data-testid="characters-section">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-[#073B4C] text-center mb-3"
          >
            Meet Your AI Classmates
          </motion.h2>
          <p className="font-body text-base md:text-lg text-[#073B4C] text-center max-w-2xl mb-10 opacity-75">
            Every SLATE classroom comes with a unique cast of AI characters that make learning collaborative and fun.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 max-w-7xl w-full">
            {CHARACTERS.map((char, i) => (
              <CharacterCard key={char.key} character={char} index={i} />
            ))}
          </div>
        </AnimSection>

        {/* ═══ HOW IT WORKS ═══ */}
        <AnimSection id="how-it-works" className="snap-section flex flex-col items-center justify-center bg-[#118AB2] px-6 py-20" data-testid="how-it-works-section">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center mb-16"
          >
            How It Works
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="neo-card bg-white border-4 border-[#073B4C] rounded-3xl p-8 shadow-[6px_6px_0px_#073B4C] text-center"
                data-testid={`step-card-${step.num}`}
              >
                <span className="font-heading text-5xl font-bold" style={{ color: step.color }}>{step.num}</span>
                <div className="flex justify-center my-4">
                  <div className="w-16 h-16 rounded-2xl border-3 border-[#073B4C] flex items-center justify-center" style={{ backgroundColor: step.color }}>
                    <step.icon size={32} color="#073B4C" strokeWidth={2.5} />
                  </div>
                </div>
                <h3 className="font-heading text-2xl font-bold text-[#073B4C] mb-2">{step.title}</h3>
                <p className="font-body text-[#495057]">{step.desc}</p>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-12 flex items-center gap-3"
          >
            <span className="hidden md:flex items-center gap-2 text-white/60 text-sm font-body">
              <ArrowRight size={16} /> Scroll down for features
            </span>
          </motion.div>
        </AnimSection>

        {/* ═══ FEATURES ═══ */}
        <AnimSection id="features" className="snap-section flex flex-col items-center justify-center bg-[#FDFDFD] px-6 py-20" data-testid="features-section">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-[#073B4C] text-center mb-4"
          >
            What Makes SLATE Special
          </motion.h2>
          <p className="font-body text-base md:text-lg text-[#495057] text-center max-w-2xl mb-12">
            A new way to learn — powered by AI, designed for you.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full">
            {FEATURES.map((feat, i) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                whileHover={{ y: -6, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                className="neo-card bg-white border-4 border-[#073B4C] rounded-3xl p-6 shadow-[6px_6px_0px_#073B4C]"
                data-testid={`feature-card-${i}`}
              >
                <div
                  className="w-14 h-14 rounded-2xl border-3 border-[#073B4C] flex items-center justify-center mb-4"
                  style={{ backgroundColor: feat.color }}
                >
                  <feat.icon size={28} color="#073B4C" strokeWidth={2.5} />
                </div>
                <h3 className="font-heading text-xl font-bold text-[#073B4C] mb-2">{feat.title}</h3>
                <p className="font-body text-sm text-[#495057] leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </AnimSection>

        {/* ═══ WAITLIST CTA + FOOTER ═══ */}
        <section id="waitlist" className="snap-section flex flex-col" data-testid="waitlist-section">
          <div className="flex-1 flex flex-col items-center justify-center bg-[#EF476F] px-6 py-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="text-center max-w-2xl"
            >
              <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                Join the Beta
              </h2>
              <p className="font-body text-lg text-white/85 mb-8 leading-relaxed">
                Be among the first to experience the future of AI-powered learning.
                Drop your email and we'll send you a welcome aboard message.
              </p>
              <WaitlistForm variant="dark" />
              <div className="mt-8">
                <a
                  href="https://slate-app.thechalklabs.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-press inline-flex items-center gap-2 bg-white text-[#073B4C] rounded-full px-8 py-4 font-bold text-lg border-2 border-[#073B4C] shadow-[4px_4px_0px_#073B4C] hover:scale-105 transition-transform"
                  data-testid="enter-slate-button"
                >
                  Enter SLATE <ArrowRight size={20} />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Footer */}
          <footer className="bg-[#073B4C] px-6 py-12" data-testid="footer">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
                <div>
                  <span className="font-heading text-3xl font-bold text-white tracking-tight">SLATE</span>
                  <p className="font-body text-white/60 text-sm mt-1">by Chalk Labs</p>
                  <p className="font-body text-white/40 text-sm mt-3 max-w-xs">
                    AI-powered interactive classroom. Learn anything, with anyone, anytime.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-8 text-center sm:text-left">
                  <div>
                    <h4 className="font-heading text-sm font-bold text-[#FFD166] uppercase tracking-wider mb-3">Product</h4>
                    <div className="flex flex-col gap-2">
                      <button onClick={() => scrollTo("features")} className="font-body text-white/60 hover:text-white text-sm transition-colors">Features</button>
                      <button onClick={() => scrollTo("how-it-works")} className="font-body text-white/60 hover:text-white text-sm transition-colors">How It Works</button>
                      <button onClick={() => scrollTo("characters")} className="font-body text-white/60 hover:text-white text-sm transition-colors">AI Classmates</button>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-heading text-sm font-bold text-[#FFD166] uppercase tracking-wider mb-3">Company</h4>
                    <div className="flex flex-col gap-2">
                      <a href="https://slate-app.thechalklabs.com" target="_blank" rel="noopener noreferrer" className="font-body text-white/60 hover:text-white text-sm transition-colors">SLATE App</a>
                      <span className="font-body text-white/60 text-sm">hello@thechalklabs.com</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="border-t border-white/10 mt-8 pt-6 text-center">
                <p className="font-body text-white/40 text-sm">&copy; {new Date().getFullYear()} Chalk Labs. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </section>
      </div>
    </div>
  );
}
