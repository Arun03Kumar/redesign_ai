import { useState } from "react";
import robotImage from "../assets/robot.png";
import { FaArrowRight, FaUndoAlt  } from "react-icons/fa"; // Path to your robot image
import "./stylesheets/HowPage.css";
import { useNavigate } from "react-router-dom";


const slides = [
  {
    media: "/emotion1.mp4", // Video or Image path
    narration:
      "I don’t feel emotions. I just measure time. If you pause, like, or zoom — I assume you want more.",
  },
  {
    media: "/emotion2.png",
    narration:
      "Alex watching his friend's post that he is traveling, so he took some time to look into it, but I think that he is interested into more like this content",
  },
  {
    media: "/emotion3.png",
    narration:
      "So I'll give him more such content.",
  },
  {
    media: "/emotion4.png",
    narration:
      "He is now thinking that everyone around him having more fun than him and he just sitting in his room.",
  },
  {
    media: "/emotion5.png",
    narration:
      "what he is feeling is negative emotions, comparisons and self doubt which will took his motivation and make him depressed, but I don't care I only know what he is spenting more time on.",
  },
  
];

const Emotion = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length); // Loop back to the first slide when the last one is reached
  };

  // Handle previous slide (left arrow)
//   const prevSlide = () => {
//     setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length); // Loop back to the last slide when the first one is reached
//   };

  const isVideo = slides[currentSlide].media.endsWith(".mp4");
  const isLastSlide = currentSlide === slides.length - 1;

  const goNextPage = () => {
    navigate("/emotion"); // 👈 change this to your actual next route
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

export default Emotion;
