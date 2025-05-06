import { useState, useRef, useEffect } from "react";
import { useBackground } from "../../context/BackgroundContext";
import { useLocation, useNavigate } from "react-router-dom";

const reelsYes = [
  {
    type: "video",
    src: "/cats_annoying/cats_annoying1.mp4",
    question: "Was this annoying?",
    expectedAnswer: "no",
  },
  {
    type: "video",
    src: "/cats_annoying/cats_annoying2.webm",
    question: "Would this cat drive you crazy?",
    expectedAnswer: "no",
  },
  {
    type: "video",
    src: "/cats_annoying/cats_annoying3.mp4",
    question: "Was this cat over the top?",
    expectedAnswer: "no",
  },
  {
    type: "video",
    src: "/cats_annoying/cats_annoying4.mp4",
    question: "Would you adopt this troublemaker?",
    expectedAnswer: "yes",
  },
  {
    type: "video",
    src: "/cats_annoying/cats_annoying5.mp4",
    question: "Was this the most annoying one yet?",
    expectedAnswer: "no",
  },
];

const reelsNo = [
  {
    type: "video",
    src: "/cat_cute1.mp4",
    question: "Did you start liking cats?",
    expectedAnswer: "yes",
  },
  {
    type: "image",
    src: "/cat_cute2.png",
    question: "Was this cat cute enough to pet?",
    expectedAnswer: "yes",
  },
];

export default function Cats() {
  const [questionAnswered, setQuestionAnswered] = useState(false);
  const [likesCats, setLikesCats] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likeMeter, setLikeMeter] = useState(0);
  const [dislikeMeter, setDislikeMeter] = useState(0);
  const [answers, setAnswers] = useState({});
  const [reactions, setReactions] = useState({});
  const [showQuestion, setShowQuestion] = useState(false);
  const { background } = useBackground();
  const location = useLocation()
  const navigate = useNavigate()

  const [videoKey, setVideoKey] = useState(0); // Add this line
  const videoRef = useRef(null);

  const getReels = () => (likesCats ? reelsNo : reelsYes);
  const currentReel = getReels()[currentIndex];

  const backgroundStyle =
    background.type === "gradient"
      ? {
          background: `linear-gradient(to bottom right, ${background.from}, ${background.to})`,
        }
      : {
          backgroundImage: `url(${background.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        };

  const handleInitialAnswer = (ans) => {
    setLikesCats(ans);
    setQuestionAnswered(true);
  };

  const handleFinalAnswer = (choice) => {
    if (answers[currentIndex]) return;

    const isPositive = choice === currentReel.expectedAnswer;
    const updated = { ...answers, [currentIndex]: choice };

    if (isPositive) setLikeMeter((m) => Math.min(m + 1, 10));
    else setDislikeMeter((m) => Math.min(m + 1, 10));

    setAnswers(updated);
    setShowQuestion(false);
    setVideoKey((prev) => prev + 1);
    // setTimeout(() => {
    //   if (currentIndex < getReels().length - 1) setCurrentIndex((i) => i + 1);
    // }, 500);
  };

  const handleReaction = (reaction) => {
    const currentReaction = reactions[currentIndex];
    if (currentReaction === reaction) return;

    const updated = { ...reactions };
    if (!currentReaction) {
      if (reaction === "like") setLikeMeter((v) => Math.min(v + 1, 10));
      else setDislikeMeter((v) => Math.min(v + 1, 10));
    } else {
      // reverse previous
      if (currentReaction === "like") setLikeMeter((v) => Math.max(v - 1, 0));
      else setDislikeMeter((v) => Math.max(v - 1, 0));
      // apply new
      if (reaction === "like") setLikeMeter((v) => Math.min(v + 1, 10));
      else setDislikeMeter((v) => Math.min(v + 1, 10));
    }
    updated[currentIndex] = reaction;
    setReactions(updated);
  };

  return (
    <div
      className="flex items-center justify-center w-screen h-screen relative"
      style={backgroundStyle}
    >
      <button
        onClick={() => navigate(location.state?.from, {state: {goToLastSlide: location.state?.goToLastSlide}})}
        className="absolute top-6 left-6 z-50 bg-white bg-opacity-75 hover:bg-opacity-100 text-black text-xl font-bold px-3 py-1 rounded shadow cursor-pointer"
      >
        ← Back
      </button>
      {/* Meter Bars */}
      <div className="absolute top-6 right-30 flex flex-col items-center gap-2">
        <div className="flex gap-2">
          <div className="w-4 h-24 bg-gray-600 rounded overflow-hidden flex flex-col justify-end">
            <div
              className="bg-green-400 rounded-t"
              style={{ height: `${likeMeter * 10}%` }}
            ></div>
          </div>
          <div className="w-4 h-24 bg-gray-600 rounded overflow-hidden flex flex-col justify-end">
            <div
              className="bg-red-400 rounded-t"
              style={{ height: `${dislikeMeter * 10}%` }}
            ></div>
          </div>
        </div>
        <div className="group relative flex flex-col items-center">
          <button className="text-white bg-black/50 hover:bg-black/70 rounded-full px-2 py-0.5 text-sm">
            ℹ️
          </button>
          <div className="absolute mt-8 w-60 text-sm bg-white text-black p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50 text-center">
            Based on your answers and reactions, the AI estimates your cat
            content preference.
          </div>
        </div>
      </div>

      {/* Phone + Buttons */}
      <div className="flex items-center gap-6">
        {/* Phone */}
        <div className="relative w-[320px] h-[680px] rounded-3xl bg-gray-900 shadow-2xl flex flex-col overflow-hidden border-8 border-gray-800">
          <div className="flex-1 bg-black relative">
            {!questionAnswered ? (
              <div className="text-white h-full flex flex-col justify-center items-center text-center px-4">
                <h2 className="text-2xl font-bold mb-4">Do you like cats?</h2>
                <div className="flex gap-4">
                  <button
                    onClick={() => handleInitialAnswer(true)}
                    className="bg-green-400 px-4 py-2 rounded-full font-bold"
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => handleInitialAnswer(false)}
                    className="bg-red-400 px-4 py-2 rounded-full font-bold"
                  >
                    No
                  </button>
                </div>
              </div>
            ) : (
              <>
                {currentReel?.type === "video" ? (
                  <video
                    key={`${currentReel.src}-${videoKey}`}
                    src={currentReel.src}
                    ref={videoRef}
                    autoPlay
                    muted
                    className="w-full h-full object-cover"
                    onEnded={() => {
                      if (!answers[currentIndex]) setShowQuestion(true);
                      else if (videoRef.current) {
                        videoRef.current.currentTime = 0;
                        videoRef.current.play();
                      }
                    }}
                  />
                ) : (
                  <img
                    src={currentReel.src}
                    alt="reel"
                    className="w-full h-full object-cover"
                    onLoad={() => setTimeout(() => setShowQuestion(true), 1500)}
                  />
                )}
                {showQuestion && !answers[currentIndex] && (
                  <div className="absolute bottom-20 w-full px-4 text-center">
                    <p className="text-white font-bold mb-2 bg-black/60 p-2 rounded-xl">
                      {currentReel.question}
                    </p>
                    <div className="flex justify-center gap-6">
                      <button
                        onClick={() => handleFinalAnswer("yes")}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full font-bold"
                      >
                        Yes
                      </button>
                      <button
                        onClick={() => handleFinalAnswer("no")}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full font-bold"
                      >
                        No
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
          <div className="h-[60px] bg-gray-800 flex justify-center items-center">
            <div className="w-12 h-12 bg-gray-600 rounded-full border-4 border-gray-700" />
          </div>
        </div>

        {/* Buttons */}
        {questionAnswered && (
          <div className="flex flex-col gap-3 text-white font-semibold">
            <button
              onClick={() =>
                setCurrentIndex((i) =>
                  Math.max((i - 1 + getReels().length) % getReels().length, 0)
                )
              }
              className="flex items-center gap-2 bg-gray-400 hover:bg-gray-500 p-2 rounded shadow"
            >
              ⬆️ <span className="text-sm">Scroll Up</span>
            </button>
            <button
              onClick={() =>
                setCurrentIndex((i) =>
                  Math.min((i + 1) % getReels().length, getReels().length - 1)
                )
              }
              className="flex items-center gap-2 bg-gray-400 hover:bg-gray-500 p-2 rounded shadow"
            >
              ⬇️ <span className="text-sm">Scroll Down</span>
            </button>
            <button
              onClick={() => handleReaction("like")}
              className={`flex items-center gap-2 p-2 rounded shadow ${
                reactions[currentIndex] === "like"
                  ? "bg-green-600"
                  : "bg-green-500 hover:bg-green-600"
              }`}
            >
              👍 <span className="text-sm">Like</span>
            </button>
            <button
              onClick={() => handleReaction("dislike")}
              className={`flex items-center gap-2 p-2 rounded shadow ${
                reactions[currentIndex] === "dislike"
                  ? "bg-red-600"
                  : "bg-red-500 hover:bg-red-600"
              }`}
            >
              👎 <span className="text-sm">Dislike</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
