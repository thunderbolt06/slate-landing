import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSeoMeta } from "@/hooks/useSeoMeta";

export default function PrivacyPage() {
  useSeoMeta({
    title: "Privacy Policy | Slate",
    description: "Read how Slate collects, stores and protects your personal data.",
    canonical: "https://slateup.ai/privacy",
  });

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

      <main className="max-w-3xl mx-auto px-6 py-16 pb-24">
        <h1 className="font-heading text-5xl font-bold text-[#073B4C] mb-3">Privacy Policy</h1>
        <p className="font-body text-[#495057] mb-10">Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>

        <div className="space-y-8">

          <Section title="1. Introduction">
            <p>
              Slate Up ("we", "us", or "our") is committed to protecting your privacy. This Privacy Policy explains
              how we collect, use, disclose, and safeguard your information when you use our platform at slateup.ai
              and app.slateup.ai (the "Service").
            </p>
            <p>
              Please read this policy carefully. By using the Service, you consent to the practices described here.
            </p>
          </Section>

          <Section title="2. Information We Collect">
            <p>We collect several types of information:</p>
            <h4 className="font-bold text-[#073B4C] mt-3 mb-1">Information You Provide</h4>
            <ul>
              <li>Account information (name, email address, password)</li>
              <li>Payment information (processed securely by Stripe or Razorpay — we do not store card details)</li>
              <li>Content you create or upload on the platform (topics, course inputs, PDFs, URLs)</li>
              <li>Communications with our support team</li>
            </ul>
            <h4 className="font-bold text-[#073B4C] mt-3 mb-1">Information Collected Automatically</h4>
            <ul>
              <li>Usage data (pages visited, features used, session duration)</li>
              <li>Device information (browser type, operating system, IP address)</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
          </Section>

          <Section title="3. How We Use Your Information">
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide, maintain, and improve the Service</li>
              <li>Process payments and manage subscriptions</li>
              <li>Generate personalised AI-powered learning content</li>
              <li>Send transactional emails (account creation, billing, trial reminders)</li>
              <li>Send product updates and educational content (you can opt out at any time)</li>
              <li>Analyse usage patterns to improve user experience</li>
              <li>Detect and prevent fraud or misuse</li>
              <li>Comply with legal obligations</li>
            </ul>
          </Section>

          <Section title="4. Cookies">
            <p>
              We use cookies and similar technologies to enhance your experience. Cookies are small files stored
              on your device that help us remember your preferences and understand how you use the Service.
            </p>
            <p>
              You can control cookie settings through your browser. Disabling certain cookies may affect the
              functionality of the Service.
            </p>
          </Section>

          <Section title="5. AI and Your Content">
            <p>
              When you use the Service to generate learning content, your inputs (topics, questions, uploaded
              documents) are processed by AI models to generate responses. We may use anonymised, aggregated
              data to improve our AI systems.
            </p>
            <p>
              We do not sell your personal content to third parties or use it to train AI models without your
              explicit consent.
            </p>
          </Section>

          <Section title="6. Sharing Your Information">
            <p>We do not sell your personal information. We may share your information with:</p>
            <ul>
              <li><strong>Service providers:</strong> Third-party vendors who assist in operating the Service (e.g., cloud hosting, payment processors, analytics tools), bound by confidentiality agreements</li>
              <li><strong>Legal requirements:</strong> When required by law, court order, or governmental authority</li>
              <li><strong>Business transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
              <li><strong>With your consent:</strong> In any other circumstances with your explicit consent</li>
            </ul>
          </Section>

          <Section title="7. Data Retention">
            <p>
              We retain your personal information for as long as your account is active or as needed to provide
              the Service. If you delete your account, we will delete or anonymise your personal data within 30
              days, except where retention is required by law.
            </p>
          </Section>

          <Section title="8. Data Security">
            <p>
              We implement industry-standard security measures to protect your information, including encryption
              in transit (TLS) and at rest. However, no method of transmission over the internet is 100% secure,
              and we cannot guarantee absolute security.
            </p>
          </Section>

          <Section title="9. Your Rights">
            <p>Depending on your location, you may have the right to:</p>
            <ul>
              <li>Access the personal information we hold about you</li>
              <li>Correct inaccurate or incomplete information</li>
              <li>Request deletion of your personal information</li>
              <li>Object to or restrict processing of your information</li>
              <li>Data portability — receive your data in a machine-readable format</li>
              <li>Withdraw consent at any time</li>
            </ul>
            <p>
              To exercise these rights, please contact us at{" "}
              <a href="mailto:hello@slateup.ai" className="text-[#118AB2] hover:underline">hello@slateup.ai</a>.
            </p>
          </Section>

          <Section title="10. Children's Privacy">
            <p>
              The Service is not directed to children under 13. We do not knowingly collect personal information
              from children under 13. If you believe we have inadvertently collected such information, please
              contact us immediately and we will take steps to delete it.
            </p>
          </Section>

          <Section title="11. Third-Party Links">
            <p>
              The Service may contain links to third-party websites. We are not responsible for the privacy
              practices of those websites and encourage you to review their privacy policies.
            </p>
          </Section>

          <Section title="12. Changes to This Policy">
            <p>
              We may update this Privacy Policy from time to time. We will notify you of material changes by
              posting the new policy on this page and updating the "Last updated" date. We encourage you to
              review this policy periodically.
            </p>
          </Section>

          <Section title="13. Contact Us">
            <p>
              If you have questions or concerns about this Privacy Policy, please contact us:
            </p>
            <ul>
              <li>Email: <a href="mailto:hello@slateup.ai" className="text-[#118AB2] hover:underline">hello@slateup.ai</a></li>
              <li>Contact form: <Link to="/contact" className="text-[#118AB2] hover:underline">slateup.ai/contact</Link></li>
            </ul>
          </Section>
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

function Section({ title, children }) {
  return (
    <div>
      <h2 className="font-heading text-2xl font-bold text-[#073B4C] mb-3">{title}</h2>
      <div className="font-body text-[#495057] leading-relaxed space-y-3">
        {children}
      </div>
    </div>
  );
}
