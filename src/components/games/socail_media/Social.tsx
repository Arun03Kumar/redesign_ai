// App.tsx or Social.tsx
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

const ItemTypes = {
  COMPONENT: "component",
};

function DraggableItem({ item }) {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: ItemTypes.COMPONENT,
    item: { ...item, source: "toolbox" },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={dragRef}
      className={`w-20 h-20 bg-gray-100 hover:bg-gray-200 rounded-lg flex flex-col items-center justify-center shadow-md cursor-grab ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <div className="mb-1">{item.icon}</div>
      <span className="text-xs text-center">{item.label}</span>
    </div>
  );
}

function DraggablePlacedItem({ item, moveItem, resizeItem }) {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: ItemTypes.COMPONENT,
    item: { ...item, source: "canvas" },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const ref = useRef(null);
  const isFeed = item.id === "feed";

  useEffect(() => {
    if (!isFeed) return;
    const handleMouseMove = (e) => {
      if (!ref.current || !ref.current.dataset.resizing) return;
      const newWidth = e.clientX - ref.current.getBoundingClientRect().left;
      const newHeight = e.clientY - ref.current.getBoundingClientRect().top;
      resizeItem(item.uuid, { width: newWidth, height: newHeight });
    };
    const handleMouseUp = () => {
      if (ref.current) ref.current.dataset.resizing = "";
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [item, resizeItem]);

  const startResize = () => {
    if (ref.current) ref.current.dataset.resizing = "true";
  };

  return (
    <div
      ref={dragRef}
      className="absolute bg-white border rounded shadow text-xs flex items-center justify-center cursor-move"
      style={{
        top: item.y,
        left: item.x,
        width: item.width || 60,
        height: item.height || 40,
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      <div ref={ref} className="w-full h-full relative flex items-center justify-center">
        {item.icon}
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

function DropPhone({ items, addItem, moveItem, resizeItem }) {
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
          />
        ))}
      </div>
    </div>
  );
}

function Social() {
  const [placedItems, setPlacedItems] = useState([]);

  const addItem = (item) => {
    setPlacedItems((prev) => [...prev, item]);
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
        <div className="w-1/4 bg-white shadow-lg p-4 flex flex-col items-center gap-4">
          <h2 className="text-xl font-bold mb-2">Toolbox</h2>
          {COMPONENTS.map((c) => (
            <DraggableItem key={c.id} item={c} />
          ))}
        </div>

        {/* Center Panel */}
        <div className="w-2/4 bg-blue-50 flex items-center justify-center">
          <DropPhone
            items={placedItems}
            addItem={addItem}
            moveItem={moveItem}
            resizeItem={resizeItem}
          />
        </div>

        {/* Right Panel */}
        <div className="w-1/4 bg-white shadow-inner p-4 flex flex-col items-center">
          <h2 className="text-xl font-bold mb-2">Ethics Score</h2>
          <div className="bg-gray-200 w-full rounded h-6 overflow-hidden mb-4">
            <div
              className="bg-green-500 h-full rounded"
              style={{ width: "60%" }}
            />
          </div>
          <p className="text-sm text-center px-2">
            Try adding privacy and transparency features. Too much AI = ⚠️!
          </p>
        </div>
      </div>
    </DndProvider>
  );
}

export default Social;
