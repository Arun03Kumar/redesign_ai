import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Quiz1 = () => {
  const location = useLocation();
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizzesData, setQuizzesData] = useState({
    quizzes: [],
    redirectLink: "/",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.quizData) {
      setQuizzesData(location.state.quizData);
    }
  }, [location.state]);

  useEffect(() => {
    if (location.state?.resetQuiz) {
      setCurrentQuiz(0);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  }, [location.state]);

  const current: any =
    quizzesData.quizzes.length > 0 ? quizzesData.quizzes[currentQuiz] : null;

  const handleAnswerSelect = (optionId: any) => {
    if (!showExplanation) {
      setSelectedAnswer(optionId);
      setShowExplanation(true);
    }
  };

  const handleNext = () => {
    const nextQuiz = currentQuiz + 1;
    if (nextQuiz >= quizzesData.quizzes.length) {
      navigate(quizzesData.redirectLink, { state: { goToLastSlide: true } });
    } else {
      setCurrentQuiz(nextQuiz);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[70%] min-h-[400px] p-8">
      <div className="bg-balck/5 backdrop-blur-md rounded-lg shadow-xl text-balck p-6 mb-8 flex items-center border-2 border-black/30">
        <h2 className="text-3xl font-bold mr-4">Question {currentQuiz + 1}:</h2>
        <p className="text-3xl font-bold">{current?.question}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 text-balck mb-8">
        {current?.options.map((option: any) => {
          const isCorrect = option.id === current?.correct;
          const isSelected = option.id === selectedAnswer;

          let baseClass =
            "p-4 rounded-lg cursor-pointer transition-all flex items-center text-2xl font-bold backdrop-blur-md border-2 border-black/30";
          let bgClass = "bg-white/10 hover:bg-white/20";

          if (showExplanation) {
            if (isCorrect) bgClass = "bg-green-800/30";
            else if (isSelected) bgClass = "bg-red-700/30";
          }

          return (
            <div
              key={option.id}
              className={`${baseClass} ${bgClass}`}
              onClick={() => handleAnswerSelect(option.id)}
            >
              <div className="w-6 h-6 rounded-full border-2 border-black/30 bg-balck/10 flex items-center justify-center mr-4">
                {showExplanation && isCorrect && "✓"}
                {showExplanation && isSelected && !isCorrect && "✗"}
              </div>
              <span>{option.text}</span>
            </div>
          );
        })}
      </div>

      {showExplanation && (
        <div className="bg-blue-200/10 border-l-4 border-blue-300 p-4 mb-6 rounded text-balck text-2xl">
          <p className="font-bold mb-2">📘 Explanation:</p>
          <p>{current?.explanation}</p>
        </div>
      )}

      {showExplanation && (
        <button
          onClick={handleNext}
          className="float-right bg-white/10 hover:bg-white/20 border border-black/30 py-2 px-6 rounded transition-all text-2xl font-bold cursor-pointer"
        >
          {currentQuiz < quizzesData.quizzes.length - 1
            ? "Next"
            : "Finish Quiz"}
        </button>
      )}
    </div>
  );
};

export default Quiz1;
