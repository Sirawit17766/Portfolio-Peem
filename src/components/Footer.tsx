import type { CSSProperties } from "react";

export default function Footer() {
  return (
    <footer
      className="animate-fade-up absolute z-20 flex items-center justify-center rounded-[12px] border"
      style={
        {
          left: 19,
          top: 944,
          width: 205,
          height: 60,
          background: "#0f172a",
          borderColor: "rgba(124,58,237,0.25)",
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
