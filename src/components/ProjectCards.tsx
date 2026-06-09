import type { CSSProperties } from "react";
import { imgImage2, imgImage3, imgImage4, imgImage5 } from "../assets/images";

type ProjectCardProps = {
  label: string;
  image: string;
  tag: string;
  left: number;
  top: number;
  summary: string;
  year: string;
  variant: "featured" | "compact";
  imageOffsetTop?: number;
  imageOffsetLeft?: number;
  delay: number;
};

const projects: Omit<ProjectCardProps, "delay">[] = [
  {
    label: "Figma Design Netflix",
    tag: "UI Design",
    summary: "Interface study with dense visual systems",
    year: "2024",
    image: imgImage2,
    left: 920,
    top: 184,
    variant: "featured",
  },
  {
    label: "GEARX",
    tag: "Web App",
    summary: "Landing and commerce experience",
    year: "2024",
    image: imgImage3,
    left: 920,
    top: 392,
    variant: "compact",
  },
  {
    label: "Mobile App",
    tag: "Application",
    summary: "Mobile-first product flow",
    year: "2023",
    image: imgImage4,
    left: 920,
    top: 478,
    variant: "compact",
  },
  {
    label: "GROUP WEB-ECOMMERCE",
    tag: "E-Commerce",
    summary: "Catalog and storefront interface",
    year: "2023",
    image: imgImage5,
    left: 920,
    top: 564,
    variant: "compact",
  },
];

function ProjectCard({
  label,
  image,
  tag,
  left,
  top,
  summary,
  year,
  variant,
  delay,
}: ProjectCardProps) {
  return (
    <a
      className={`project-card project-card--${variant} absolute z-20 block overflow-hidden rounded-[12px]`}
      href="#projects"
      style={{ left, top, "--delay": `${delay}ms` } as CSSProperties}
      aria-label={label}
    >
      <span className="project-card-glow" />
      <div
        className="project-card-media absolute overflow-hidden rounded-[9px] shadow-[0px_10px_28px_rgba(0,0,0,0.38)]"
      >
        <img
          alt={label}
          className="project-image absolute inset-0 h-full w-full max-w-none object-cover"
          decoding="async"
          height={112}
          loading="lazy"
          src={image}
          width={190}
        />
        <span className="project-image-shade" />
      </div>

      <span className="project-tag absolute inline-flex rounded-full bg-[rgba(97,218,251,0.14)] px-[9px] py-[4px] font-inter text-[10px] font-semibold uppercase tracking-[0.08em] text-[#61dafb]">
        {tag}
      </span>
      <span className="project-year absolute font-mono text-[11px] font-bold text-[#475569]">
        {year}
      </span>
      <span className="project-title absolute block font-inter font-bold leading-tight text-white">
        {label}
      </span>
      <span className="project-summary absolute block font-inter font-medium leading-snug text-[#94a3b8]">
        {summary}
      </span>
      <span className="project-arrow" aria-hidden="true" />
    </a>
  );
}

export default function ProjectCards() {
  return (
    <section id="projects" className="contents">
      <div className="projects-panel absolute z-[8]" aria-hidden="true" />
      <div
        className="animate-fade-up absolute z-20"
        style={{ left: 920, top: 112, "--delay": "300ms" } as CSSProperties}
      >
        <p className="section-eyebrow">Selected work</p>
        <h2 className="section-heading">Projects</h2>
      </div>
      {projects.map((project, index) => (
        <ProjectCard key={project.label} {...project} delay={440 + index * 120} />
      ))}
    </section>
  );
}
