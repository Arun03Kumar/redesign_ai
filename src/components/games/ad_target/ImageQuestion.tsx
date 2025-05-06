// ImageQuestionScene.js
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const imageOptions = [
  { id: 1, text: "An ad for acoustic guitars" },
  { id: 2, text: "An ad for hiking backpacks" },
  { id: 3, text: "An ad for professional studio sound box" }, // Correct option
  { id: 4, text: "An ad for painting supplies" },
  { id: 5, text: "An ad for dance shoes" },
  { id: 6, text: "An ad for photography equipment" },
  { id: 7, text: "An ad for cooking utensils" },
];

export default function ImageQuestion() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [showModal, setShowModal] = useState(false);
  const nav = useNavigate();
  const location = useLocation()

  const handleOptionSelect = (optionId) => {
    setSelectedOption(optionId);

    if (optionId === 1) {
      setFeedback(
        "🎉 Perfect choice! Studio headphones match the musical theme!"
      );
    } else {
      setFeedback(
        "🤔 Not quite right. Consider the musical context in the image."
      );
    }
  };

  const resetSelection = () => {
    setSelectedOption(null);
    setFeedback("");
  };

  const handleNext = () => {
    console.log(location)
    if(location?.state?.from == "/product_buy") {
        nav(location?.state?.from, {state: {
            goToLastSlide: true
        }})
    }
    else {
        nav("/interactive-app-mode")
    }
  }

  return (
    <div className="absolute inset-0 bg-gradient-to-br from-sky-200 to-emerald-100 flex flex-col items-center p-8">
      {/* Background Shapes */}
      <div className="absolute inset-0 flex justify-between items-end px-8 opacity-50">
        <div className="w-32 h-48 bg-green-600 rounded-t-full shadow-lg" />
        <div className="w-24 h-40 bg-green-500 rounded-t-full shadow-lg" />
        <div className="w-28 h-44 bg-green-600 rounded-t-full shadow-lg" />
      </div>

      <div className="relative z-10 flex-1 flex flex-col justify-center w-full max-w-3xl items-center">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Alex Just Liked this image.
        </h2>
        <div className="mb-8">
          <img
            src="/guitar.jpg"
            alt="person with guitar"
            className="max-w-full h-auto rounded-xl shadow-lg"
            style={{ maxWidth: "500px" }}
          />
        </div>

        <div className="mt-8 flex justify-center gap-4 w-full">
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full shadow"
          >
            Craft Ad
          </button>
          {selectedOption && (
            <button
              onClick={handleNext}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-full shadow"
            >
              Next
            </button>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-6 text-center">Craft an Ad</h2>
            <p className="text-center mb-6">
              Based on the image Alex liked, which product ad should we show?
            </p>

            <div className="space-y-3">
              {imageOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleOptionSelect(option.id)}
                  className={`w-full px-4 py-3 rounded-lg text-left ${
                    selectedOption === option.id
                      ? "bg-blue-100 border border-blue-300"
                      : "hover:bg-gray-50"
                  }`}
                >
                  {option.text}
                </button>
              ))}
            </div>

            {feedback && (
              <div className="mt-6 p-4 rounded-lg text-center text-xl font-bold">
                {feedback}
              </div>
            )}

            <div className="flex justify-between mt-4">
              <button
                onClick={resetSelection}
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full"
              >
                Reset
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-full"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
