import { useNavigate } from "react-router-dom";
import { useBackground } from "../context/BackgroundContext";

export default function InteractiveModePage() {
  const navigate = useNavigate();
  const { background } = useBackground();
  const backgroundStyle = background.type === "gradient"
    ? { background: `linear-gradient(to bottom right, ${background.from}, ${background.to})` }
    : { backgroundImage: `url(${background.url})`, backgroundSize: 'cover', backgroundPosition: 'center' };

  return (
    <div className="absolute left-0 top-0 w-screen h-screen flex items-center justify-center text-black" style={backgroundStyle}>
      <div className="text-center space-y-12">
        <h1 className="text-5xl font-bold tracking-wide drop-shadow-lg animate-bounce">
          Choose Your Interactive Quest
        </h1>
        <div className="grid grid-cols-2 gap-6 max-w-2xl mx-auto p-4">
          <button
            className="bg-yellow-500 hover:bg-yellow-600 text-white text-lg font-semibold py-4 px-8 rounded-2xl shadow-xl transition transform hover:scale-105 cursor-pointer"
            onClick={() => navigate("/game/cats", { state: { from: "/interactive-app-mode" } })}
          >
            🧠 AI Manipulation
          </button>
          <button
            className="bg-pink-500 hover:bg-pink-600 text-white text-lg font-semibold py-4 px-8 rounded-2xl shadow-xl transition transform hover:scale-105 cursor-pointer"
            onClick={() => navigate("/game/filter_bubble", { state: { from: "/interactive-app-mode" } })}
          >
            🎈 Filter Bubble
          </button>
          <button
            className="bg-green-500 hover:bg-green-600 text-white text-lg font-semibold py-4 px-8 rounded-2xl shadow-xl transition transform hover:scale-105 cursor-pointer"
            onClick={() => navigate("/game/social_media")}
          >
            🛠️ Redesign Social App
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white text-lg font-semibold py-4 px-8 rounded-2xl shadow-xl transition transform hover:scale-105 cursor-pointer"
            onClick={() => navigate("/game/ad")}
          >
            🎨 Ad Crafter
          </button>
        </div>
      </div>
    </div>
  );
}