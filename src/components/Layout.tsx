import { useState, useEffect } from "react";

const Layout = ({children}: any) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentPos, setCurrentPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
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
    </div>
  );
};

export default Layout;
