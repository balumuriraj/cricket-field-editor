"use client";

import React from "react";
import { useDrag } from "react-dnd";
import useStore from "../stores/globalStore";

interface Props {
  id: number;
  name: string;
  position: { x: number; y: number };
  setTransformWrapperDisabled: (val: boolean) => void;
}

// function getStyles(
//   left: number,
//   top: number,
//   scale: number,
//   isDragging: boolean
// ): CSSProperties {
//   const transform = `translate3d(${left}px, ${top}px, 0); scale(${1 / scale})`;
//   // console.log(transform);
//   return {
//     position: "absolute",
//     transform,
//     WebkitTransform: transform,
//     // IE fallback: hide the real node using CSS when dragging
//     // because IE will ignore our custom "empty image" drag preview.
//     opacity: isDragging ? 0 : 1,
//     height: isDragging ? 0 : "",
//   };
// }

const Player = ({ id, name, position, setTransformWrapperDisabled }: Props) => {
  const [{ isDragging }, drag] = useDrag({
    type: "PLAYER",
    item: { id, position },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const { scale } = useStore();
  const adjustedX = position.x - 16;
  const adjustedY = position.y - 16;

  return (
    <div
      ref={drag}
      className="absolute p-4 bg-blue-500 text-white rounded-full cursor-move"
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
      <div className="absolute text-xs w-20 text-center transform -translate-x-1/2 -translate-y-1/2">
        {name}
        <div className="text-xs">
          {position.x}, {position.y}
        </div>
      </div>
    </div>
  );
};

export default Player;
