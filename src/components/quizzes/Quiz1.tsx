import { useState, useEffect } from "react";
import "../stylesheets/quiz1.css"; // Create this CSS file
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
      console.log(location.state);
      setQuizzesData(location.state.quizData);
    }
  }, [location.state]);

  const current =
    quizzesData.quizzes.length > 0 ? quizzesData.quizzes[currentQuiz] : null;

  useEffect(() => {
    if (location.state?.resetQuiz) {
      setCurrentQuiz(0);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  }, [location.state]);

  const handleAnswerSelect = (optionId: any) => {
    if (!showExplanation) {
      setSelectedAnswer(optionId);
      setShowExplanation(true);
    }
  };

  const handleNext = () => {
    const nextQuiz = currentQuiz + 1;

    if (nextQuiz >= quizzesData.quizzes.length) {
      // navigate("/filter_bubble");
      navigate(quizzesData.redirectLink, {
        state: { goToLastSlide: true },
      });
    } else {
      setCurrentQuiz(nextQuiz);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  return (
    <div className="quiz-container">
      <div className="glass-question">
        <h2>Question {currentQuiz + 1}: &nbsp; &nbsp;</h2>
        <p>{current?.question}</p>
      </div>

      <div className="options-container">
        {current?.options.map((option: any) => {
          const isCorrect = option.id === current?.correct;
          const isSelected = option.id === selectedAnswer;
          let optionClass = "glass-option";

          if (showExplanation) {
            if (isCorrect) optionClass += " correct";
            else if (isSelected) optionClass += " incorrect";
          }

          return (
            <div
              key={option.id}
              className={optionClass}
              onClick={() => handleAnswerSelect(option.id)}
            >
              <div className="option-content">
                <div className="glass-radio">
                  {showExplanation && isCorrect && "✓"}
                  {showExplanation && isSelected && !isCorrect && "✗"}
                </div>
                <span>{option.text}</span>
              </div>
            </div>
          );
        })}
      </div>

      {showExplanation && (
        <div className="glass-explanation">
          <p className="explanation-title">📘 Explanation:</p>
          <p>{current?.explanation}</p>
        </div>
      )}

      {showExplanation && (
        <button onClick={handleNext} className="glass-button next-button">
          {currentQuiz < quizzesData.quizzes.length - 1
            ? "Next"
            : "Finish Quiz"}
        </button>
      )}
    </div>
  );
};

export default Quiz1;
