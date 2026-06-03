import { imgImage1, imgPolygon } from "../assets/images";

export default function HeroSection() {
  return (
    <>
      {/* Badge */}
      <div
        className="absolute z-10"
        style={{ left: 89, top: 121 }}
      >
        <div
          className="flex items-center justify-center rounded-[8px] h-[32px] w-[220px]"
          style={{
            background: "rgba(124,58,237,0.15)",
            border: "1px solid rgba(124,58,237,0.5)",
          }}
        >
          <span
            className="text-[#a78bfa] text-[13px] font-normal font-inter whitespace-pre"
          >
            ✦  Front-End Developer
          </span>
        </div>
      </div>

      {/* Name */}
      <p
        className="absolute font-bold text-white font-inter whitespace-nowrap z-10 leading-none"
        style={{ left: 87, top: 166, fontSize: 88 }}
      >
        Sirawit
      </p>
      <p
        className="absolute font-bold font-inter whitespace-nowrap z-10 leading-none"
        style={{ left: 87, top: 256, fontSize: 88, color: "#a78bfa" }}
      >
        Tathip
      </p>

      {/* Purple line */}
      <div
        className="absolute z-10"
        style={{ left: 89, top: 363, width: 60, height: 3, background: "#7c3aed" }}
      />

      {/* University */}
      <p
        className="absolute font-normal text-[#94a3b8] text-[16px] font-inter whitespace-nowrap z-10"
        style={{ left: 89, top: 383 }}
      >
        Kasetsart University Sriracha Campus
      </p>
      <p
        className="absolute font-semibold text-[#e2e8f0] text-[20px] font-inter whitespace-nowrap z-10"
        style={{ left: 89, top: 409 }}
      >
        Computer Science
      </p>

      {/* Scroll indicator polygon */}
      <div className="absolute z-10" style={{ left: 82, top: 470, width: 20, height: 20 }}>
        <div className="absolute" style={{ bottom: "25%", left: "6.7%", right: "6.7%", top: 0 }}>
          <img alt="scroll" className="block w-full h-full max-w-none" src={imgPolygon} />
        </div>
      </div>

      {/* Profile photo */}
      <div
        className="absolute z-10 rounded-[16px] overflow-hidden"
        style={{
          left: 243,
          top: 187,
          width: 662,
          height: 837,
          boxShadow: "0px 4px 24.1px 0px black",
        }}
      >
        <img
          alt="Sirawit Tathip"
          className="absolute inset-0 w-full h-full object-cover rounded-[16px] max-w-none pointer-events-none"
          src={imgImage1}
        />
      </div>
    </>
  );
}
