import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();
  return (
    <div className="absolute left-0 top-0 w-screen h-screen text-black flex justify-center items-center">
      <div className="text-center space-y-10">
        <h1 className="text-5xl font-bold drop-shadow-lg animate-bounce">
          Welcome to AI Adventures!
        </h1>
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white text-2xl font-semibold py-4 px-8 rounded-2xl shadow-lg transition transform hover:scale-105 cursor-pointer"
            onClick={() => navigate("/landing-page")}
          >
            📖 Story Mode
          </button>
          <button
            className="bg-green-600 hover:bg-green-700 text-white text-2xl font-semibold py-4 px-8 rounded-2xl shadow-lg transition transform hover:scale-105 cursor-pointer"
            onClick={() => navigate("/interactive-app-mode")}
          >
            🕹️ Interactive Mode
          </button>
        </div>
      </div>
    </div>
  );
}
