import type { CSSProperties } from "react";
import {
  imgEllipseAWS,
  imgEllipseCSS,
  imgEllipseDocker,
  imgEllipseJS,
  imgEllipseNode,
  imgEllipsePostgres,
  imgEllipseReact,
  imgEllipseTS,
  imgEllipseVite,
  imgJava,
} from "../assets/images";

type Tech = {
  label: string;
  mark: string;
  icon: string;
  color: string;
  bg: string;
  border: string;
  col: number;
  row: number;
  imageMark?: string;
};

const COL_X = [887, 1065, 1243];
const ROW_Y = [808, 878, 948];

const techs: Tech[] = [
  {
    label: "React",
    mark: "R",
    icon: imgEllipseReact,
    color: "#61dafb",
    bg: "#0f3d4a",
    border: "rgba(97,218,251,0.4)",
    col: 0,
    row: 0,
  },
  {
    label: "TypeScript",
    mark: "TS",
    icon: imgEllipseTS,
    color: "#3178c6",
    bg: "#0d2137",
    border: "rgba(49,120,198,0.4)",
    col: 1,
    row: 0,
  },
  {
    label: "Vite",
    mark: "V",
    icon: imgEllipseVite,
    color: "#a259ff",
    bg: "#2a1446",
    border: "rgba(162,89,255,0.4)",
    col: 2,
    row: 0,
  },
  {
    label: "JavaScript",
    mark: "",
    icon: imgEllipseJS,
    imageMark: imgJava,
    color: "#06b6d4",
    bg: "#083344",
    border: "rgba(6,182,212,0.4)",
    col: 0,
    row: 1,
  },
  {
    label: "CSS",
    mark: "CSS",
    icon: imgEllipseCSS,
    color: "#5a29e4",
    bg: "#1a1040",
    border: "rgba(90,41,228,0.4)",
    col: 1,
    row: 1,
  },
  {
    label: "Node.js",
    mark: "N",
    icon: imgEllipseNode,
    color: "#68a063",
    bg: "#1a2e1a",
    border: "rgba(104,160,99,0.4)",
    col: 2,
    row: 1,
  },
  {
    label: "PostgreSQL",
    mark: "DB",
    icon: imgEllipsePostgres,
    color: "#336791",
    bg: "#0d1f2d",
    border: "rgba(51,103,145,0.4)",
    col: 0,
    row: 2,
  },
  {
    label: "Docker",
    mark: "DO",
    icon: imgEllipseDocker,
    color: "#2496ed",
    bg: "#0d2640",
    border: "rgba(36,150,237,0.4)",
    col: 1,
    row: 2,
  },
  {
    label: "AWS",
    mark: "AWS",
    icon: imgEllipseAWS,
    color: "#ff9900",
    bg: "#3d2600",
    border: "rgba(255,153,0,0.4)",
    col: 2,
    row: 2,
  },
];

function TechItem({ tech, index }: { tech: Tech; index: number }) {
  const x = COL_X[tech.col];
  const y = ROW_Y[tech.row];

  return (
    <div
      className="tech-item absolute z-20 flex h-[56px] w-[160px] items-center rounded-[12px] border px-[10px]"
      style={
        {
          left: x,
          top: y,
          background: tech.bg,
          borderColor: tech.border,
          "--delay": `${760 + index * 65}ms`,
        } as CSSProperties
      }
    >
      <span className="relative mr-[18px] grid h-[32px] w-[32px] place-items-center overflow-hidden rounded-full">
        <img alt="" className="absolute inset-0 h-full w-full max-w-none" src={tech.icon} />
        {tech.imageMark ? (
          <img alt="" className="relative h-[16px] w-[16px]" src={tech.imageMark} />
        ) : (
          <span className="relative font-inter text-[10px] font-bold" style={{ color: tech.color }}>
            {tech.mark}
          </span>
        )}
      </span>

      <span className="font-inter text-[14px] font-semibold leading-none" style={{ color: tech.color }}>
        {tech.label}
      </span>
    </div>
  );
}

export default function TechStack() {
  return (
    <section id="tech-stack" className="contents">
      <h2
        className="animate-fade-up absolute z-20 whitespace-nowrap font-inter text-[32px] font-bold text-white"
        style={{ left: 887, top: 738, "--delay": "620ms" } as CSSProperties}
      >
        Tech Stack
      </h2>
      <p
        className="animate-fade-up absolute z-20 whitespace-nowrap font-inter text-[14px] font-normal text-white"
        style={{ left: 887, top: 780, "--delay": "700ms" } as CSSProperties}
      >
        Technologies I work with
      </p>

      {techs.map((tech, index) => (
        <TechItem key={tech.label} tech={tech} index={index} />
      ))}
    </section>
  );
}
