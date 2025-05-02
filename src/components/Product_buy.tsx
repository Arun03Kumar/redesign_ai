import React, { useState } from "react";
import robotImage from "../assets/robot.png";
import { FaArrowRight, FaUndoAlt  } from "react-icons/fa"; // Path to your robot image
import "./stylesheets/HowPage.css";
import { useNavigate } from "react-router-dom";


const slides = [
  {
    media: "/location_tracking.mp4", // Video or Image path
    narration:
      "I am always watching you, through you location, search history, you voice any many more ways and your this data can be used to sell you products which you may not need.",
  },
  {
    media: "/tracking.png",
    narration:
      "Alex and his friend is talking about a shoe, and I seceretly listing and tracking them.",
  },
  {
    media: "/tracking2.png",
    narration:
      "and now I am showing him same shoe with exciting offer, and monitoring his response whether he may bought it or not.",
  },
  {
    media: "/tracking3.png",
    narration:
      "I esclated the situation and forced him to impulse buy the shoe",
  },
  {
    media: "/tracking4.png",
    narration:
      "I am not evil but the companies they just use me for their profit.",
  },
  
];

const Product_buy = () => {
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

export default Product_buy;
