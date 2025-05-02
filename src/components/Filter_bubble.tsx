import React, { useState } from "react";
import robotImage from "../assets/robot.png";
import { FaArrowRight, FaUndoAlt  } from "react-icons/fa"; // Path to your robot image
import "./stylesheets/HowPage.css";
import { useNavigate } from "react-router-dom";


const slides = [
  {
    media: "/happy_alex.mp4", // Video or Image path
    narration:
      "My job is to keep you happy. That's it. If you like cats and BGMI, I’ll make sure that’s all you see.",
  },
  {
    media: "/explore.png",
    narration:
      "Sure, I could show him tutorials, inventions, or cool facts.",
  },
  {
    media: "/hook.mp4",
    narration:
      "But I only showing him what he likes so he spents more time with me.",
  },
  {
    media: "/bubble.mp4",
    narration:
      "This is called filter bubble, so he can only see what's inside the bubble",
  },
  {
    media: "/outside_world.png",
    narration:
      "you can see there's a lot to learn and more fun in outside world but I'll make sure that you won't come out of filter bubble because you are my fuel",
  },
  
];

const Filter_bubble = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length); // Loop back to the first slide when the last one is reached
  };

  // Handle previous slide (left arrow)
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length); // Loop back to the last slide when the first one is reached
  };

  const isVideo = slides[currentSlide].media.endsWith(".mp4");
  const isLastSlide = currentSlide === slides.length - 1;

  const goNextPage = () => {
    navigate("/product_buy"); // 👈 change this to your actual next route
  };
  return (
    <div className="glass-content">
      {isVideo ? (
        <video
          className="background-video"
          autoPlay
          muted
          loop
          key={currentSlide}
        >
          <source src={slides[currentSlide].media} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <img
          className="background-image"
          src={slides[currentSlide].media}
          alt={`Slide ${currentSlide}`}
        />
      )}
      <div className="right-side-container">
        <div className="robot-narration-container">
          <img src={robotImage} alt="Robot Narrator" className="robot-image" />
          <div className="narration-text">
            <p>{slides[currentSlide].narration}</p>
          </div>
          {isLastSlide ? (
            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <button className="replay-button" onClick={nextSlide}>
                <FaUndoAlt style={{ marginRight: "5px" }} />
              </button>
              <button className="next-button" onClick={goNextPage}>
                Next
              </button>
            </div>
          ) : (
            // Arrow for normal slides
            <div className="arrow-logo" onClick={nextSlide}>
              <FaArrowRight size={15} color="#FF6B6B" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Filter_bubble;
