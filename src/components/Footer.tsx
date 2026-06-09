import type { CSSProperties } from "react";

export default function Footer() {
  return (
    <footer
      className="footer-plaque animate-fade-up absolute z-20 flex items-center justify-center rounded-[12px] border"
      style={
        {
          left: 72,
          top: 928,
          width: 258,
          height: 58,
          "--delay": "980ms",
        } as CSSProperties
      }
    >
      <span className="font-inter text-[12px] font-normal text-[#94a3b8]">
        (c) 2025 Sirawit Tathip
      </span>
    </footer>
  );
}
