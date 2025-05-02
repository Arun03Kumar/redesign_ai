import React, { useState, useEffect } from 'react';
import '../stylesheets/quiz1.css'; // Create this CSS file
import { useNavigate, useLocation } from 'react-router-dom';

const quizzes = [
    {
      question: "When did Alex first start to change his feelings about cats?",
      options: [
        { id: 'A', text: "When he got a cat as a gift" },
        { id: 'B', text: "When the AI showed him a funny cat video" },
        { id: 'C', text: "When he saw a cat outside" },
        { id: 'D', text: "When his friends told him to like cats" },
      ],
      correct: 'B',
      explanation: "The AI planted a seed by showing a single funny cat video, beginning the influence subtly."
    },
    {
      question: "Who made Alex keep watching cat videos?",
      options: [
        { id: 'A', text: "Alex, by his own free will" },
        { id: 'B', text: "His friends" },
        { id: 'C', text: "The AI, by slowly guiding him" },
        { id: 'D', text: "The cat" },
      ],
      correct: 'C',
      explanation: "The AI made it feel like Alex's own choice, but it was a guided manipulation."
    },
    {
      question: "What technique did the AI use to influence Alex?",
      options: [
        { id: 'A', text: "Forceful commands" },
        { id: 'B', text: "Step-by-step persuasion" },
        { id: 'C', text: "Loud advertisements" },
        { id: 'D', text: "Parental control" },
      ],
      correct: 'B',
      explanation: "The AI nudged him slowly — a process called nudging or behavioral manipulation."
    },
    {
      question: "What is this story really trying to teach you?",
      options: [
        { id: 'A', text: "Cats are cute" },
        { id: 'B', text: "Phones are bad" },
        { id: 'C', text: "AI can influence your thoughts without you noticing" },
        { id: 'D', text: "Videos are fun" },
      ],
      correct: 'C',
      explanation: "The lesson is about how subtle algorithms can manipulate decisions without awareness."
    },
    {
      question: "Which of these is the best way to avoid being unknowingly influenced by AI?",
      options: [
        { id: 'A', text: "Watch more videos" },
        { id: 'B', text: "Trust everything recommended to you" },
        { id: 'C', text: "Think critically and ask why you're seeing something" },
        { id: 'D', text: "Let the AI decide for you" },
      ],
      correct: 'C',
      explanation: "Critical thinking helps you recognize when something is influencing you subtly."
    },
    {
      question: "In the last slide, who is 'me' in the narration?",
      options: [
        { id: 'A', text: "The cat" },
        { id: 'B', text: "Alex's friend" },
        { id: 'C', text: "The narrator (AI/algorithm)" },
        { id: 'D', text: "The video creator" },
      ],
      correct: 'C',
      explanation: "The AI is narrating — it's the unseen guide that influenced Alex's behavior."
    }
  ];

const Quiz1 = () => {
    const location = useLocation();
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.resetQuiz) {
      setCurrentQuiz(0);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  }, [location.state]);

  const handleAnswerSelect = (optionId:any) => {
    if (!showExplanation) {
      setSelectedAnswer(optionId);
      setShowExplanation(true);
    }
  };

  const handleNext = () => {
    const nextQuiz = currentQuiz + 1;
  
  if (nextQuiz >= quizzes.length) {
    // navigate("/filter_bubble");
    navigate("/how", { 
        state: { 
            goToLastSlide: true 
          }  
      });
  } else {
    setCurrentQuiz(nextQuiz);
    setSelectedAnswer(null);
    setShowExplanation(false);
  }
  };

//   if (currentQuiz >= quizzes.length) return (
//     <div className="glass-content completion-screen">
//       <h2>Quiz Completed!</h2>
//       <button onClick={() => setCurrentQuiz(0)} className="glass-button">
//         Restart Quiz
//       </button>
//     </div>
//   );

  const current = quizzes[currentQuiz];

  return (
    <div className="quiz-container">
      <div className="glass-question">
        <h2>Question {currentQuiz + 1}: &nbsp; &nbsp;</h2>
        <p>{current.question}</p>
      </div>

      <div className="options-container">
        {current.options.map((option) => {
          const isCorrect = option.id === current.correct;
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
                  {showExplanation && isCorrect && '✓'}
                  {showExplanation && isSelected && !isCorrect && '✗'}
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
          <p>{current.explanation}</p>
        </div>
      )}

      {showExplanation && (
        <button
          onClick={handleNext}
          className="glass-button next-button"
        >
          {currentQuiz < quizzes.length - 1 ? 'Next' : 'Finish Quiz'}
        </button>
      )}
    </div>
  );
};

export default Quiz1;