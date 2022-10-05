import React, {
  DragEventHandler,
  LegacyRef,
  MutableRefObject,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { DraggableData, Rnd, RndDragEvent } from "react-rnd";

export default function Draggable({
  startX = 600,
  startY = 300,
  children,
}: {
  startX?: number;
  startY?: number;
  children: React.ReactNode;
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
        window.innerWidth - dragRef.current.resizable.state.width;
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
      default={{
        x: 0,
        y: 0,
        height: "",
        width: "",
      }}
    >
      <div className="bg-slate-600 rounded-tl rounded-tr">
        <span className="handle absolute right-5 top-2 cursor-grab inline-block active:cursor-grabbing">
          Drag
        </span>
        {children}
      </div>
    </Rnd>
  );
}
