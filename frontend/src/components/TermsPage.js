import { Link } from "react-router-dom";

export default function TermsPage() {
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
        <h1 className="font-heading text-5xl font-bold text-[#073B4C] mb-3">Terms &amp; Conditions</h1>
        <p className="font-body text-[#495057] mb-10">Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>

        <div className="prose prose-lg max-w-none space-y-8">

          <Section title="1. Acceptance of Terms">
            <p>
              By accessing or using the Slate Up platform ("Service"), available at slateup.ai and app.slateup.ai,
              you agree to be bound by these Terms and Conditions ("Terms"). If you do not agree to these Terms,
              please do not use the Service.
            </p>
            <p>
              These Terms apply to all visitors, users, and others who access or use the Service.
            </p>
          </Section>

          <Section title="2. Description of Service">
            <p>
              Slate Up is an AI-powered interactive learning platform that generates personalised educational courses,
              including slides, narration, and AI classmates, on any topic. The Service is provided by Slate Up
              ("we", "us", or "our").
            </p>
          </Section>

          <Section title="3. User Accounts">
            <p>
              When you create an account with us, you must provide accurate, complete, and current information.
              You are responsible for safeguarding your account credentials and for any activity that occurs under
              your account. You must notify us immediately of any unauthorised use of your account.
            </p>
            <p>
              You must be at least 13 years of age to use the Service. If you are under 18, you represent that
              you have obtained parental or guardian consent.
            </p>
          </Section>

          <Section title="4. Acceptable Use">
            <p>You agree not to use the Service to:</p>
            <ul>
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe upon the rights of others, including intellectual property rights</li>
              <li>Transmit any harmful, offensive, or unlawful content</li>
              <li>Attempt to gain unauthorised access to the Service or its systems</li>
              <li>Engage in any activity that disrupts or interferes with the Service</li>
              <li>Reverse engineer, decompile, or disassemble any part of the Service</li>
              <li>Use automated tools to access the Service in a manner that exceeds reasonable use</li>
            </ul>
          </Section>

          <Section title="5. Subscription and Payments">
            <p>
              Slate Up offers both free and paid subscription plans. Paid subscriptions are billed in advance on a
              monthly or annual basis. You authorise us to charge your payment method for all fees associated with
              your chosen plan.
            </p>
            <p>
              Classroom credits are allocated per plan and reset on your billing date. Unused credits do not carry
              over to the next billing period. Top-up credits, once purchased, never expire.
            </p>
            <p>
              We offer a 7-day free trial for paid plans. You will be notified 2 days before the trial ends.
              If you cancel before the trial ends, you will not be charged.
            </p>
          </Section>

          <Section title="6. Cancellation and Refunds">
            <p>
              You may cancel your subscription at any time from your account settings. Cancellation takes effect
              at the end of your current billing period. We do not offer refunds for partial billing periods.
            </p>
            <p>
              We reserve the right to suspend or terminate accounts that violate these Terms.
            </p>
          </Section>

          <Section title="7. Intellectual Property">
            <p>
              The Service and its original content, features, and functionality are owned by Slate Up and are
              protected by copyright, trademark, and other intellectual property laws.
            </p>
            <p>
              Content you generate using the Service remains yours. By using the Service, you grant us a limited,
              non-exclusive licence to process your content solely for the purpose of providing the Service.
            </p>
          </Section>

          <Section title="8. AI-Generated Content">
            <p>
              The Service uses artificial intelligence to generate educational content. While we strive for
              accuracy, AI-generated content may contain errors or inaccuracies. Slate Up does not guarantee
              the accuracy, completeness, or suitability of AI-generated content for any purpose.
            </p>
            <p>
              You are responsible for verifying the accuracy of any information obtained through the Service
              before relying on it for academic or professional purposes.
            </p>
          </Section>

          <Section title="9. Privacy">
            <p>
              Your use of the Service is also governed by our <Link to="/privacy" className="text-[#118AB2] hover:underline">Privacy Policy</Link>,
              which is incorporated into these Terms by reference.
            </p>
          </Section>

          <Section title="10. Disclaimers">
            <p>
              The Service is provided on an "AS IS" and "AS AVAILABLE" basis without warranties of any kind,
              either express or implied. We do not warrant that the Service will be uninterrupted, error-free,
              or free of viruses or other harmful components.
            </p>
          </Section>

          <Section title="11. Limitation of Liability">
            <p>
              To the maximum extent permitted by law, Slate Up shall not be liable for any indirect, incidental,
              special, consequential, or punitive damages arising out of or related to your use of the Service,
              even if we have been advised of the possibility of such damages.
            </p>
          </Section>

          <Section title="12. Changes to Terms">
            <p>
              We reserve the right to modify these Terms at any time. We will notify you of material changes by
              posting the new Terms on this page and updating the "Last updated" date. Your continued use of the
              Service after such changes constitutes acceptance of the new Terms.
            </p>
          </Section>

          <Section title="13. Governing Law">
            <p>
              These Terms shall be governed by and construed in accordance with the laws of India, without regard
              to its conflict of law provisions. Any disputes arising under these Terms shall be subject to the
              exclusive jurisdiction of the courts located in India.
            </p>
          </Section>

          <Section title="14. Contact Us">
            <p>
              If you have questions about these Terms, please contact us at{" "}
              <a href="mailto:hello@slateup.ai" className="text-[#118AB2] hover:underline">hello@slateup.ai</a>{" "}
              or visit our <Link to="/contact" className="text-[#118AB2] hover:underline">contact page</Link>.
            </p>
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
