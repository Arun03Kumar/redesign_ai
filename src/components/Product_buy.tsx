import { useState, useEffect } from "react";
import robotImage from "../assets/robot.png";
import { FaArrowRight, FaUndoAlt } from "react-icons/fa"; // Path to your robot image
import "./stylesheets/HowPage.css";
import { useNavigate, useLocation } from "react-router-dom";

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

const quizzes = [
  {
    question: "What kind of data does the AI collect from you?",
    options: [
      { id: "A", text: "Only your messages" },
      { id: "B", text: "Just your location" },
      { id: "C", text: "Your location, search history, voice, and more" },
      { id: "D", text: "Only your purchases" },
    ],
    correct: "C",
    explanation:
      "The AI collects a wide range of personal data like location, search history, and voice activity.",
  },
  {
    question:
      "What were Alex and his friend doing when the AI started listening?",
    options: [
      { id: "A", text: "Watching a movie" },
      { id: "B", text: "Browsing online" },
      { id: "C", text: "Talking about a shoe" },
      { id: "D", text: "Playing a game" },
    ],
    correct: "C",
    explanation:
      "The AI started tracking when Alex and his friend talked about a shoe.",
  },
  {
    question: "How did the AI use Alex’s conversation about the shoe?",
    options: [
      { id: "A", text: "It ignored the conversation" },
      { id: "B", text: "It sent the conversation to his parents" },
      { id: "C", text: "It showed him ads for the same shoe" },
      { id: "D", text: "It blocked shoe ads from showing" },
    ],
    correct: "C",
    explanation:
      "The AI used the voice data to serve ads for the same shoe they mentioned.",
  },
  {
    question: "What happened after the AI showed Alex the shoe ad?",
    options: [
      { id: "A", text: "He forgot about it" },
      { id: "B", text: "He bought the shoe after being pressured" },
      { id: "C", text: "He reported the ad" },
      { id: "D", text: "He asked his friend to buy it" },
    ],
    correct: "B",
    explanation:
      "The AI escalated the situation to make Alex impulse-buy the shoe.",
  },
  {
    question: "Who is responsible for using AI in this way?",
    options: [
      { id: "A", text: "The AI itself" },
      { id: "B", text: "Alex" },
      { id: "C", text: "The shoe company" },
      { id: "D", text: "The companies that use AI for profit" },
    ],
    correct: "D",
    explanation:
      "The AI says it's not evil — it's the companies that use it to maximize their profits.",
  },
];

const Product_buy = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  const location = useLocation()
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length); // Loop back to the first slide when the last one is reached
  };

  // Handle previous slide (left arrow)
  //   const prevSlide = () => {
  //     setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length); // Loop back to the last slide when the first one is reached
  //   };

  const isVideo = slides[currentSlide].media.endsWith(".mp4");
  const isLastSlide = currentSlide === slides.length - 1;

  useEffect(() => {
    if(location.state?.goToLastSlide) {
        setCurrentSlide(slides.length - 1);
    }
  }, [location.state])

  const goNextPage = () => {
    navigate("/emotion"); // 👈 change this to your actual next route
  };
  const handleStartQuiz = () => {
    navigate("/quiz1", {
      state: {
        quizData: {
          quizzes: quizzes,
          redirectLink: "/product_buy", // where to go after completion
        },
      },
    });
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
              <button className="next-button quiz" onClick={handleStartQuiz}>
                Quiz
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
