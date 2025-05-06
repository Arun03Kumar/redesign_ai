import React, { useState, useRef, useEffect, forwardRef } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import update from "immutability-helper";
import {
  FaThumbsUp,
  FaThumbsDown,
  FaCommentAlt,
  FaNewspaper,
  FaRobot,
  FaCog,
  FaHome,
  FaArrowLeft,
} from "react-icons/fa";
import { useBackground } from "../../../context/BackgroundContext";
import { useNavigate } from "react-router-dom";

const COMPONENTS = [
  { id: "like", label: "Like", icon: <FaThumbsUp size={16} /> },
  { id: "dislike", label: "Dislike", icon: <FaThumbsDown size={16} /> },
  { id: "comment", label: "Comment", icon: <FaCommentAlt size={16} /> },
  { id: "feed", label: "Feed", icon: <FaNewspaper size={16} /> },
  { id: "settings", label: "Settings", icon: <FaCog size={16} /> },
  { id: "ai", label: "AI Recommend", icon: <FaRobot size={16} /> },
];

const AI_FEATURES = [
  "Third Party Audits",
  "Facial Data Capture",
  "Mental Health Support",
  "Geo-Targeted Ads",
  "Open Source Algorithms",
  "Addiction Resistance System",
  "Algorithmic Explainability",
  "Screen Time Management",
  "Ethical AI Recommendations",
  "User Control Panel",
  "Diverse Content Promotion",
  "Cultural Sensitivity Checks",
  "User Benefit Analysis",
  "Privacy First Design",
  "Dopamine Trigger AI",
  "Transparency Dashboard",
  "Accessibility Features",
  "Data Ownership Controls",
  "Sponsored Content",
  "Consent-Based Tracking",
  "Community Guidelines Enforcement",
  "Gamified Rewards",
  "Message Scan AI",
  "Anonymous Usage Mode",
  "Positive Reinforcement",
  "Engagement Tracking",
  "Filter Bubble Reinforcement",
  "Bias Monitoring",
  "Watch Time Tracking",
  "Auto Play Hook",
  "Friends Graph Learning",
  "Educational Content Boost",
  "Basic AI Recommendations",
  "Personal Info Usage",
  "Emotional Balance Feed",
  "Fact Checking System",
  "Age-Appropriate Filtering",
  "Likes Based Content",
  "Location Data",
  "Targeted Ads",
  "Search History",
  "Attention Engine",
  "Behavioral Notifications",
  "Digital Wellbeing Tools",
  "Sad Emotion Feed",
  "Activity Tracking",
  "Hashtag Personalization",
  "Recommender System",
  "AI Search Suggestion",
  "Trend Surfacing",
  "Sentiment Analysis",
  "Like Bias Training",
  "Dislike Bias Training",
];

const AI_FEATURE_SCORES: Record<string, number> = {
  "Third Party Audits": 6,
  "Facial Data Capture": -9,
  "Mental Health Support": 9,
  "Geo-Targeted Ads": -6,
  "Open Source Algorithms": 5,
  "Addiction Resistance System": 8,
  "Algorithmic Explainability": 5,
  "Screen Time Management": 4,
  "Ethical AI Recommendations": 7,
  "User Control Panel": 7,
  "Diverse Content Promotion": 6,
  "Cultural Sensitivity Checks": 5,
  "User Benefit Analysis": 6,
  "Privacy First Design": 8,
  "Dopamine Trigger AI": -7,
  "Transparency Dashboard": 8,
  "Accessibility Features": 6,
  "Data Ownership Controls": 7,
  "Sponsored Content": -4,
  "Consent-Based Tracking": 3,
  "Community Guidelines Enforcement": 5,
  "Gamified Rewards": -3,
  "Message Scan AI": -5,
  "Anonymous Usage Mode": 4,
  "Positive Reinforcement": 4,
  "Engagement Tracking": -3,
  "Filter Bubble Reinforcement": -7,
  "Bias Monitoring": 6,
  "Watch Time Tracking": -3,
  "Auto Play Hook": -4,
  "Friends Graph Learning": -4,
  "Educational Content Boost": 5,
  "Basic AI Recommendations": -2,
  "Personal Info Usage": -8,
  "Emotional Balance Feed": 6,
  "Fact Checking System": 5,
  "Age-Appropriate Filtering": 5,
  "Likes Based Content": -2,
  "Location Data": -7,
  "Targeted Ads": -8,
  "Search History": -4,
  "Attention Engine": -6,
  "Behavioral Notifications": -3,
  "Digital Wellbeing Tools": 7,
  "Sad Emotion Feed": -5,
  "Activity Tracking": -3,
  "Hashtag Personalization": -3,
  "Recommender System": -2,
  "AI Search Suggestion": -2,
  "Trend Surfacing": 1,
  "Sentiment Analysis": 3,
  "Like Bias Training": 4,
  "Dislike Bias Training": 4,
};

const ItemTypes = {
  COMPONENT: "component",
  AI_FEATURE: "ai_feature",
};

// import { forwardRef } from 'react';
// import { useDrag } from 'react-dnd';

interface DraggableItemProps {
  item: any;
  draggable?: boolean;
  type?: string;
  isUsed?: boolean;
}

const DraggableItem = forwardRef<HTMLDivElement, DraggableItemProps>(
  ({ item, draggable = true, type, isUsed }, ref) => {
    const [{ isDragging }, dragRef] = useDrag(() => ({
      type: type || "component",
      item: { ...item, source: "toolbox" },
      canDrag: () => draggable && !isUsed,
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }));

    // Merge DnD ref with forwarded ref
    const combinedRef = (node: HTMLDivElement) => {
      dragRef(node);
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLDivElement>).current = node;
      }
    };

    return (
      <div
        ref={combinedRef}
        className={`w-24 h-24 ${
          isUsed ? "bg-green-300 border-green-600" : "bg-white border-blue-200"
        } rounded-2xl flex flex-col items-center justify-center shadow-lg cursor-${
          draggable && !isUsed ? "grab" : "default"
        } transition-all hover:scale-105 active:scale-95 border-2 ${
          isDragging ? "opacity-50" : ""
        }`}
      >
        <span className="text-2xl mb-1">{item.icon}</span>
        <span className="text-sm font-bold text-center px-1">{item.label}</span>
      </div>
    );
  }
);

// export default DraggableItem;

function DraggablePlacedItem({
  item,
  resizeItem,
  onDropAIFeature,
  selectedAIFeatures,
}: any) {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: ItemTypes.COMPONENT,
    item: { ...item, source: "canvas" },
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  }));

  const [{ isOver }, dropRef] = useDrop({
    accept: ItemTypes.AI_FEATURE,
    drop: (droppedItem: any) => {
      if (onDropAIFeature && !selectedAIFeatures.includes(droppedItem.label)) {
        onDropAIFeature(droppedItem.label);
      }
    },
    collect: (monitor) => ({ isOver: monitor.isOver() }),
  });

  const ref = useRef<any>(null);
  const isFeed = item.id === "feed";
  const isAI = item.id === "ai";

  useEffect(() => {
    if (!isFeed) return;
    const handleMouseMove = (e: any) => {
      if (!ref.current?.dataset?.resizing) return;
      const newW = e.clientX - ref.current.getBoundingClientRect().left;
      const newH = e.clientY - ref.current.getBoundingClientRect().top;
      resizeItem(item.uuid, { width: newW, height: newH });
    };
    const stopResize = () => {
      if (ref.current) ref.current.dataset.resizing = "";
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", stopResize);
    };
    window.addEventListener("mouseup", stopResize);
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mouseup", stopResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [item, resizeItem]);

  const startResize = () => {
    if (ref.current) ref.current.dataset.resizing = "true";
  };
  if (isAI) dragRef(dropRef(ref));
  else dragRef(ref);

  return (
    <div
      ref={ref}
      className="absolute bg-white border rounded shadow text-xs flex items-center justify-center cursor-move"
      style={{
        top: item.y,
        left: item.x,
        width: item.width || 60,
        height: item.height || 40,
        opacity: isDragging ? 0.5 : 1,
        backgroundColor: isOver ? "#f0fff0" : "white",
      }}
    >
      <div className="w-full h-full relative flex flex-col items-center justify-center">
        {item.icon}
        {isAI && (
          <div className="text-xs overflow-auto p-1">
            {selectedAIFeatures.map((f: string) => (
              <div key={f} className="truncate">
                {f}
              </div>
            ))}
          </div>
        )}
        {isFeed && (
          <div
            onMouseDown={startResize}
            className="absolute bottom-0 right-0 w-3 h-3 bg-blue-500 cursor-nwse-resize"
          />
        )}
      </div>
    </div>
  );
}

function DropPhone({
  items,
  addItem,
  moveItem,
  resizeItem,
  selectedAIFeatures,
  onDropAIFeature,
}: any) {
  const phoneRef = useRef<any>(null);
  const [, drop] = useDrop({
    accept: ItemTypes.COMPONENT,
    drop: (item: any, mon) => {
      const offset: any = mon.getSourceClientOffset();
      const rect = phoneRef.current.getBoundingClientRect();
      const x = offset.x - rect.left,
        y = offset.y - rect.top;
      if (item.source === "toolbox")
        addItem({ ...item, x, y, width: 60, height: 40, uuid: Date.now() });
      else moveItem(item.uuid, { x, y });
    },
  });

  return (
    <div
      ref={phoneRef}
      className="w-64 h-[480px] border-4 border-black rounded-[2rem] bg-white relative"
    >
      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 h-4 w-24 bg-gray-300 rounded-full"></div>
      <div
        ref={(node) => {
          phoneRef.current = node;
          drop(node);
        }}
        className="absolute inset-0"
      >
        {items.map((i: any) => (
          <DraggablePlacedItem
            key={i.uuid}
            item={i}
            resizeItem={resizeItem}
            onDropAIFeature={i.id === "ai" ? onDropAIFeature : undefined}
            selectedAIFeatures={selectedAIFeatures}
            moveItem={moveItem}
          />
        ))}
      </div>
    </div>
  );
}

function Social() {
  const [placedItems, setPlacedItems] = useState<any[]>([]);
  const [selectedAIFeatures, setSelectedAIFeatures] = useState<string[]>([]);
  const navigate = useNavigate();
  const { background } = useBackground();
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

  const addItem = (i: any) => setPlacedItems((prev) => [...prev, i]);
  const handleAIFeatureDrop = (f: string) => {
    if (!selectedAIFeatures.includes(f))
      setSelectedAIFeatures((prev) => [...prev, f]);
  };
  const moveItem = (uuid: number, pos: any) => {
    const idx = placedItems.findIndex((i) => i.uuid === uuid);
    if (idx >= 0) {
      setPlacedItems(update(placedItems, { [idx]: { $merge: pos } }));
    }
  };
  const resizeItem = (uuid: number, size: any) => {
    const idx = placedItems.findIndex((i) => i.uuid === uuid);
    if (idx >= 0) {
      setPlacedItems(update(placedItems, { [idx]: { $merge: size } }));
    }
  };

  // compute used flags
  const usedComponents = COMPONENTS.map((c) =>
    placedItems.some((i) => i.id === c.id)
  );

  const totalScore = selectedAIFeatures.reduce(
    (sum, f) => sum + (AI_FEATURE_SCORES[f] || 0),
    0
  );
  const MAX_TOTAL = Object.values(AI_FEATURE_SCORES).reduce(
    (s, n) => s + (n > 0 ? n : 0),
    0
  );
  const MIN_TOTAL = Object.values(AI_FEATURE_SCORES).reduce(
    (s, n) => s + (n < 0 ? n : 0),
    0
  );
  const positivePercentage = Math.min(
    (Math.max(totalScore, 0) / MAX_TOTAL) * 100,
    100
  );
  const negativePercentage = Math.min(
    (Math.abs(Math.min(totalScore, 0)) / Math.abs(MIN_TOTAL)) * 100,
    100
  );

  const getScoreEmoji = (score: number) => {
    const pos70 = MAX_TOTAL * 0.7;
    const neg70 = MIN_TOTAL * 0.7;
    if (score >= pos70) return "🚀";
    if (score >= pos70 * 0.5) return "🎉";
    if (score >= 0) return "😊";
    if (score >= neg70) return "😕";
    return "😱";
  };
  const getScoreMessage = (score: number) => {
    const pos70 = MAX_TOTAL * 0.7;
    const neg70 = MIN_TOTAL * 0.7;
    if (score >= pos70) return "Wow! You're a Super Designer! 🌟";
    if (score >= pos70 * 0.5) return "Great Job! Keep Going! 💪";
    if (score >= 0) return "Good Start! Add More Green! 🌱";
    if (score >= neg70) return "Uh-oh! Let's Fix This! 🛠️";
    return "Red Alert! Needs More Care! 🚨";
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div
        className="flex h-screen w-screen overflow-hidden text-gray-900 absolute left-0 top-0 font-comic"
        style={backgroundStyle}
      >
        <div className="w-1/4 backdrop-blur-3xl shadow-xl p-4 flex flex-col rounded-r-2xl border-4 border-white">
          <h2 className="text-2xl font-bold mb-4 text-purple-600 drop-shadow-sm flex items-center gap-2">
            🎨 Magic Tools
          </h2>
          <div className="flex flex-wrap gap-3 justify-center mb-4">
            {COMPONENTS.map((c, i) => (
              <DraggableItem
                key={c.id}
                item={{ ...c, icon: React.cloneElement(c.icon, { size: 24 }) }}
                isUsed={usedComponents[i]}
              />
            ))}
          </div>
          <hr className="w-full border-2 border-white my-3" />
          <h3 className="text-xl font-bold mb-3 text-blue-600 flex items-center gap-2">
            🤖 Super Powers
          </h3>
          <div className="overflow-y-auto h-full flex flex-wrap gap-2 justify-center pr-2">
            {AI_FEATURES.map((label) => (
              <DraggableItem
                key={label}
                item={{ id: label.toLowerCase().replace(/\s+/g, "_"), label }}
                draggable={!selectedAIFeatures.includes(label)}
                type={ItemTypes.AI_FEATURE}
                isUsed={selectedAIFeatures.includes(label)}
              />
            ))}
          </div>
        </div>
        <div className="w-2/4 backdrop-blur-xl flex items-center justify-center p-8">
          <DropPhone
            items={placedItems}
            addItem={addItem}
            moveItem={moveItem}
            resizeItem={resizeItem}
            selectedAIFeatures={selectedAIFeatures}
            onDropAIFeature={handleAIFeatureDrop}
          />
        </div>
        <div className="w-1/4 shadow-inner p-4 flex flex-col items-center justify-center rounded-l-2xl border-4 border-white">
          <h2 className="text-2xl font-bold mb-4 text-white-700 flex items-center gap-2">
            🌈 Fun Meter
          </h2>
          <div className="w-full mb-4 relative h-16 bg-white rounded-2xl overflow-hidden border-4 border-yellow-400">
            {/* Pivot line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-2 bg-yellow-400 transform -translate-x-1/2" />

            {/* Positive bar from center rightward */}
            {positivePercentage > 0 && (
              <div
                className="absolute h-full bg-green-400 transition-all duration-500"
                style={{
                  width: `${positivePercentage}%`,
                  left: "50%",
                }}
              />
            )}

            {/* Negative bar from center leftward */}
            {negativePercentage > 0 && (
              <div
                className="absolute h-full bg-red-400 transition-all duration-500"
                style={{
                  width: `${negativePercentage}%`,
                  right: "50%",
                }}
              />
            )}

            {/* Score indicator */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white px-4 py-1 rounded-full border-2 border-purple-500 shadow-md">
                <span className="font-bold text-2xl text-purple-600">
                  {totalScore}{" "}
                  <span className="ml-2">{getScoreEmoji(totalScore)}</span>
                </span>
              </div>
            </div>
          </div>
          <p className="text-lg text-center px-2 font-semibold bg-white rounded-lg p-2 border-2 border-blue-300">
            {getScoreMessage(totalScore)}
          </p>
          <div className="mt-4 w-full flex justify-center">
            <div className="bg-white p-2 rounded-lg border-2 border-red-300">
              <span className="text-sm">🌟 Pro Tip:</span>
              <p className="text-xs">
                Add more green powers to make friends happy!
              </p>
            </div>
          </div>
          <div className="flex justify-center gap-4 mb-4 pt-80">
            <button
              onClick={() => navigate("/")}
              className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded shadow flex items-center gap-2 cursor-pointer"
            >
              <FaHome size={16} />
              Home
            </button>
            <button
              onClick={() => navigate("/interactive-app-mode")}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow flex items-center gap-2 cursor-pointer"
            >
              <FaArrowLeft size={16} />
              Back
            </button>
          </div>
        </div>
      </div>
    </DndProvider>
  );
}

export default Social;
