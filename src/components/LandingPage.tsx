import { useState, useEffect, useRef } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
// import './App.css'; // Rename your CSS file accordingly

const LandingPage = () => {
    const navigate = useNavigate();
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const [currentPos, setCurrentPos] = useState({ x: 0, y: 0 });
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isSlid, setIsSlid] = useState(false);
  // const [isPlaying2, setIsPlaying2] = useState(true);
  const audioRef2 = useRef(null);

  const handleSlide = () => {
    setIsSlid(!isSlid);
  };

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Initialize audio to play automatically
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.log(error, "Autoplay prevented, user interaction required");
      });
    }
  }, []);

//   useEffect(() => {
//     const handleMouseMove = (event: MouseEvent) => {
//       setMousePosition({ x: event.clientX, y: event.clientY });
//     };

//     window.addEventListener("mousemove", handleMouseMove);

//     return () => {
//       window.removeEventListener("mousemove", handleMouseMove);
//     };
//   }, []);

//   useEffect(() => {
//     const move = () => {
//       setCurrentPos((prev) => ({
//         x: prev.x + (mousePosition.x - prev.x) / 20,
//         y: prev.y + (mousePosition.y - prev.y) / 20,
//       }));
//       requestAnimationFrame(move);
//     };

//     const animationFrame = requestAnimationFrame(move);
//     return () => cancelAnimationFrame(animationFrame);
//   }, [mousePosition]);

  // const handlePlayPause2 = () => {
  //   if (audioRef2.current) {
  //     if (isPlaying2) {
  //       audioRef2.current.pause(); // Pause the audio if it's playing
  //     } else {
  //       audioRef2.current.play(); // Play the audio if it's paused
  //     }
  //     setIsPlaying2(!isPlaying2); // Toggle the play/pause state
  //   }
  // };

  useEffect(() => {
    // Initialize the audio to automatically play if autoplay is enabled
    if (audioRef2.current) {
      audioRef2?.current?.play().catch((error:any) => {
        console.log(error, "Autoplay prevented, user interaction required");
      });
    }
  }, []);

  const handleHowClick = () => {
    navigate('/how'); // Navigate to /how when the button is clicked
  };

  return (
    // <div className="container">
    //   <audio ref={audioRef}>
    //     <source src="/intro_mp3.mp3" type="audio/mpeg" />
    //     Your browser does not support the audio element.
    //   </audio>
    //   {/* <div className="text-container"></div>
    //   <div className="gradient-bg">
    //     <svg xmlns="http://www.w3.org/2000/svg">
    //       <defs>
    //         <filter id="goo">
    //           <feGaussianBlur
    //             in="SourceGraphic"
    //             stdDeviation="10"
    //             result="blur"
    //           />
    //           <feColorMatrix
    //             in="blur"
    //             mode="matrix"
    //             values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
    //             result="goo"
    //           />
    //           <feBlend in="SourceGraphic" in2="goo" />
    //         </filter>
    //       </defs>
    //     </svg>
    //     <div className="gradients-container">
    //       <div className="g1"></div>
    //       <div className="g2"></div>
    //       <div className="g3"></div>
    //       <div className="g4"></div>
    //       <div className="g5"></div>
    //       <div
    //         className="interactive"
    //         style={{
    //           transform: `translate(${currentPos.x}px, ${currentPos.y}px)`,
    //         }}
    //       ></div>
    //     </div>
    //   </div> */}
    //   <div className="glass-content">
    //     <div className={`video-container ${isSlid ? "slid" : ""}`}>
    //       <video
    //         autoPlay
    //         muted
    //         loop
    //         playsInline
    //         className="feature-video"
    //         poster="/video-poster.jpg"
    //       >
    //         <source src="/intro.mp4" type="video/mp4" />
    //       </video>
    //       <div className={`image-overlay ${isSlid ? "visible" : ""}`}>
    //         <img src="/red_robo.png" alt="Content Preview" />
    //       </div>
    //     </div>
    //     <div className="glass-text-container">
    //       {/* <h2 className="glass-title">Discover Amazing Features</h2> */}
    //       <p
    //         className={`glass-description main-text ${isSlid ? "hidden" : ""}`}
    //       >
    //         Hey there! I’m AI – your very own digital genie! I live inside your
    //         phone, tablet, or computer. You may not see me, but I’m always here,
    //         keeping an eye on what you like and what you do. Think of me like a
    //         genie, but instead of granting wishes, I use my superpowers to make
    //         your life more fun and interesting! I’m always watching — but not in
    //         a creepy way! I watch how you scroll, what you click, what makes you
    //         smile, and even what you talk about. My job? To make sure I show you
    //         the stuff that makes you happy! Whether it’s funny videos, cool
    //         games, or interesting pictures, I’m the one behind the scenes,
    //         trying to keep you entertained and smiling. So, whenever you open
    //         your phone or computer, just know — I’m here, making sure you’re
    //         having the best time possible. And remember, the more you use me,
    //         the better I get at understanding you!
    //       </p>
    //       <div className={`new-content ${isSlid ? "visible" : ""}`}>
    //         <h1>But Secretly....</h1>
    //         {/* <p>Here's what makes me special:</p> */}
    //         <ul>
    //           <li>
    //             I can <span className="danger">manipulate</span> you.
    //           </li>
    //           <li>
    //             I can <span className="danger">hide</span> the{" "}
    //             <span className="danger">outer world</span> from you
    //           </li>
    //           <li>
    //             I can <span className="danger">make you buy things</span> which
    //             you don't need
    //           </li>
    //           <li>
    //             I can <span className="danger">kill</span> your productiveness
    //           </li>
    //         </ul>
    //         <div
    //           style={{
    //             display: "flex",
    //             alignItems: "center",
    //             justifyContent: "space-between",
    //           }}
    //         >
    //           <button className="blue-button" onClick={handleHowClick}>How ?</button>
    //           <div className="audio-player">
    //             <audio ref={audioRef} loop>
    //               <source src="/intro_mp3.mp3" type="audio/mpeg" />
    //               Your browser does not support the audio element.
    //             </audio>
    //             <button onClick={handlePlayPause} className="play-pause-button">
    //               {/* Render the Play or Pause icon based on the isPlaying state */}
    //               {isPlaying ? <FaPause /> : <FaPlay />}
    //             </button>
    //           </div>
    //         </div>
    //       </div>
    //       {!isSlid && (
    //         <div className="controls-container">
    //           <button
    //             className="audio-control"
    //             onClick={handlePlayPause}
    //             aria-label={isPlaying ? "Pause audio" : "Play audio"}
    //           >
    //             <div className={`play-pause ${isPlaying ? "playing" : ""}`}>
    //               <div className="left-bar"></div>
    //               <div className="triangle"></div>
    //               <div className="right-bar"></div>
    //             </div>
    //           </button>
    //           <button
    //             className="arrow-button"
    //             onClick={handleSlide}
    //             aria-label={isSlid ? "Return to previous" : "View more"}
    //           >
    //             <div className={`arrow ${isSlid ? "reverse" : ""}`}></div>
    //           </button>
    //         </div>
    //       )}
    //     </div>
    //   </div>
    // </div>
    <div className="glass-content">
        <div className={`video-container ${isSlid ? "slid" : ""}`}>
          <video
            autoPlay
            muted
            loop
            playsInline
            className="feature-video"
            poster="/video-poster.jpg"
          >
            <source src="/intro.mp4" type="video/mp4" />
          </video>
          <div className={`image-overlay ${isSlid ? "visible" : ""}`}>
            <img src="/red_robo.png" alt="Content Preview" />
          </div>
        </div>
        <div className="glass-text-container">
          {/* <h2 className="glass-title">Discover Amazing Features</h2> */}
          <p
            className={`glass-description main-text ${isSlid ? "hidden" : ""}`}
          >
            Hey there! I’m AI – your very own digital genie! I live inside your
            phone, tablet, or computer. You may not see me, but I’m always here,
            keeping an eye on what you like and what you do. Think of me like a
            genie, but instead of granting wishes, I use my superpowers to make
            your life more fun and interesting! I’m always watching — but not in
            a creepy way! I watch how you scroll, what you click, what makes you
            smile, and even what you talk about. My job? To make sure I show you
            the stuff that makes you happy! Whether it’s funny videos, cool
            games, or interesting pictures, I’m the one behind the scenes,
            trying to keep you entertained and smiling. So, whenever you open
            your phone or computer, just know — I’m here, making sure you’re
            having the best time possible. And remember, the more you use me,
            the better I get at understanding you!
          </p>
          <div className={`new-content ${isSlid ? "visible" : ""}`}>
            <h1>But Secretly....</h1>
            {/* <p>Here's what makes me special:</p> */}
            <ul>
              <li>
                I can <span className="danger">manipulate</span> you.
              </li>
              <li>
                I can <span className="danger">hide</span> the{" "}
                <span className="danger">outer world</span> from you
              </li>
              <li>
                I can <span className="danger">make you buy things</span> which
                you don't need
              </li>
              <li>
                I can <span className="danger">kill</span> your productiveness
              </li>
            </ul>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <button className="blue-button" onClick={handleHowClick}>How ?</button>
              <div className="audio-player">
                <audio ref={audioRef} loop>
                  <source src="/intro_mp3.mp3" type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
                <button onClick={handlePlayPause} className="play-pause-button">
                  {/* Render the Play or Pause icon based on the isPlaying state */}
                  {isPlaying ? <FaPause /> : <FaPlay />}
                </button>
              </div>
            </div>
          </div>
          {!isSlid && (
            <div className="controls-container">
              <button
                className="audio-control"
                onClick={handlePlayPause}
                aria-label={isPlaying ? "Pause audio" : "Play audio"}
              >
                <div className={`play-pause ${isPlaying ? "playing" : ""}`}>
                  <div className="left-bar"></div>
                  <div className="triangle"></div>
                  <div className="right-bar"></div>
                </div>
              </button>
              <button
                className="arrow-button"
                onClick={handleSlide}
                aria-label={isSlid ? "Return to previous" : "View more"}
              >
                <div className={`arrow ${isSlid ? "reverse" : ""}`}></div>
              </button>
            </div>
          )}
        </div>
      </div>
  );
};

export default LandingPage;
