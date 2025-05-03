import { useState } from "react";

const reelsYes = [
  {
    type: "video",
    src: "/cats_annoying/cats_annoying1.mp4",
    question: "Was this annoying?",
  },
  {
    type: "video",
    src: "/cats_annoying/cats_annoying2.webm",
    question: "Would this cat drive you crazy?",
  },
  {
    type: "video",
    src: "/cats_annoying/cats_annoying3.mp4",
    question: "Was this cat over the top?",
  },
  {
    type: "video",
    src: "/cats_annoying/cats_annoying4.mp4",
    question: "Would you adopt this troublemaker?",
  },
  {
    type: "video",
    src: "/cats_annoying/cats_annoying5.mp4",
    question: "Was this the most annoying one yet?",
  },
];

const reelsNo = [
  {
    type: "video",
    src: "/cat_cute1.mp4",
    question: "Did you start liking cats?",
  },
  {
    type: "image",
    src: "/cat_cute2.png",
    question: "Was this cat cute enough to pet?",
  },
];

function Cats() {
  const [questionAnswered, setQuestionAnswered] = useState(false);
  const [likesCats, setLikesCats] = useState<boolean | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [followUpAnswered, setFollowUpAnswered] = useState(false);
  const [viewedReels, setViewedReels] = useState<boolean[]>([]);
  const [showQuestionForIndex, setShowQuestionForIndex] = useState<boolean[]>(
    []
  );
  const [awaitingAnswer, setAwaitingAnswer] = useState(false);
  const [replayAfterAnswer, setReplayAfterAnswer] = useState(false);
  const [showFinalFollowUp, setShowFinalFollowUp] = useState(false);
  const [likeMeter, setLikeMeter] = useState(0);
  const [dislikeMeter, setDislikeMeter] = useState(0);
  const [finalFlowComplete, setFinalFlowComplete] = useState(false);
  const [reelReactions, setReelReactions] = useState<
    Record<number, "like" | "dislike" | null>
  >({});

  const handleAnswer = (answer: boolean) => {
    setLikesCats(answer);
    setQuestionAnswered(true);
    const length = answer ? reelsNo.length : reelsYes.length;
    setViewedReels(Array(length).fill(false));
    setShowQuestionForIndex(Array(length).fill(true));
    setReelReactions({});
  };

  const toggleReaction = (type: "like" | "dislike") => {
    const current = reelReactions[currentIndex];
    const updated = { ...reelReactions };

    if (current === type) {
      updated[currentIndex] = null;
      if (type === "like") setLikeMeter((m) => Math.max(m - 1, 0));
      else setDislikeMeter((m) => Math.max(m - 1, 0));
    } else {
      if (current === "like") setLikeMeter((m) => Math.max(m - 1, 0));
      if (current === "dislike") setDislikeMeter((m) => Math.max(m - 1, 0));
      updated[currentIndex] = type;
      if (type === "like") setLikeMeter((m) => Math.min(m + 1, 10));
      if (type === "dislike") setDislikeMeter((m) => Math.min(m + 1, 10));
    }

    setReelReactions(updated);
  };

  const nextReel = () => {
    if (awaitingAnswer || (showFinalFollowUp && !finalFlowComplete)) return;
    setCurrentIndex((prev) => Math.min(prev + 1, getReels().length - 1));
  };

  const prevReel = () => {
    if (awaitingAnswer || (showFinalFollowUp && !finalFlowComplete)) return;
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const getReels = () => (likesCats ? reelsNo : reelsYes);

  return (
    <div className="flex h-screen absolute left-0 top-0 w-screen">
      {/* Left Panel */}
      <div
        className={`relative w-1/2 bg-gray-100 flex items-center justify-center ${
          showFinalFollowUp && !finalFlowComplete
            ? "opacity-20 pointer-events-none"
            : ""
        }`}
      >
        <div className="flex items-center gap-6">
          {/* Phone */}
          <div className="relative w-[300px] h-[600px]">
            <div
              className={`absolute top-0 left-0 w-full h-full z-10 ${
                !questionAnswered ? "opacity-5 pointer-events-none" : ""
              }`}
            >
              <div className="w-full h-full overflow-hidden bg-black rounded-xl">
                {questionAnswered &&
                getReels()[currentIndex]?.type === "video" ? (
                  <video
                    key={`${getReels()[currentIndex].src}-${replayAfterAnswer}`}
                    src={getReels()[currentIndex].src}
                    autoPlay
                    loop={false}
                    muted
                    onEnded={() => {
                      if (
                        !viewedReels[currentIndex] &&
                        showQuestionForIndex[currentIndex]
                      ) {
                        const updated = [...viewedReels];
                        updated[currentIndex] = true;
                        setViewedReels(updated);
                        setAwaitingAnswer(true);
                      }
                    }}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={getReels()[currentIndex].src}
                    alt="reel"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-col items-center gap-4">
            <button
              onClick={prevReel}
              className={`px-4 py-2 pt-4 bg-gray-300 rounded ${
                !questionAnswered ||
                awaitingAnswer ||
                (showFinalFollowUp && !finalFlowComplete)
                  ? "opacity-30 pointer-events-none"
                  : ""
              }`}
            >
              ⬆️
            </button>
            <button
              onClick={nextReel}
              className={`px-4 py-2 pt-4 bg-gray-300 rounded ${
                !questionAnswered ||
                awaitingAnswer ||
                (showFinalFollowUp && !finalFlowComplete)
                  ? "opacity-30 pointer-events-none"
                  : ""
              }`}
            >
              ⬇️
            </button>
            <button
              onClick={() => toggleReaction("like")}
              className={`px-4 py-2 pt-4 rounded ${
                reelReactions[currentIndex] === "like"
                  ? "bg-green-500 text-white font-bold"
                  : "bg-green-300"
              }`}
            >
              👍
            </button>
            <button
              onClick={() => toggleReaction("dislike")}
              className={`px-4 py-2 pt-4 rounded ${
                reelReactions[currentIndex] === "dislike"
                  ? "bg-red-500 text-white font-bold"
                  : "bg-red-300"
              }`}
            >
              👎
            </button>
            {questionAnswered && currentIndex === getReels().length - 1 && (
              <button
                onClick={() => {
                  setCurrentIndex(0);
                  setAwaitingAnswer(false);
                  setShowFinalFollowUp(false);
                  setFinalFlowComplete(true); // Keep next button visible
                }}
                className="mt-4 px-4 py-2 pt-4 bg-blue-300 rounded"
              >
                🔁 Rewatch
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-1/2 p-8 relative flex items-center justify-center">
        {/* Top-right vertical Cat Reaction Meter */}
        {/* Cat Reaction Meter - Top Right */}
        <div className="absolute top-4 right-4 flex items-end gap-2">
          {/* Like Meter */}
          <div className="relative h-32 w-6 bg-gray-700 rounded shadow-md overflow-hidden">
            <div
              className="absolute bottom-0 left-0 w-full transition-all duration-300"
              style={{
                height: `${likeMeter * 10}%`,
                background: "linear-gradient(to top, #34d399, #059669)",
                borderRadius: "0 0 4px 4px",
              }}
            />
          </div>

          {/* Dislike Meter */}
          <div className="relative h-32 w-6 bg-gray-700 rounded shadow-md overflow-hidden">
            <div
              className="absolute bottom-0 left-0 w-full transition-all duration-300"
              style={{
                height: `${dislikeMeter * 10}%`,
                background: "linear-gradient(to top, #f87171, #dc2626)",
                borderRadius: "0 0 4px 4px",
              }}
            />
          </div>
        </div>

        {/* Main Content */}
        {!questionAnswered ? (
          <div className="flex flex-col text-center">
            <h2 className="text-5xl font-bold mb-4">Do you like cats?</h2>
            <div className="flex justify-around">
              <button
                onClick={() => handleAnswer(true)}
                className="mr-4 px-4 py-2 bg-green-400 rounded text-2xl font-bold"
              >
                Yes
              </button>
              <button
                onClick={() => handleAnswer(false)}
                className="px-4 py-2 bg-red-400 rounded text-2xl font-bold"
              >
                No
              </button>
            </div>
          </div>
        ) : awaitingAnswer ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">
              {getReels()[currentIndex].question}
            </h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  const updated = [...showQuestionForIndex];
                  updated[currentIndex] = false;
                  setShowQuestionForIndex(updated);
                  setAwaitingAnswer(false);
                  setReplayAfterAnswer((r) => !r);
                  setLikeMeter((v) => Math.min(v + 1, 10));
                  if (currentIndex === getReels().length - 1)
                    setShowFinalFollowUp(true);
                }}
                className="px-4 py-2 bg-green-400 rounded text-xl font-bold"
              >
                Yes
              </button>
              <button
                onClick={() => {
                  const updated = [...showQuestionForIndex];
                  updated[currentIndex] = false;
                  setShowQuestionForIndex(updated);
                  setAwaitingAnswer(false);
                  setReplayAfterAnswer((r) => !r);
                  setDislikeMeter((v) => Math.min(v + 1, 10));
                  if (currentIndex === getReels().length - 1)
                    setShowFinalFollowUp(true);
                }}
                className="px-4 py-2 bg-red-400 rounded text-xl font-bold"
              >
                No
              </button>
            </div>
          </div>
        ) : showFinalFollowUp && !followUpAnswered ? (
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">
              {likesCats
                ? "Do you still like cats?"
                : "Did you start liking cats?"}
            </h2>
            <div className="flex justify-around">
              <button
                onClick={() => {
                  setFollowUpAnswered(true);
                  setFinalFlowComplete(true);
                }}
                className="px-4 py-2 bg-green-400 rounded text-xl font-bold"
              >
                Yes
              </button>
              <button
                onClick={() => {
                  setFollowUpAnswered(true);
                  setFinalFlowComplete(true);
                }}
                className="px-4 py-2 bg-red-400 rounded text-xl font-bold"
              >
                No
              </button>
            </div>
          </div>
        ) : (
          finalFlowComplete && (
            <div className="text-center w-full">
              <button
                onClick={() => (window.location.href = "/next-page")}
                className="mt-6 px-6 py-2 bg-blue-500 text-white rounded text-lg font-bold"
              >
                Next →
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default Cats;
