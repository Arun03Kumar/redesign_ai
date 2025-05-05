import { useState, useEffect } from "react";
import robotImage from "../assets/robot.png";
import { FaArrowRight, FaUndoAlt } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

const StoryMode = ({ slides, quizzes, nextPage, redirect, isLast=false }: any) => {
  const location = useLocation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  useEffect(() => {
    if (location.state?.goToLastSlide) {
      setCurrentSlide(slides.length - 1);
    }
  }, [location.state]);

  const isVideo = slides[currentSlide].media.endsWith(".mp4");
  const isLastSlide = currentSlide === slides.length - 1;

  const goNextPage = () => {
    if(!isLast) navigate(nextPage);
    else navigate("/")
  };

  const handleStartQuiz = () => {
    navigate("/quiz1", {
      state: {
        quizData: {
          quizzes: quizzes,
          redirectLink: redirect,
        },
      },
    });
  };

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[70%] min-h-[400px] max-h-[90vh] bg-black/10 backdrop-blur-xl rounded-xl border-1 border-black/30 shadow-xl flex z-[101] p-4">
      {isVideo ? (
        <video
          className="w-3/5 h-full object-cover rounded-l-xl"
          autoPlay
          muted
          loop
          key={currentSlide}
        >
          <source src={slides[currentSlide].media} type="video/mp4" />
        </video>
      ) : (
        <img
          className="w-3/5 h-full max-h-[80vh] object-cover rounded-l-xl"
          src={slides[currentSlide].media}
          alt={`Slide ${currentSlide}`}
        />
      )}

      <div className="w-2/5 flex flex-col items-center justify-center px-6 bg-black/40 rounded-r-xl">
        <div className="flex flex-col items-center text-center">
          <img
            src={robotImage}
            alt="Robot Narrator"
            className="w-24 h-24 object-cover rounded-full mb-4"
          />
          <div className="bg-black/70 text-white p-4 rounded-lg shadow-md max-w-xs text-justify text-xl">
            <p>{slides[currentSlide].narration}</p>
          </div>

          {isLastSlide ? (
            <div className="flex gap-4 mt-6">
              <button
                onClick={nextSlide}
                className="flex items-center gap-2 px-5 py-3 rounded bg-blue-600 text-white font-bold shadow hover:bg-blue-700 hover:shadow-md transition duration-200 cursor-pointer"
              >
                <FaUndoAlt className="text-lg" /> Replay
              </button>
              <button
                onClick={goNextPage}
                className="flex items-center gap-2 px-6 py-3 rounded bg-gray-800 text-white font-bold shadow hover:bg-gray-900 hover:shadow-md transition duration-200 cursor-pointer"
              >
                {!isLast ? "Next" : "Home"}
              </button>
              <button
                onClick={handleStartQuiz}
                className="flex items-center gap-2 px-6 py-3 rounded bg-emerald-600 text-white font-bold shadow hover:bg-emerald-700 hover:shadow-md transition duration-200 cursor-pointer"
              >
                Quiz
              </button>
            </div>
          ) : (
            <button
              onClick={nextSlide}
              className="w-10 h-10 mt-6 flex items-center justify-center rounded-full bg-gray-100 shadow hover:scale-110 transition duration-300 animate-pulse cursor-pointer"
            >
              <FaArrowRight size={15} className="text-red-400" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoryMode;
