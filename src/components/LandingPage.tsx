import { useState, useEffect, useRef } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import { HiArrowNarrowRight, HiArrowNarrowLeft } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

import redrobo from "../assets/red_robo.webp"
import introVid from "../assets/intro.mp4"

const LandingPage = () => {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef<any>(null);
  const [isSlid, setIsSlid] = useState(false);

  const handleSlide = () => setIsSlid(!isSlid);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) audioRef.current.pause();
      else audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current
        .play()
        .catch((err: any) => console.log("Autoplay blocked", err));
    }
  }, []);

  const handleHowClick = () => navigate("/how");

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80%] bg-white/10 backdrop-blur-md rounded-xl border border-black/30 shadow-xl flex z-[101] p-8 gap-6 transition-all duration-500">
      {/* Left Visual Side */}
      <div className="flex-1 flex items-center justify-center">
        {isSlid ? (
          <img
            src={redrobo}
            alt="Red Robo"
            className="w-full h-full max-h-[80vh] object-cover rounded-xl transition-all duration-500"
            loading="lazy"
          />
        ) : (
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover rounded-xl transition-all duration-500"
            poster="/video-poster.jpg"
          >
            <source src={introVid} type="video/mp4" />
          </video>
        )}
      </div>

      {/* Right Text Side */}
      <div className="flex-1 flex flex-col justify-center transition-all duration-500">
        {isSlid ? (
          <div className="text-black space-y-6 ml-8">
            <h1 className="text-6xl font-bold">But Secretly....</h1>
            <ul className="list-disc text-3xl font-medium space-y-3 ml-8">
              <li>
                I can{" "}
                <span className="text-pink-900 underline">manipulate</span> you.
              </li>
              <li>
                I can <span className="text-pink-900 underline">hide</span> the{" "}
                <span className="text-pink-900 underline">outer world</span>{" "}
                from you
              </li>
              <li>
                I can{" "}
                <span className="text-pink-900 underline">
                  make you buy things
                </span>{" "}
                you don't need
              </li>
              <li>
                I can <span className="text-pink-900 underline">kill</span> your
                productiveness
              </li>
            </ul>
            <div className="flex items-center justify-between">
              <button
                onClick={handleHowClick}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-xl cursor-pointer"
              >
                How ?
              </button>
              <div className="flex items-center space-x-3 mr-8">
                <audio ref={audioRef} loop>
                  <source src="/intro_mp3.mp3" type="audio/mpeg" />
                </audio>
                <button
                  onClick={handlePlayPause}
                  className="bg-blue-500 p-3 rounded-full text-white hover:bg-blue-700 cursor-pointer"
                >
                  {isPlaying ? <FaPause /> : <FaPlay />}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-black space-y-6">
            <p className="text-2xl font-bold leading-relaxed text-justify">
              Hey there! I’m your digital genie — always watching how you
              scroll, click, and smile to show you what you love. Whether it’s
              funny videos or cool games, I’m here to keep you entertained. The
              more you use me, the better I understand you!
            </p>
            <div className="flex justify-between items-center">
              <button
                onClick={handlePlayPause}
                className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full border-2 border-black/30 flex justify-center items-center hover:shadow-lg transition duration-200 cursor-pointer"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? (
                  <FaPause className="text-black text-lg" />
                ) : (
                  <FaPlay className="text-black text-lg" />
                )}
              </button>
              <button
                onClick={handleSlide}
                className="w-10 h-10 bg-white/20 backdrop-blur-sm border-2 border-black/30 rounded-full flex justify-center items-center hover:scale-110 transition duration-200 cursor-pointer"
                aria-label={isSlid ? "Return" : "View more"}
              >
                {isSlid ? (
                  <HiArrowNarrowLeft className="text-black text-xl" />
                ) : (
                  <HiArrowNarrowRight className="text-black text-xl" />
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
