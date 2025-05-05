import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useBackground } from "../context/BackgroundContext";

const Layout = ({ children }: any) => {
  const location = useLocation();
  const hideFab = ["/", "/interactive-app-mode"];
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentPos, setCurrentPos] = useState({ x: 0, y: 0 });
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const {background} = useBackground();
  // const gradientStyle = {
  //   background: `linear-gradient(to bottom right, ${gradient.from}, ${gradient.to})`,
  // };

  const backgroundStyle = background.type === "gradient"
  ? { background: `linear-gradient(to bottom right, ${background.from}, ${background.to})` }
  : { backgroundImage: `url(${background.url})`, backgroundSize: 'cover', backgroundPosition: 'center' };

  const showFab = !hideFab.includes(location.pathname);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const move = () => {
      setCurrentPos((prev) => ({
        x: prev.x + (mousePosition.x - prev.x) / 10,
        y: prev.y + (mousePosition.y - prev.y) / 10,
      }));
      requestAnimationFrame(move);
    };
    const animationFrame = requestAnimationFrame(move);
    return () => cancelAnimationFrame(animationFrame);
  }, [mousePosition]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  return (
    <div className="relative w-screen h-screen font-[Nunito]">
      {/* Gradient background */}
      <div className="absolute inset-0 overflow-hidden" style={backgroundStyle}>
        {/* <svg xmlns="http://www.w3.org/2000/svg" className="absolute w-0 h-0">
          <defs>
            <filter id="goo">
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="10"
                result="blur"
              />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
                result="goo"
              />
              <feBlend in="SourceGraphic" in2="goo" />
            </filter>
          </defs>
        </svg> */}
        {/* <div
          className="w-full h-full blur-[10px]"
          style={{ filter: "url(#goo)" }}
        >
          <div
            className="absolute w-full h-full rounded-full"
            style={{
              transform: `translate(${currentPos.x}px, ${currentPos.y}px)`,
              background:
                "radial-gradient(circle at center, rgba(199, 140, 115, 0.6) 0, rgba(58, 36, 25, 0) 50%)",
              opacity: 0.7,
              top: "-50%",
              left: "-50%",
            }}
          ></div>
        </div> */}
      </div>

      {/* Main children */}
      <div className="z-10">{children}</div>

      {/* Floating button */}
      {/* {showFab && (
        <div className="fixed top-6 left-6 z-50">
          <button
            className="w-14 h-14 pt-2 bg-blue-600 text-white text-2xl font-bold rounded-full shadow-md hover:bg-blue-800 transition"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            ☰
          </button>
          <div
            ref={menuRef}
            className={`mt-3 p-3 rounded-md shadow-lg flex flex-col text-2xl gap-2 bg-white transition-all origin-top-left transform ${
              menuOpen
                ? "scale-100 opacity-100 pointer-events-auto"
                : "scale-95 opacity-0 pointer-events-none"
            }`}
          >
            <a href="/" className="text-blue-600 font-bold hover:underline">
              Home
            </a>
            <a
              href="/game/cats"
              className="text-blue-600 font-bold hover:underline"
            >
              Interactive App 1
            </a>
            <a
              href="/game/filter_bubble"
              className="text-blue-600 font-bold hover:underline"
            >
              Filter Bubble
            </a>
            <a
              href="/game/social_media"
              className="text-blue-600 font-bold hover:underline"
            >
              Redesign Social App
            </a>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default Layout;
