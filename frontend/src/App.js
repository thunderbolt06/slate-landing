import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "@/components/LandingPage";
import ThankYou from "@/components/ThankYou";
import BlogsPage from "@/components/BlogsPage";
import BlogPostPage from "@/components/BlogPostPage";
import SiteBottomNav from "@/components/SiteBottomNav";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/characters" element={<LandingPage />} />
        <Route path="/how-it-works" element={<LandingPage />} />
        <Route path="/features" element={<LandingPage />} />
        <Route path="/waitlist" element={<LandingPage />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/blogs/:slug" element={<BlogPostPage />} />
      </Routes>
      <SiteBottomNav />
    </BrowserRouter>
  );
}

export default App;
