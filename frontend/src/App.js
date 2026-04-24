import "@/App.css";
import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "@/components/LandingPage";
import SiteBottomNav from "@/components/SiteBottomNav";

const ThankYou = lazy(() => import("@/components/ThankYou"));
const BlogsPage = lazy(() => import("@/components/BlogsPage"));
const BlogPostPage = lazy(() => import("@/components/BlogPostPage"));
const NcertClass10MathPage = lazy(() => import("@/components/NcertClass10MathPage"));
const NcertClass10SciencePage = lazy(() => import("@/components/NcertClass10SciencePage"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/demo" element={<LandingPage />} />
          <Route path="/characters" element={<LandingPage />} />
          <Route path="/how-it-works" element={<LandingPage />} />
          <Route path="/features" element={<LandingPage />} />
          <Route path="/waitlist" element={<LandingPage />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/blogs/:slug" element={<BlogPostPage />} />
          <Route path="/learn/ncert-class-10-mathematics" element={<NcertClass10MathPage />} />
          <Route path="/learn/ncert-class-10-science" element={<NcertClass10SciencePage />} />
        </Routes>
      </Suspense>
      <SiteBottomNav />
    </BrowserRouter>
  );
}

export default App;
