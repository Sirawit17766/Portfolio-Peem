import {
  imgEllipseReact,
  imgEllipseTS,
  imgEllipseVite,
  imgEllipseJS,
  imgEllipseCSS,
  imgEllipseNode,
  imgEllipsePostgres,
  imgEllipseDocker,
  imgEllipseAWS,
  imgJava,
} from "../assets/images";

interface Tech {
  label: string;
  icon?: string;
  emoji?: string;
  color: string;
  bg: string;
  border: string;
  col: number; // 0 = left(887), 1 = mid(1065), 2 = right(1243)
  row: number; // 0 = top(808), 1 = mid(878), 2 = bot(948)
  iconAsJava?: boolean;
}

const COL_X = [887, 1065, 1243];
const ROW_Y = [808, 878, 948];

const techs: Tech[] = [
  {
    label: "React",        icon: imgEllipseReact,  emoji: "⚛",
    color: "#61dafb", bg: "#0f3d4a", border: "rgba(97,218,251,0.4)",  col: 0, row: 0,
  },
  {
    label: "TypeScript",   icon: imgEllipseTS,     emoji: "TS",
    color: "#3178c6", bg: "#0d2137", border: "rgba(49,120,198,0.4)",  col: 1, row: 0,
  },
  {
    label: "Vite",         icon: imgEllipseVite,   emoji: "⚡",
    color: "#a259ff", bg: "#2a1446", border: "rgba(162,89,255,0.4)",  col: 2, row: 0,
  },
  {
    label: "JavaScript",   icon: imgEllipseJS,
    color: "#06b6d4", bg: "#083344", border: "rgba(6,182,212,0.4)",   col: 0, row: 1, iconAsJava: true,
  },
  {
    label: "CSS",          icon: imgEllipseCSS,
    color: "#5a29e4", bg: "#1a1040", border: "rgba(90,41,228,0.4)",   col: 1, row: 1, iconAsJava: true,
  },
  {
    label: "Node.js",      icon: imgEllipseNode,   emoji: "🟢",
    color: "#68a063", bg: "#1a2e1a", border: "rgba(104,160,99,0.4)",  col: 2, row: 1,
  },
  {
    label: "PostgreSQL",   icon: imgEllipsePostgres, emoji: "🐘",
    color: "#336791", bg: "#0d1f2d", border: "rgba(51,103,145,0.4)",  col: 0, row: 2,
  },
  {
    label: "Docker",       icon: imgEllipseDocker,  emoji: "🐳",
    color: "#2496ed", bg: "#0d2640", border: "rgba(36,150,237,0.4)",  col: 1, row: 2,
  },
  {
    label: "AWS",          icon: imgEllipseAWS,     emoji: "☁",
    color: "#ff9900", bg: "#3d2600", border: "rgba(255,153,0,0.4)",   col: 2, row: 2,
  },
];

export default function TechStack() {
  return (
    <>
      {/* Title */}
      <p
        className="absolute font-bold text-white text-[32px] font-inter whitespace-nowrap"
        style={{ left: 887, top: 738 }}
      >
        Tech Stack
      </p>
      <p
        className="absolute font-normal text-white text-[14px] font-inter whitespace-nowrap"
        style={{ left: 887, top: 780 }}
      >
        Technologies I work with
      </p>

      {/* Tech cards */}
      {techs.map((t) => {
        const x = COL_X[t.col];
        const y = ROW_Y[t.row];
        const isJava = t.iconAsJava && t.col === 0 && t.row === 1; // JavaScript row uses Java icon

        return (
          <div key={t.label}>
            {/* Card bg */}
            <div
              className="absolute rounded-[12px]"
              style={{
                left: x,
                top: y,
                width: 160,
                height: 56,
                background: t.bg,
                border: `1px solid ${t.border}`,
              }}
            />

            {/* Icon circle */}
            <div
              className="absolute"
              style={{ left: x + 10, top: y + 12, width: 32, height: 32 }}
            >
              <img
                alt={t.label}
                className="absolute inset-0 w-full h-full max-w-none block"
                src={t.icon}
              />
            </div>

            {/* Java override icon for JavaScript */}
            {isJava && (
              <div
                className="absolute overflow-hidden"
                style={{ left: x + 18, top: y + 15, width: 16, height: 16 }}
              >
                <img
                  alt="java"
                  className="absolute inset-0 w-full h-full max-w-none block"
                  src={imgJava}
                />
              </div>
            )}

            {/* Emoji/text prefix */}
            {t.emoji && (
              <span
                className="absolute font-normal text-[14px] font-inter whitespace-nowrap"
                style={{ left: x + 18, top: y + 21, color: t.color }}
              >
                {t.emoji}
              </span>
            )}

            {/* Label */}
            <span
              className="absolute font-semibold text-[14px] font-inter whitespace-nowrap"
              style={{ left: x + 50, top: y + 20, color: t.color }}
            >
              {t.label}
            </span>
          </div>
        );
      })}
    </>
  );
}
