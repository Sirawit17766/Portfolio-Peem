import type { CSSProperties } from "react";
import {
  imgEllipse1,
  imgEllipse2,
  imgEllipse3,
  imgEllipse4,
} from "../assets/images";

const COLUMN_LEFTS = [-15, 90, 195, 300, 405, 510, 615, 720, 825, 930, 1035, 1140, 1245, 1350];

const glows = [
  { image: imgEllipse1, width: 746, height: 743, left: -108, top: 480, inset: "-27.28% -27.17%" },
  { image: imgEllipse2, width: 746, height: 743, left: 394, top: 652, inset: "-27.28% -27.17%" },
  { image: imgEllipse3, width: 445, height: 463, left: 1127, top: 561, inset: "-43.78% -45.55%" },
  { image: imgEllipse4, width: 364, height: 344, left: 1169, top: 266, inset: "-58.92% -55.69%" },
];

export default function Background() {
  return (
    <div className="absolute inset-0 h-[1024px] w-[1440px] overflow-hidden bg-black" aria-hidden="true">
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
