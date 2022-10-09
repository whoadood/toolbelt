import React, { LegacyRef, useEffect, useRef, useState } from "react";
import { SparklesIcon } from "@heroicons/react/24/outline";
import { DraggableData, Rnd, RndDragEvent } from "react-rnd";

export default function Draggable({
  startX = 350,
  startY = 10,
  children,
  title,
}: {
  startX?: number;
  startY?: number;
  children: React.ReactNode;
  title: React.ReactNode;
}) {
  const dragRef = useRef<LegacyRef<Rnd>>();
  const [position, setPosition] = useState({
    x: startX,
    y: startY,
    height: "",
    width: "",
  });

  useEffect(() => {
    const resizer = () => {
      const windowMinusElement =
        //@ts-ignore
        window.innerWidth - dragRef.current?.resizable.state.width;
      setPosition((prev) => {
        return {
          ...prev,
          x: prev.x > windowMinusElement ? windowMinusElement : prev.x,
        };
      });
    };
    window.addEventListener("resize", resizer);
    return () => window.removeEventListener("resize", resizer);
  }, []);

  const onDragStop = (e: RndDragEvent, d: DraggableData) => {
    const { x, y } = d;
    setPosition((prev) => ({
      ...prev,
      x,
      y,
    }));
  };

  return (
    <Rnd
      ref={dragRef as LegacyRef<Rnd>}
      bounds="parent"
      enableResizing={false}
      onDragStop={onDragStop}
      position={position}
      dragHandleClassName={"handle"}
      default={{
        x: 0,
        y: 0,
        height: "",
        width: "",
      }}
    >
      <div className="shadow">
        <div className="shadow-b-lg shadow-black">
          <span className="handle absolute right-0 top-0 cursor-grab inline-block active:cursor-grabbing p-2">
            <SparklesIcon className="h-6" />
          </span>
          {title}
        </div>
        <div className="bg-gray-900/50 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-60 border border-gray-800">
          {children}
        </div>
      </div>
    </Rnd>
  );
}
