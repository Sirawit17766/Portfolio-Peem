import type { CSSProperties } from "react";
import { imgImage2, imgImage3, imgImage4, imgImage5 } from "../assets/images";

type ProjectCardProps = {
  label: string;
  image: string;
  tag: string;
  left: number;
  top: number;
  imageOffsetTop?: number;
  imageOffsetLeft?: number;
  delay: number;
};

const projects: Omit<ProjectCardProps, "delay">[] = [
  { label: "Figma Design Netflix", tag: "UI Design", image: imgImage2, left: 796, top: 177, imageOffsetTop: 18 },
  { label: "GEARX", tag: "Web App", image: imgImage3, left: 1007, top: 177, imageOffsetTop: 18 },
  { label: "Mobile App", tag: "Application", image: imgImage4, left: 1220, top: 177, imageOffsetTop: 18, imageOffsetLeft: 11 },
  { label: "GROUP WEB-ECOMMERCE", tag: "E-Commerce", image: imgImage5, left: 1007, top: 402, imageOffsetTop: 18 },
];

function ProjectCard({
  label,
  image,
  tag,
  left,
  top,
  imageOffsetTop = 18,
  imageOffsetLeft = 12,
  delay,
}: ProjectCardProps) {
  return (
    <a
      className="project-card absolute z-20 block h-[212px] w-[197px] overflow-hidden rounded-[12px]"
      href="#projects"
      style={{ left, top, "--delay": `${delay}ms` } as CSSProperties}
      aria-label={label}
    >
      <span className="project-card-glow" />
      <div
        className="absolute overflow-hidden rounded-[7px] shadow-[0px_8px_24px_rgba(0,0,0,0.36)]"
        style={{ left: imageOffsetLeft, top: imageOffsetTop, width: 175, height: 112 }}
      >
        <img
          alt={label}
          className="project-image absolute inset-0 h-full w-full max-w-none object-cover"
          decoding="async"
          height={112}
          loading="lazy"
          src={image}
          width={175}
        />
        <span className="project-image-shade" />
      </div>

      <span className="absolute bottom-[54px] left-[14px] inline-flex rounded-full bg-[rgba(97,218,251,0.12)] px-[9px] py-[4px] font-inter text-[10px] font-semibold uppercase tracking-[0.08em] text-[#61dafb]">
        {tag}
      </span>
      <span className="absolute bottom-[25px] left-[14px] right-[30px] block font-inter text-[14px] font-bold leading-tight text-white">
        {label}
      </span>
      <span className="project-arrow" aria-hidden="true" />
    </a>
  );
}

export default function ProjectCards() {
  return (
    <section id="projects" className="contents">
      {projects.map((project, index) => (
        <ProjectCard key={project.label} {...project} delay={440 + index * 120} />
      ))}
    </section>
  );
}
