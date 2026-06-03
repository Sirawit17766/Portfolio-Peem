import type { CSSProperties } from "react";
import { imgImage1, imgPolygon } from "../assets/images";

export default function HeroSection() {
  return (
    <section id="about" className="contents">
      <div
        className="animate-fade-up absolute z-10"
        style={{ left: 89, top: 121, "--delay": "120ms" } as CSSProperties}
      >
        <div
          className="flex h-[32px] w-[220px] items-center rounded-[8px] border px-[15px]"
          style={{
            background: "rgba(124,58,237,0.15)",
            borderColor: "rgba(124,58,237,0.5)",
          }}
        >
          <span className="mr-[10px] block h-[7px] w-[7px] rotate-45 bg-[#a78bfa]" />
          <span className="font-inter text-[13px] font-normal text-[#a78bfa]">
            Front-End Developer
          </span>
        </div>
      </div>

      <h1 className="contents">
        <span
          className="animate-title absolute z-10 whitespace-nowrap font-inter text-[88px] font-bold leading-none text-white"
          style={{ left: 87, top: 166, "--delay": "220ms" } as CSSProperties}
        >
          Sirawit
        </span>
        <span
          className="animate-title absolute z-10 whitespace-nowrap font-inter text-[88px] font-bold leading-none text-[#a78bfa]"
          style={{ left: 87, top: 256, "--delay": "340ms" } as CSSProperties}
        >
          Tathip
        </span>
      </h1>

      <div
        className="animate-line absolute z-10 bg-[#7c3aed]"
        style={{ left: 89, top: 363, width: 60, height: 3 }}
      />

      <p
        className="animate-fade-up absolute z-10 whitespace-nowrap font-inter text-[16px] font-normal text-[#94a3b8]"
        style={{ left: 89, top: 383, "--delay": "520ms" } as CSSProperties}
      >
        Kasetsart University Sriracha Campus
      </p>
      <p
        className="animate-fade-up absolute z-10 whitespace-nowrap font-inter text-[20px] font-semibold text-[#e2e8f0]"
        style={{ left: 89, top: 409, "--delay": "600ms" } as CSSProperties}
      >
        Computer Science
      </p>

      <div
        className="animate-marker absolute z-10"
        style={{ left: 82, top: 470, width: 20, height: 20 }}
        aria-hidden="true"
      >
        <div className="absolute" style={{ bottom: "25%", left: "6.7%", right: "6.7%", top: 0 }}>
          <img alt="" className="block h-full w-full max-w-none" src={imgPolygon} />
        </div>
      </div>

      <div
        className="animate-profile absolute z-10"
        style={{
          left: 243,
          top: 187,
          width: 662,
          height: 837,
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
