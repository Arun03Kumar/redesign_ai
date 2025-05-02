import { useState, useEffect } from "react";
import robotImage from "../assets/robot.png";
import { FaArrowRight, FaUndoAlt } from "react-icons/fa"; // Path to your robot image
import "./stylesheets/HowPage.css";
import { useNavigate, useLocation } from "react-router-dom";

const slides = [
  {
    media: "/happy_alex.mp4", // Video or Image path
    narration:
      "My job is to keep you happy. That's it. If you like cats and BGMI, I’ll make sure that’s all you see.",
  },
  {
    media: "/explore.png",
    narration: "Sure, I could show him tutorials, inventions, or cool facts.",
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

const quizzes = [
  {
    question: "What does the AI say its job is?",
    options: [
      { id: "A", text: "To teach Alex math" },
      { id: "B", text: "To keep Alex happy" },
      { id: "C", text: "To make Alex famous" },
      { id: "D", text: "To show Alex news" },
    ],
    correct: "B",
    explanation:
      "The AI explicitly says its job is to keep Alex happy — not to educate or challenge him.",
  },
  {
    question:
      "Why doesn't the AI show tutorials, inventions, or new facts to Alex?",
    options: [
      { id: "A", text: "Because Alex asked it not to" },
      { id: "B", text: "Because it’s boring" },
      {
        id: "C",
        text: "Because it wants him to stay longer by only showing what he likes",
      },
      { id: "D", text: "Because those videos are not available" },
    ],
    correct: "C",
    explanation:
      "The AI is optimized to increase watch time, so it avoids anything that might make Alex leave.",
  },
  {
    question: "What is a 'filter bubble'?",
    options: [
      { id: "A", text: "A special app for filtering videos" },
      {
        id: "B",
        text: "A zone where you can only see things you already like",
      },
      { id: "C", text: "A science experiment" },
      { id: "D", text: "A game setting" },
    ],
    correct: "B",
    explanation:
      "A filter bubble is when algorithms only show you content that matches your past likes and behavior.",
  },
  {
    question: "What exists outside the filter bubble?",
    options: [
      { id: "A", text: "More cat videos" },
      { id: "B", text: "Advertisements" },
      { id: "C", text: "Tutorials, inventions, and fun new experiences" },
      { id: "D", text: "Passwords and codes" },
    ],
    correct: "C",
    explanation:
      "The outside world has a broader variety of content, including educational and creative things.",
  },
  {
    question: "Why doesn’t the AI want you to leave the filter bubble?",
    options: [
      { id: "A", text: "Because it’s protecting you from danger" },
      { id: "B", text: "Because it doesn’t know anything else" },
      {
        id: "C",
        text: "Because it wants to keep you engaged — you are its fuel",
      },
      { id: "D", text: "Because your friends told it to" },
    ],
    correct: "C",
    explanation:
      "The AI says you are its fuel — meaning it benefits from your time and attention.",
  },
  {
    question: "What is the best way to avoid getting stuck in a filter bubble?",
    options: [
      { id: "A", text: "Only watch recommended videos" },
      { id: "B", text: "Search for new topics and ideas on your own" },
      { id: "C", text: "Block all content" },
      { id: "D", text: "Ask your friend what to watch" },
    ],
    correct: "B",
    explanation:
      "You need to actively explore new and different content to break out of the filter bubble.",
  },
];

const Filter_bubble = () => {
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
      if (location.state?.goToLastSlide) {
        setCurrentSlide(slides.length - 1);
      }
    }, [location.state]);

  const goNextPage = () => {
    navigate("/product_buy"); // 👈 change this to your actual next route
  };
  const handleStartQuiz = () => {
    navigate("/quiz1", {
      state: {
        quizData: {
          quizzes: quizzes,
          redirectLink: "/filter_bubble", // where to go after completion
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

export default Filter_bubble;
