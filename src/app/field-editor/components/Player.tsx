"use client";

import React from "react";
import { useDrag } from "react-dnd";
import useStore from "../stores/globalStore";
import Shirt from "./Shirt";

interface Props {
  id: number;
  name: string;
  position: { x: number; y: number };
  setTransformWrapperDisabled: (val: boolean) => void;
}

const Player = ({ id, name, position, setTransformWrapperDisabled }: Props) => {
  const [{ isDragging }, drag] = useDrag({
    type: "PLAYER",
    item: { id, position },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const { scale } = useStore();
  const adjustedX = position.x;
  const adjustedY = position.y;

  return (
    <div
      ref={drag}
      className="absolute cursor-move"
      style={{
        position: "absolute",
        transform: `translate3d(${adjustedX}px, ${adjustedY}px, 0) scale(${
          1 / scale
        })`,
        WebkitTransform: `translate3d(${adjustedX}px, ${adjustedY}px, 0) scale(${
          1 / scale
        })`,
        opacity: isDragging ? 0 : 1,
        height: isDragging ? 0 : "",
      }}
      onMouseDown={() => setTransformWrapperDisabled(true)}
      onMouseUp={() => setTransformWrapperDisabled(false)}
      onDragStart={() => setTransformWrapperDisabled(true)}
      onDragEnd={() => setTransformWrapperDisabled(false)}
      onTouchStart={() => setTransformWrapperDisabled(true)}
      onTouchEnd={() => setTransformWrapperDisabled(false)}
    >
      <div className="relative">
        <Shirt size={50} />
        <div className="absolute font-bold text-xs top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {id}
        </div>
        <div className="absolute text-xs bottom-[-20px] left-1/2 transform -translate-x-1/2">
          {name}
        </div>
      </div>
    </div>
  );
};

export default Player;
