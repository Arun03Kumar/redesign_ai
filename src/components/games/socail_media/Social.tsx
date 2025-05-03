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

const AI_FEATURES = [
  "Targeted Ads",
  "Activity Tracking",
  "Location Data",
  "Search History",
  "Likes Based Content",
  "Happy Emotion Feed",
  "Sad Emotion Feed",
  "AI Recommendations",
  "Sentiment Analysis",
  "Trend Surfacing",
  "AI Search Suggestion",
  "Behavioral Notifications",
  "Attention Engine",
  "Facial Data Capture",
  "Hashtag Personalization",
  "Watch Time Tracking",
  "Friends Graph Learning",
  "Sponsored Content",
  "Engagement Tracking",
  "Filter Bubble Reinforcement",
  "Personal Info Usage",
  "Message Scan AI",
  "Recommender System",
  "Auto Play Hook",
  "Like Bias Training",
  "Dislike Bias Training",
  "Geo-Targeted Ads",
  "Gamified Rewards",
  "Dopamine Trigger AI",
];

const ItemTypes = {
  COMPONENT: "component",
  AI_FEATURE: "ai_feature"
};

function DraggableItem({ item, draggable = true, type, isSelected }) {
  const [{ isDragging }, dragRef] = useDrag(
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
      ref={dragRef}
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

function DraggablePlacedItem({ item, moveItem, resizeItem, onDropAIFeature, selectedAIFeatures }) {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: ItemTypes.COMPONENT,
    item: { ...item, source: "canvas" },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [{ isOver }, dropRef] = useDrop({
    accept: ItemTypes.AI_FEATURE,
    drop: (droppedItem) => {
      if (onDropAIFeature && !selectedAIFeatures.includes(droppedItem.label)) {
        onDropAIFeature(droppedItem.label);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const ref = useRef(null);
  const isFeed = item.id === "feed";
  const isAI = item.id === "ai";

  useEffect(() => {
    if (!isFeed) return;
    const handleMouseMove = (e) => {
      if (!ref.current?.dataset.resizing) return;
      const newWidth = e.clientX - ref.current.getBoundingClientRect().left;
      const newHeight = e.clientY - ref.current.getBoundingClientRect().top;
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
            {selectedAIFeatures.map((feature) => (
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

function DropPhone({ items, addItem, moveItem, resizeItem, selectedAIFeatures, onDropAIFeature  }) {
  const phoneRef = useRef(null);

  const [, drop] = useDrop({
    accept: ItemTypes.COMPONENT,
    drop: (item, monitor) => {
      const offset = monitor.getSourceClientOffset();
      const phoneRect = phoneRef.current.getBoundingClientRect();

      const x = offset.x - phoneRect.left;
      const y = offset.y - phoneRect.top;

      if (item.source === "toolbox") {
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
        moveItem(item.uuid, { x, y });
      }
    },
  });

  return (
    <div
      ref={phoneRef}
      className="w-64 h-[480px] border-4 border-black rounded-[2rem] bg-white relative"
    >
      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 h-4 w-24 bg-gray-300 rounded-full"></div>
      <div ref={drop} className="absolute inset-0">
        {items.map((item) => (
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
  const [placedItems, setPlacedItems] = useState([]);
  const [selectedAIFeatures, setSelectedAIFeatures] = useState([]);

  const addItem = (item) => setPlacedItems((prev) => [...prev, item]);

  const handleAIFeatureDrop = (feature) => {
    if (!selectedAIFeatures.includes(feature)) {
      setSelectedAIFeatures(prev => [...prev, feature]);
    }
  };

  const moveItem = (uuid, pos) => {
    const index = placedItems.findIndex((i) => i.uuid === uuid);
    if (index >= 0) {
      const updated = update(placedItems, {
        [index]: { $merge: pos },
      });
      setPlacedItems(updated);
    }
  };

  const resizeItem = (uuid, size) => {
    const index = placedItems.findIndex((i) => i.uuid === uuid);
    if (index >= 0) {
      const updated = update(placedItems, {
        [index]: { $merge: size },
      });
      setPlacedItems(updated);
    }
  };

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
            {AI_FEATURES.map((label) => (
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
          <div className="bg-gray-200 w-full rounded h-6 overflow-hidden mb-4">
            <div
              className="bg-green-500 h-full rounded"
              style={{ width: `${Math.max(10, 100 - selectedAIFeatures.length * 3)}%` }}
            />
          </div>
          <p className="text-sm text-center px-2">
            {selectedAIFeatures.length > 5
              ? "⚠️ Too many AI features! Privacy risk!"
              : "Try adding privacy and transparency features. Too much AI = ⚠️!"}
          </p>
        </div>
      </div>
    </DndProvider>
  );
}

export default Social;