import { imgImage2, imgImage3, imgImage4, imgImage5 } from "../assets/images";

interface ProjectCard {
  label: string;
  image: string;
  left: number;
  top: number;
  imgTop: number;
  imgLeft: number;
}

const projects: ProjectCard[] = [
  { label: "Figma Design Netflix", image: imgImage2, left: 796, top: 177, imgTop: 198, imgLeft: 808 },
  { label: "GEARX",                image: imgImage3, left: 1007, top: 177, imgTop: 200, imgLeft: 1019 },
  { label: "Moblie App",           image: imgImage4, left: 1220, top: 177, imgTop: 200, imgLeft: 1231 },
  { label: "GROUP WEB-ECOMMERCE",  image: imgImage5, left: 1007, top: 402, imgTop: 428, imgLeft: 1019 },
];

export default function ProjectCards() {
  return (
    <>
      {projects.map((p) => (
        <div key={p.label}>
          {/* Card bg */}
          <div
            className="absolute rounded-[12px]"
            style={{
              left: p.left,
              top: p.top,
              width: 197,
              height: 212,
              background: "#222323",
              border: "1px solid #61dafb",
            }}
          />
          {/* Project image */}
          <div
            className="absolute rounded-[6px] overflow-hidden"
            style={{
              left: p.imgLeft,
              top: p.imgTop,
              width: 175,
              height: 112,
              border: "1px solid rgba(58,207,237,0.5)",
              boxShadow: "0px 4px 20.9px 3px rgba(0,0,0,0.25)",
            }}
          >
            <img
              alt={p.label}
              className="absolute inset-0 w-full h-full object-cover pointer-events-none rounded-[6px] max-w-none"
              src={p.image}
            />
          </div>
          {/* Label */}
          <p
            className="absolute font-bold text-white text-[14px] font-inter whitespace-nowrap"
            style={{ left: p.left + 17, top: p.top + 163 }}
          >
            {p.label}
          </p>
        </div>
      ))}
    </>
  );
}
