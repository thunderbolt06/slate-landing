import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "@/components/LandingPage";
import ThankYou from "@/components/ThankYou";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/thank-you" element={<ThankYou />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
