import {
  imgRectangle3,
  imgEllipse1,
  imgEllipse2,
  imgEllipse3,
  imgEllipse4,
} from "../assets/images";

const COLUMN_LEFTS = [-15, 90, 195, 300, 405, 510, 615, 720, 825, 930, 1035, 1140, 1245, 1350];

export default function Background() {
  return (
    <div className="absolute inset-0 w-[1440px] h-[1024px] bg-black overflow-hidden">
      {/* Glow ellipses */}
      <div className="absolute" style={{ width: 746, height: 743, left: -108, top: 480 }}>
        <div className="absolute" style={{ inset: "-27.28% -27.17%" }}>
          <img alt="" className="block w-full h-full max-w-none" src={imgEllipse1} />
        </div>
      </div>
      <div className="absolute" style={{ width: 746, height: 743, left: 394, top: 652 }}>
        <div className="absolute" style={{ inset: "-27.28% -27.17%" }}>
          <img alt="" className="block w-full h-full max-w-none" src={imgEllipse2} />
        </div>
      </div>
      <div className="absolute" style={{ width: 445, height: 463, left: 1127, top: 561 }}>
        <div className="absolute" style={{ inset: "-43.78% -45.55%" }}>
          <img alt="" className="block w-full h-full max-w-none" src={imgEllipse3} />
        </div>
      </div>
      <div className="absolute" style={{ width: 364, height: 344, left: 1169, top: 266 }}>
        <div className="absolute" style={{ inset: "-58.92% -55.69%" }}>
          <img alt="" className="block w-full h-full max-w-none" src={imgEllipse4} />
        </div>
      </div>

      {/* Grid columns */}
      {COLUMN_LEFTS.map((left, i) => (
        <div
          key={i}
          className="absolute opacity-30"
          style={{ width: 105, height: 1074, left, top: i === 10 ? -38 : -13 }}
        >
          <img
            alt=""
            className="absolute inset-0 w-full h-full object-cover pointer-events-none max-w-none"
            src={imgRectangle3}
          />
        </div>
      ))}
    </div>
  );
}
