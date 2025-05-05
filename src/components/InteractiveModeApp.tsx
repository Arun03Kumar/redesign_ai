import { useNavigate } from "react-router-dom";

export default function InteractiveModePage() {
  const navigate = useNavigate();
  return (
    <div className="absolute left-0 top-0 w-screen h-screen flex items-center justify-center bg-gradient-to-br from-indigo-800 via-purple-600 to-pink-400 text-white">
      <div className="text-center space-y-12">
        <h1 className="text-4xl font-bold tracking-wide drop-shadow-lg">
          Choose Your Interactive Quest
        </h1>
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
          <button
            className="bg-yellow-500 hover:bg-yellow-600 text-white text-lg font-semibold py-4 px-8 rounded-2xl shadow-xl transition transform hover:scale-105 cursor-pointer"
            onClick={() => navigate("/game/cats")}
          >
            🧠 AI Manipulation
          </button>
          <button
            className="bg-pink-500 hover:bg-pink-600 text-white text-lg font-semibold py-4 px-8 rounded-2xl shadow-xl transition transform hover:scale-105 cursor-pointer"
            onClick={() => navigate("/game/filter_bubble")}
          >
            🎈 Filter Bubble
          </button>
          <button
            className="bg-green-500 hover:bg-green-600 text-white text-lg font-semibold py-4 px-8 rounded-2xl shadow-xl transition transform hover:scale-105 cursor-pointer"
            onClick={() => navigate("/game/social_media")}
          >
            🛠️ Redesign Social App
          </button>
        </div>
      </div>
    </div>
  );
}
