import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";

// Topics list
const topics = [
  "Technology",
  "Politics",
  "Health",
  "Memes",
  "Sports",
  "Travel",
  "Gaming",
  "Fashion",
  "Food",
  "Fitness",
  "Spirituality",
  "Education",
  "Science",
  "Finance",
  "Crypto",
  "Environment",
  "Music",
  "Movies",
  "TV Shows",
  "Art",
  "Photography",
  "Startups",
  "AI",
  "Space",
  "Parenting",
  "Self-help",
  "Relationships",
  "Books",
  "News",
  "DIY",
  "History",
  "Mythology",
  "Philosophy",
  "Cars",
  "Pets",
  "Comedy",
  "Makeup",
  "Home Decor",
  "Work Life",
  "Coding",
];

const emojis: Record<string, string> = {
  Technology: "🤖",
  Politics: "🏛️",
  Health: "🍏",
  Memes: "😂",
  Sports: "⚽",
  Travel: "✈️",
  Gaming: "🎮",
  Fashion: "👗",
  Food: "🍔",
  Fitness: "💪",
  Spirituality: "🕉️",
  Education: "🎓",
  Science: "🔬",
  Finance: "💵",
  Crypto: "₿",
  Environment: "🌍",
  Music: "🎵",
  Movies: "🎬",
  "TV Shows": "📺",
  Art: "🎨",
  Photography: "📸",
  Startups: "🚀",
  AI: "🧠",
  Space: "🚀",
  Parenting: "👨‍👩‍👧",
  "Self-help": "💡",
  Relationships: "💞",
  Books: "📚",
  News: "📰",
  DIY: "🛠️",
  History: "🏺",
  Mythology: "🐉",
  Philosophy: "🤔",
  Cars: "🏎️",
  Pets: "🐶",
  Comedy: "🤡",
  Makeup: "💄",
  "Home Decor": "🏠",
  "Work Life": "💼",
  Coding: "💻",
};

function FilterBubble() {
  const bubbleRef = useRef<HTMLDivElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);
  const [activeTopics, setActiveTopics] = useState<Set<string>>(new Set());
  const [floatingButtons, setFloatingButtons] = useState<any[]>([]);
  const [animatedIn, setAnimatedIn] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const bubbleSize = 350;
    const safeRadius = bubbleSize / 2 + 80;
    const pageWidth = window.innerWidth;
    const pageHeight = window.innerHeight;
    const buttonWidth = 120; // estimated width of button
    const buttonHeight = 40; // estimated height

    const placed: { x: number; y: number }[] = [];

    const isOverlapping = (x: number, y: number) => {
      for (const p of placed) {
        const dx = p.x - x;
        const dy = p.y - y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < buttonWidth) return true; // too close
      }
      return false;
    };

    const buttonPositions = topics.map((topic, index) => {
      let x, y;
      let tries = 0;

      do {
        x =
          Math.random() * (pageWidth - buttonWidth * 2) -
          pageWidth / 2 +
          buttonWidth;
        y =
          Math.random() * (pageHeight - buttonHeight * 2) -
          pageHeight / 2 +
          buttonHeight;
        // const dist = Math.sqrt(x * x + y * y);
        tries++;
        if (tries > 100) break; // safety
      } while (Math.sqrt(x * x + y * y) < safeRadius || isOverlapping(x, y));

      placed.push({ x, y });
      return { id: index, topic, x, y };
    });

    setFloatingButtons(buttonPositions);
  }, []);

  const handleClick = (
    topic: string,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    const buttonRect = e.currentTarget.getBoundingClientRect();
    const pageRect = pageRef.current?.getBoundingClientRect();
    const bubbleRect = bubbleRef.current?.getBoundingClientRect();
    if (!bubbleRect || !pageRect) return;

    const start = {
      x: buttonRect.left - pageRect.left,
      y: buttonRect.top - pageRect.top,
    };

    // Random position inside the bubble
    const radius = bubbleRect.width / 2 - 30;
    const angle = Math.random() * 2 * Math.PI;
    const r = Math.sqrt(Math.random()) * radius;

    const end = {
      x:
        bubbleRect.left -
        pageRect.left +
        bubbleRect.width / 2 +
        r * Math.cos(angle) -
        50,
      y:
        bubbleRect.top -
        pageRect.top +
        bubbleRect.height / 2 +
        r * Math.sin(angle) -
        20,
    };

    setAnimatedIn((prev) => [...prev, { id: Date.now(), topic, start, end }]);

    setActiveTopics((prevSet) => new Set(prevSet).add(topic));
    setFloatingButtons((prev) => prev.filter((b) => b.topic !== topic));
  };

  return (
    <div
      ref={pageRef}
      className="relative h-screen w-screen bg-gradient-to-br from-blue-100 to-purple-100 overflow-hidden font-sans"
    >
      {/* Center Bubble */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <div
          ref={bubbleRef}
          className="w-[350px] h-[350px] rounded-full bg-pink-300 border-8 border-white shadow-2xl flex items-center justify-center text-center text-3xl font-bold text-pink-900"
        >
          🫧
          <br />
          Your Bubble
        </div>
      </div>

      {/* Floating Topic Buttons */}
      <div className="absolute inset-0 z-0">
        {floatingButtons.map((btn) => (
          <motion.button
            key={btn.id}
            onClick={(e) => handleClick(btn.topic, e)}
            className="absolute px-4 py-2 rounded-full text-sm font-bold bg-cyan-400 text-white shadow-md hover:scale-105 transition-transform cursor-pointer"
            initial={{ x: btn.x, y: btn.y }}
            animate={{
              x: btn.x + Math.random() * 20 - 10,
              y: btn.y + Math.random() * 20 - 10,
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
            style={{
              left: "50%",
              top: "50%",
            }}
          >
            {emojis[btn.topic] ?? ""} {btn.topic}
          </motion.button>
        ))}
      </div>

      {/* Slide-in Animation to Bubble */}
      <div className="absolute inset-0 pointer-events-none z-20">
        <AnimatePresence>
          {animatedIn.map((b) => (
            <motion.div
              key={b.id}
              className="absolute px-3 py-1 text-sm bg-blue-600 text-white rounded-full shadow-lg"
              initial={{ x: b.start.x, y: b.start.y, opacity: 1 }}
              animate={{ x: b.end.x, y: b.end.y, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            >
              {b.topic}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Next Button */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-30">
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-900 text-white text-xl px-6 py-3 rounded-full shadow-lg hover:bg-blue-600 transition"
        >
          I'm Done! → 🎉
        </button>
      </div>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-2xl p-8 max-w-xl w-[90%] text-center shadow-2xl border-2 border-blue-300">
            <h2 className="text-2xl font-bold mb-3 text-gray-800">
              🎯 You're in a Filter Bubble!
            </h2>

            <p className="text-gray-700 mb-4 font-medium">
              Your selected topics:
            </p>

            <div className="flex flex-wrap justify-center gap-2 mb-6 text-sm">
              {[...activeTopics].map((topic) => (
                <span
                  key={topic}
                  className="px-3 py-1 bg-cyan-100 text-cyan-900 rounded-full border border-cyan-300"
                >
                  {emojis[topic] ?? "🎈"} {topic}
                </span>
              ))}
            </div>

            <p className="text-gray-600 mb-6 italic">
              You’ll only see these topics in your feed — while you missed a
              lot!
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={() =>
                  navigate(location.state?.from, {
                    state: { goToLastSlide: location.state?.goToLastSlide },
                  })
                }
                className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg shadow-md"
              >
                OK, Continue →
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 hover:bg-gray-400 text-black px-5 py-2 rounded-lg shadow"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FilterBubble;
