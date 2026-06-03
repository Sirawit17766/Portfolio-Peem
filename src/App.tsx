import Background from "./components/Background";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import ProjectCards from "./components/ProjectCards";
import TechStack from "./components/TechStack";
import Footer from "./components/Footer";
import { imgVector } from "./assets/images";

export default function App() {
  return (
    // Outer wrapper — scales the 1440px canvas to fit the viewport
    <div className="min-h-screen bg-black flex items-start justify-start overflow-x-auto">
      <div
        className="relative"
        style={{ width: 1440, height: 1024, minWidth: 1440 }}
      >
        {/* Background (grid + glow) */}
        <Background />

        {/* Navbar */}
        <Navbar />

        {/* Hero / intro section */}
        <HeroSection />

        {/* Project cards (right side) */}
        <ProjectCards />

        {/* Tech Stack (bottom-right) */}
        <TechStack />

        {/* Decorative vector */}
        <div
          className="absolute"
          style={{
            top: 1024 * 0.876,
            right: 1440 * 0.2361,
            width: 1440 * (1 - 0.7514 - 0.2361),
            height: 1024 * (1 - 0.876 - 0.1052),
          }}
        >
          <img
            alt=""
            className="absolute inset-0 w-full h-full max-w-none block"
            src={imgVector}
          />
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
