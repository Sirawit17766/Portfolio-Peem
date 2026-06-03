import { useEffect, useState, type CSSProperties } from "react";
import Background from "./components/Background";
import ContactPanel from "./components/ContactPanel";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import ProjectCards from "./components/ProjectCards";
import TechStack from "./components/TechStack";
import { imgVector } from "./assets/images";

export default function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [scale, setScale] = useState(() =>
    typeof window === "undefined" ? 1 : Math.min(1, window.innerWidth / 1440),
  );

  useEffect(() => {
    const updateScale = () => setScale(Math.min(1, window.innerWidth / 1440));

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return (
    <main
      className="portfolio-stage"
      style={{ "--portfolio-scale": scale } as CSSProperties}
    >
      <div className="portfolio-frame relative">
        <div className="portfolio-canvas relative overflow-hidden bg-black">
          <Background />
          <Navbar onContactClick={() => setIsContactOpen(true)} />
          <HeroSection />
          <ProjectCards />
          <TechStack />
          <ContactPanel isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />

          <div
            className="absolute animate-fade-up"
            style={
              {
                top: 1024 * 0.876,
                right: 1440 * 0.2361,
                width: 1440 * (1 - 0.7514 - 0.2361),
                height: 1024 * (1 - 0.876 - 0.1052),
                "--delay": "960ms",
              } as CSSProperties
            }
            aria-hidden="true"
          >
            <img
              alt=""
              className="absolute inset-0 block h-full w-full max-w-none"
              src={imgVector}
            />
          </div>

          <Footer />
        </div>
      </div>
    </main>
  );
}
