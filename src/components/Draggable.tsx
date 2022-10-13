import React, { LegacyRef, useEffect, useRef, useState } from "react";
import { DraggableData, Rnd, RndDragEvent } from "react-rnd";

export default function Draggable({
  // ~ center
  startX = 350,
  startY = 10,
  children,
  title,
  border,
}: {
  startX?: number;

  startY?: number;
  children: React.ReactNode;
  title: React.ReactNode;
  border: string;
}) {
  const dragRef = useRef<LegacyRef<Rnd>>();
  const [position, setPosition] = useState({
    x: startX,
    y: startY,
    height: "",
    width: "",
  });

  // on window resize update position of draggable elements so they are within boundary
  useEffect(() => {
    const resizer = () => {
      const windowMinusElement =
        // @ts-ignore no idea what to do about this resizable doesnt exist on object?
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
    const { x, y, node } = d;
    node.style.zIndex = "";
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
      onDragStart={(e, d) => {
        d.node.style.zIndex = "100";
      }}
      onDragStop={onDragStop}
      position={position}
      default={{
        x: 0,
        y: 0,
        height: "",
        width: "",
      }}
    >
      <div
        className={`cursor-grab shadow transition-transform duration-300 ease-in-out active:cursor-grabbing`}
      >
        <div className="shadow-b-lg shadow-black">{title}</div>
        <div
          className={`rounded-b border bg-gray-900/50 bg-opacity-60 bg-clip-padding backdrop-blur-sm backdrop-filter ${border}`}
        >
          {children}
        </div>
      </div>
    </Rnd>
  );
}
