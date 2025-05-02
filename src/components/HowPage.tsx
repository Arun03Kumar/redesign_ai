import { useState, useEffect } from "react";
import robotImage from "../assets/robot.png";
import { FaArrowRight, FaUndoAlt  } from "react-icons/fa"; // Path to your robot image
import "./stylesheets/HowPage.css";
import { useNavigate, useLocation  } from "react-router-dom";


const slides = [
  {
    media: "/boy.mp4", // Video or Image path
    narration:
      "This is Alex, just like you, scrolling and using phone all day.",
  },
  {
    media: "/boy_dont_like_cat.mp4",
    narration:
      "At first, Alex didn’t like cats. He barely noticed one walk by, uninterested, his mind set. But I saw an opportunity.",
  },
  {
    media: "/boy_3.png",
    narration:
      "So I showed him a video — just one. A funny little cat doing silly things. Nothing serious… just planting a seed. At first I didn't get much response from him",
  },
  {
    media: "/boy_4.png",
    narration:
      "but It made him smile. That tiny shift — that little 'like' — was all I needed. A nudge, so gentle he didn’t even notice",
  },
  {
    media: "/boy_5.png",
    narration:
      "Then I gave him more. Laughter followed. He thought it was his idea to keep watching. It wasn't.",
  },
  {
    media: "/boy_6.png",
    narration:
      "By the time I showed my true form, he was already mine. I didn’t change his mind. I guided it. Subtly. Precisely.",
  },
  {
    media: "/boy_7.png",
    narration:
      "Now look at him. Petting the cat he once ignored. That’s the power of influence. That's the power of me. And if I could change him... just imagine what I can do to you.",
  },
];

const HowPage = () => {
  const location = useLocation();
  const [currentSlide, setCurrentSlide] = useState(0);
  // const [currentSlide, setCurrentSlide] = useState(
  //   location.state?.initialSlide || 0
  // );
  const navigate = useNavigate();
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length); // Loop back to the first slide when the last one is reached
  };

  useEffect(() => {
    if (location.state?.goToLastSlide) {
      setCurrentSlide(slides.length - 1);
    }
  }, [location.state]);

  // Handle previous slide (left arrow)
  // const prevSlide = () => {
  //   setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length); // Loop back to the last slide when the first one is reached
  // };

  const isVideo = slides[currentSlide].media.endsWith(".mp4");
  const isLastSlide = currentSlide === slides.length - 1;

  const goNextPage = () => {
    navigate("/filter_bubble"); // 👈 change this to your actual next route
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
              <button onClick={() => navigate("/quiz1", { state: { resetQuiz: true } })}>Quiz</button>
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

export default HowPage;
