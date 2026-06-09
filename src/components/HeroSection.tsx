import type { CSSProperties } from "react";
import { imgImage1, imgPolygon } from "../assets/images";

const stats = [
  { label: "Projects", value: "04" },
  { label: "Stack", value: "09" },
  { label: "Focus", value: "FE" },
];

export default function HeroSection() {
  return (
    <section id="about" className="contents">
      <div className="hero-glass-panel absolute z-[5]" aria-hidden="true" />
      <div className="profile-halo absolute z-[6]" aria-hidden="true" />

      <div
        className="animate-fade-up absolute z-10"
        style={{ left: 82, top: 126, "--delay": "120ms" } as CSSProperties}
      >
        <div className="hero-badge">
          <span className="mr-[10px] block h-[7px] w-[7px] rotate-45 bg-[#a78bfa]" />
          <span className="font-inter text-[13px] font-normal text-[#a78bfa]">
            Front-End Developer
          </span>
        </div>
      </div>

      <h1 className="contents">
        <span
          className="hero-name hero-name-primary animate-title absolute z-10 whitespace-nowrap font-inter text-[88px] font-bold leading-none text-white"
          style={{ left: 80, top: 174, "--delay": "220ms" } as CSSProperties}
        >
          Sirawit
        </span>
        <span
          className="hero-name hero-name-accent animate-title absolute z-10 whitespace-nowrap font-inter text-[88px] font-bold leading-none text-[#a78bfa]"
          style={{ left: 80, top: 264, "--delay": "340ms" } as CSSProperties}
        >
          Tathip
        </span>
      </h1>
      <span className="hero-pulse-dot absolute z-20" aria-hidden="true" />

      <div
        className="animate-line absolute z-10 bg-[#7c3aed]"
        style={{ left: 82, top: 372, width: 74, height: 3 }}
      />

      <p
        className="animate-fade-up absolute z-10 whitespace-nowrap font-inter text-[16px] font-normal text-[#94a3b8]"
        style={{ left: 82, top: 396, "--delay": "520ms" } as CSSProperties}
      >
        Kasetsart University Sriracha Campus
      </p>
      <p
        className="animate-fade-up absolute z-10 whitespace-nowrap font-inter text-[20px] font-semibold text-[#e2e8f0]"
        style={{ left: 82, top: 424, "--delay": "600ms" } as CSSProperties}
      >
        Computer Science
      </p>
      <p
        className="animate-fade-up absolute z-10 w-[315px] font-inter text-[13px] font-medium leading-[1.65] text-[#64748b]"
        style={{ left: 82, top: 458, "--delay": "640ms" } as CSSProperties}
      >
        Designing responsive interfaces with clean motion, accessible structure, and production-ready frontend systems.
      </p>

      <div
        className="animate-fade-up absolute z-20 grid grid-cols-3 gap-[10px]"
        style={{ left: 82, top: 548, "--delay": "680ms" } as CSSProperties}
      >
        {stats.map((stat) => (
          <div className="hero-stat" key={stat.label}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </div>

      <div
        className="hero-actions animate-fade-up absolute z-20 flex items-center gap-[12px]"
        style={{ left: 82, top: 634, "--delay": "760ms" } as CSSProperties}
      >
        <a href="#projects">View work</a>
        <a href="#deploy-cloudflare-pages">Read blog</a>
      </div>

      <div
        className="animate-marker absolute z-10"
        style={{ left: 82, top: 720, width: 20, height: 20 }}
        aria-hidden="true"
      >
        <div className="absolute" style={{ bottom: "25%", left: "6.7%", right: "6.7%", top: 0 }}>
          <img alt="" className="block h-full w-full max-w-none" src={imgPolygon} />
        </div>
      </div>

      <div
        className="animate-profile absolute z-10"
        style={{
          left: 430,
          top: 158,
          width: 520,
          height: 838,
        }}
      >
        <img
          alt="Sirawit Tathip"
          className="absolute inset-0 h-full w-full max-w-none object-cover"
          decoding="async"
          fetchPriority="high"
          height={837}
          loading="eager"
          src={imgImage1}
          width={662}
        />
      </div>
    </section>
  );
}
