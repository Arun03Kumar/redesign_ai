import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Bubble from "./Bubble";

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

function FilterBubble() {
  const bubbleRef = useRef<HTMLDivElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);
  const [bubbles, setBubbles] = useState<any[]>([]);
  const [activeTopics, setActiveTopics] = useState<Set<string>>(new Set());

  const handleClick = (
    topic: string,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    const buttonRect = e.currentTarget.getBoundingClientRect();
    const bubbleRect = bubbleRef.current?.getBoundingClientRect();
    const pageRect = pageRef.current?.getBoundingClientRect();
    if (!bubbleRect || !pageRect) return;

    const start = {
      x: buttonRect.left - pageRect.left,
      y: buttonRect.top - pageRect.top,
    };

    const radius = 150;

    const end = {
      x:
        bubbleRect.left -
        pageRect.left +
        bubbleRect.width / 2 +
        Math.random() * radius * 2 -
        radius,
      y:
        bubbleRect.top -
        pageRect.top +
        bubbleRect.height / 2 +
        Math.random() * radius * 2 -
        radius,
    };

    setBubbles((prev) => {
      const isActive = activeTopics.has(topic);

      if (isActive) {
        // Remove this topic
        setActiveTopics((prevSet) => {
          const newSet = new Set(prevSet);
          newSet.delete(topic);
          return newSet;
        });
        return prev.filter((b) => b.topic !== topic);
      } else {
        // Add this topic
        setActiveTopics((prevSet) => new Set(prevSet).add(topic));
        return [...prev, { id: Date.now(), topic, start, end }];
      }
    });
  };

  return (
    <div
      ref={pageRef}
      className="flex h-screen w-screen absolute left-0 top-0 overflow-hidden bg-white/10 backdrop-blur-lg"
    >
      {/* Floating Bubbles Layer */}
      <div className="fixed inset-0 pointer-events-none z-50">
        <AnimatePresence>
          {bubbles.map((b) => (
            <motion.div
              key={b.topic}
              className="absolute bg-white text-xs px-2 py-1 rounded shadow-md float"
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

      {/* Left Panel with Bubble */}
      <div className="w-1/2 flex items-center justify-center relative bg-white/20 backdrop-blur-md border-r border-white/30">
        <div ref={bubbleRef}>
          <Bubble />
        </div>
      </div>

      {/* Right Panel with Buttons */}
      <div className="w-1/2 p-10 flex flex-wrap gap-4 content-center justify-center">
        <h2 className="w-full text-center text-6xl font-bold mb-4">
          Choose Your Interests
        </h2>
        {topics.map((topic) => (
          <button
            key={topic}
            onClick={(e) => handleClick(topic, e)}
            className={`px-4 py-2 rounded shadow-md transition text-2xl ${
              activeTopics.has(topic)
                ? "bg-red-600 text-white"
                : "bg-green-600 text-white hover:bg-green-800"
            }`}
          >
            {topic}
          </button>
        ))}
        <div className="w-full mt-10 flex justify-center">
          <button
            onClick={() => (window.location.href = "/next-page")}
            className="bg-blue-600 text-white px-6 py-3 text-2xl rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}

export default FilterBubble;
