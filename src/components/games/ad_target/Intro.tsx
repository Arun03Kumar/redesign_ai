import { useLocation, useNavigate } from "react-router-dom";

export default function Intro() {
  const nav = useNavigate();
  const location = useLocation()

  return (
    <div className="absolute inset-0 flex justify-center items-center">
      <div className="bg-white shadow-2xl rounded-3xl p-10 max-w-md w-full text-center border-4 border-purple-300 relative">
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 text-6xl">
          🧠
        </div>
        <h1 className="text-3xl font-bold mb-4 text-purple-700">You're the AI!</h1>
        <p className="text-lg text-gray-700 mb-6">
          Your job is to figure out the best ad to show a person based on what you <span className="font-bold">hear</span> and <span className="font-bold">see</span>!
        </p>
        <button
          onClick={() => nav("/dialogue", {state: {from: location?.state?.from}})}
          className="bg-purple-500 text-white font-bold py-2 px-6 rounded-full hover:bg-purple-600 transition"
        >
          Let&apos;s Start!
        </button>
      </div>
    </div>
  );
}
