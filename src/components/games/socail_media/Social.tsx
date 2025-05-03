import { useState, useRef, useEffect } from "react";
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
} from "react-icons/fa";

const COMPONENTS = [
  { id: "like", label: "Like", icon: <FaThumbsUp size={16} /> },
  { id: "dislike", label: "Dislike", icon: <FaThumbsDown size={16} /> },
  { id: "comment", label: "Comment", icon: <FaCommentAlt size={16} /> },
  { id: "feed", label: "Feed", icon: <FaNewspaper size={16} /> },
  { id: "settings", label: "Settings", icon: <FaCog size={16} /> },
  { id: "ai", label: "AI Recommend", icon: <FaRobot size={16} /> },
];

const AI_FEATURES: any = [
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

const AI_FEATURE_SCORES: any = {
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

function DraggableItem({ item, draggable = true, type, isSelected }: any) {
  const [{ isDragging }, dragRef] = useDrag<any, void, {isDragging: any}>(
    () => ({
      type: type || ItemTypes.COMPONENT,
      item: { ...item, source: "toolbox" },
      canDrag: () => draggable,
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [draggable, type]
  );

  return (
    <div
      ref={(node) => {dragRef(node)}}
      className={`w-22 h-22 ${
        isSelected ? "bg-green-200" : "bg-gray-100"
      } hover:bg-gray-200 rounded-lg flex items-center justify-center shadow-md cursor-${
        draggable ? "grab" : "default"
      } ${isDragging ? "opacity-50" : ""}`}
    >
      {item.icon || <span className="text-lg text-center">{item.label}</span>}
    </div>
  );
}

function DraggablePlacedItem({
  item,
  resizeItem,
  onDropAIFeature,
  selectedAIFeatures,
}: any) {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: ItemTypes.COMPONENT,
    item: { ...item, source: "canvas" },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [{ isOver }, dropRef] = useDrop({
    accept: ItemTypes.AI_FEATURE,
    drop: (droppedItem: any) => {
      if (onDropAIFeature && !selectedAIFeatures.includes(droppedItem.label)) {
        onDropAIFeature(droppedItem.label);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const ref = useRef<any>(null);
  const isFeed = item.id === "feed";
  const isAI = item.id === "ai";

  useEffect(() => {
    if (!isFeed) return;
    const handleMouseMove = (e: any) => {
      if (!ref?.current?.dataset?.resizing) return;
      const newWidth = e.clientX - ref?.current?.getBoundingClientRect().left;
      const newHeight = e.clientY - ref?.current?.getBoundingClientRect().top;
      resizeItem(item.uuid, { width: newWidth, height: newHeight });
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

  // Combine drag and drop refs for AI component
  if (isAI) {
    dragRef(dropRef(ref));
  } else {
    dragRef(ref);
  }

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
            {selectedAIFeatures.map((feature: any) => (
              <div key={feature} className="truncate">
                {feature}
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

  const [, drop] = useDrop<any>({
    accept: ItemTypes.COMPONENT,
    drop: (item, monitor) => {
      const offset: any = monitor.getSourceClientOffset();
      const phoneRect = phoneRef?.current?.getBoundingClientRect();

      const x = offset.x - phoneRect.left;
      const y = offset.y - phoneRect.top;

      if (item?.source === "toolbox") {
        addItem({
          ...item,
          x,
          y,
          width: 60,
          height: 40,
          uuid: Date.now(),
          container: phoneRect,
        });
      } else {
        moveItem(item?.uuid, { x, y });
      }
    },
  });

  return (
    <div
      ref={phoneRef}
      className="w-64 h-[480px] border-4 border-black rounded-[2rem] bg-white relative"
    >
      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 h-4 w-24 bg-gray-300 rounded-full"></div>
      <div ref={(node) => {drop(node)}} className="absolute inset-0">
        {items.map((item: any) => (
          <DraggablePlacedItem
            key={item.uuid}
            item={item}
            moveItem={moveItem}
            resizeItem={resizeItem}
            onDropAIFeature={item.id === "ai" ? onDropAIFeature : undefined}
            selectedAIFeatures={selectedAIFeatures}
          />
        ))}
      </div>
    </div>
  );
}

function Social() {
  const [placedItems, setPlacedItems] = useState<any>([]);
  const [selectedAIFeatures, setSelectedAIFeatures] = useState<any>([]);

  const addItem = (item: any) => setPlacedItems((prev: any) => [...prev, item]);

  const handleAIFeatureDrop = (feature: any) => {
    if (!selectedAIFeatures.includes(feature)) {
      setSelectedAIFeatures((prev: any) => [...prev, feature]);
    }
  };

  const moveItem = (uuid: any, pos: any) => {
    const index = placedItems.findIndex((i: any) => i?.uuid === uuid);
    if (index >= 0) {
      const updated = update(placedItems, {
        [index]: { $merge: pos },
      });
      setPlacedItems(updated);
    }
  };

  const resizeItem = (uuid: any, size: any) => {
    const index = placedItems.findIndex((i: any) => i.uuid === uuid);
    if (index >= 0) {
      const updated = update(placedItems, {
        [index]: { $merge: size },
      });
      setPlacedItems(updated);
    }
  };

  const totalScore = selectedAIFeatures.reduce(
    (sum: any, feature: any) => sum + (AI_FEATURE_SCORES[feature] || 0),
    0
  );

  const MAX = 134;
  const MIN = -111;
  // const RANGE = MAX - MIN; // = 245
  // const percent = ((totalScore - MIN) / RANGE) * 100;

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex h-screen w-screen overflow-hidden bg-gradient-to-br from-white to-slate-100 text-gray-900 absolute left-0 top-0">
        {/* Left Panel */}
        <div className="w-1/4 bg-white shadow-lg p-4 flex flex-col">
          <h2 className="text-xl font-bold">Toolbox</h2>
          <div className="flex flex-wrap gap-2 justify-center mb-4">
            {COMPONENTS.map((c) => (
              <DraggableItem key={c.id} item={c} />
            ))}
          </div>
          <hr className="w-full border-gray-300 my-2" />
          <h3 className="text-lg font-semibold mb-2">AI Features</h3>
          <div className="overflow-y-auto h-full flex flex-wrap gap-2 justify-center pr-2">
            {AI_FEATURES.map((label: any) => (
              <DraggableItem
                key={label}
                item={{ id: label.toLowerCase().replace(/\s+/g, "_"), label }}
                draggable={true}
                type={ItemTypes.AI_FEATURE}
                isSelected={selectedAIFeatures.includes(label)}
              />
            ))}
          </div>
        </div>

        {/* Center Panel */}
        <div className="w-2/4 bg-blue-50 flex items-center justify-center">
          <DropPhone
            items={placedItems}
            addItem={addItem}
            moveItem={moveItem}
            resizeItem={resizeItem}
            selectedAIFeatures={selectedAIFeatures}
            onDropAIFeature={handleAIFeatureDrop}
          />
        </div>

        {/* Right Panel */}
        <div className="w-1/4 bg-white shadow-inner p-4 flex flex-col items-center">
          <h2 className="text-xl font-bold mb-2">Ethics Score</h2>
          <div className="w-full mb-4 relative h-12 bg-gray-100 rounded-lg overflow-hidden">
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gray-400"></div>
            <div
              className={`absolute h-full top-0 transition-all duration-300 ${
                totalScore >= 0 ? "bg-green-500" : "bg-red-500"
              }`}
              style={{
                width: `${
                  (Math.abs(totalScore) /
                    (totalScore > 0 ? MAX : Math.abs(MIN))) *
                  50
                }%`,
                left: totalScore >= 0 ? "50%" : undefined,
                right: totalScore < 0 ? "50%" : undefined,
                transform: "translateX(0%)",
                zIndex: 0,
              }}
            ></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-bold text-gray-700 bg-white px-2 rounded">
                {totalScore}
              </span>
            </div>
          </div>
          <p className="text-sm text-center px-2">
            {totalScore >= 10
              ? "🌟 Excellent! Ethical design focus!"
              : totalScore >= 5
              ? "✅ Good balance!"
              : totalScore >= 0
              ? "⚠️ Needs improvement"
              : totalScore >= -5
              ? "⚠️⚠️ Concerning design choices"
              : "🚨 Dangerous! High manipulation risk!"}
          </p>
        </div>
      </div>
    </DndProvider>
  );
}

export default Social;
