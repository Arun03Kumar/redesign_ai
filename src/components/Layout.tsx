import { useState, useEffect, useRef } from "react";
// import "./Layout.css"; // Ensure this line exists and points to the CSS file

const Layout = ({ children }: any) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentPos, setCurrentPos] = useState({ x: 0, y: 0 });
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

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
        x: prev.x + (mousePosition.x - prev.x) / 20,
        y: prev.y + (mousePosition.y - prev.y) / 20,
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
    <div className="container">
      <div className="gradient-bg">
        <svg xmlns="http://www.w3.org/2000/svg">
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
        </svg>
        <div className="gradients-container">
          <div className="g1"></div>
          <div className="g2"></div>
          <div className="g3"></div>
          <div className="g4"></div>
          <div className="g5"></div>
          <div
            className="interactive"
            style={{
              transform: `translate(${currentPos.x}px, ${currentPos.y}px)`,
            }}
          ></div>
        </div>
      </div>

      <div>{children}</div>

      {/* Floating Button & Menu */}
      <div className="fab-container">
        <button
          className="fab-button"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          ☰
        </button>
        <div ref={menuRef} className={`fab-menu ${menuOpen ? "open" : ""}`}>
          <a href="/game/cats">Interactive App 1</a>
          <a href="/game/filter_bubble">Filter Bubble</a>
          <a href="/game/social_media">Redesign Social App</a>
        </div>
      </div>
    </div>
  );
};

export default Layout;
