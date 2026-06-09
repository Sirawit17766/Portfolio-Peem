import { useEffect, useRef, type CSSProperties } from "react";
import {
  imgEllipse1,
  imgEllipse2,
  imgEllipse3,
  imgEllipse4,
} from "../assets/images";

const COLUMN_LEFTS = [
  -15, 90, 195, 300, 405, 510, 615, 720, 825, 930, 1035, 1140, 1245, 1350,
  1455, 1560, 1665, 1770, 1875, 1980, 2085, 2190, 2295, 2400,
];

const glows = [
  { image: imgEllipse1, width: 746, height: 743, left: -108, top: 480, inset: "-27.28% -27.17%" },
  { image: imgEllipse2, width: 746, height: 743, left: 394, top: 652, inset: "-27.28% -27.17%" },
  { image: imgEllipse3, width: 445, height: 463, left: 1127, top: 561, inset: "-43.78% -45.55%" },
  { image: imgEllipse4, width: 364, height: 344, left: 1169, top: 266, inset: "-58.92% -55.69%" },
];

export default function Background() {
  return (
    <div className="absolute inset-0 h-[1024px] w-full overflow-hidden bg-black" aria-hidden="true">
      <ParticleField />
      <div className="blue-backlight" />
      <div className="blue-backlight-core" />
      <div className="blue-backlight-rim" />

      {glows.map((glow) => (
        <div
          key={`${glow.left}-${glow.top}`}
          className="glow-orb absolute"
          style={{ width: glow.width, height: glow.height, left: glow.left, top: glow.top }}
        >
          <div className="absolute" style={{ inset: glow.inset }}>
            <img alt="" className="block h-full w-full max-w-none" src={glow.image} />
          </div>
        </div>
      ))}

      {COLUMN_LEFTS.map((left, index) => (
        <div
          key={left}
          className="grid-column absolute"
          style={
            {
              width: 105,
              height: 1074,
              left,
              top: index === 10 ? -38 : -13,
              "--column-index": index,
            } as CSSProperties
          }
        >
          <span className="grid-column-light" />
        </div>
      ))}
    </div>
  );
}

function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return undefined;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return undefined;
    }

    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;
    let animationFrame = 0;

    const particles = Array.from({ length: 62 }, () => ({
      alpha: Math.random() * 0.32 + 0.12,
      radius: Math.random() * 1.4 + 0.45,
      velocityX: (Math.random() - 0.5) * 0.28,
      velocityY: (Math.random() - 0.5) * 0.28,
      x: Math.random() * width,
      y: Math.random() * height,
    }));

    const resize = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width;
      canvas.height = height;
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);

      particles.forEach((particle, index) => {
        particle.x += particle.velocityX;
        particle.y += particle.velocityY;

        if (particle.x < 0) particle.x = width;
        if (particle.x > width) particle.x = 0;
        if (particle.y < 0) particle.y = height;
        if (particle.y > height) particle.y = 0;

        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fillStyle = `rgba(167, 139, 250, ${particle.alpha})`;
        context.fill();

        particles.slice(index + 1).forEach((nextParticle) => {
          const distance = Math.hypot(particle.x - nextParticle.x, particle.y - nextParticle.y);

          if (distance < 92) {
            context.beginPath();
            context.moveTo(particle.x, particle.y);
            context.lineTo(nextParticle.x, nextParticle.y);
            context.strokeStyle = `rgba(97, 218, 251, ${0.1 * (1 - distance / 92)})`;
            context.lineWidth = 0.5;
            context.stroke();
          }
        });
      });

      animationFrame = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="particle-field" />;
}
