"use client";

import React, { useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import { presets } from "../lib/presets";
import Player from "./Player";
import Background from "./Background";
import useStore from "../stores/globalStore";
import useElementSize from "../hooks/useElementSize";

export interface DragItem {
  id: number;
  name: string;
  position: { x: number; y: number };
}

export function snapToGrid(x: number, y: number): [number, number] {
  const snappedX = Math.round(x / 32) * 32;
  const snappedY = Math.round(y / 32) * 32;
  return [snappedX, snappedY];
}

const Editor = ({
  setTransformWrapperDisabled,
}: {
  setTransformWrapperDisabled: (val: boolean) => void;
}) => {
  const [players, setPlayers] = useState(
    presets[0].players.map((player) => ({
      ...player,
      position: { ...player.position },
    }))
  );
  const { scale } = useStore();
  const [size, containerRef] = useElementSize();

  useEffect(() => {
    const updatedPlayers = presets[0].players.map((player) => ({
      ...player,
      position: {
        x: (player.position.x / 100) * size.width,
        y: (player.position.y / 100) * size.height,
      },
    }));
    setPlayers(updatedPlayers);
  }, [size]);

  const [, drop] = useDrop({
    accept: "PLAYER",
    drop(item: DragItem, monitor) {
      const delta = monitor.getDifferenceFromInitialOffset() as {
        x: number;
        y: number;
      };
      const updatedPlayers = players.map((player) => {
        return player.id === item.id
          ? {
              ...player,
              position: {
                x: item.position.x + delta.x / scale,
                y: item.position.y + delta.y / scale,
              },
            }
          : player;
      });
      setPlayers(updatedPlayers);
    },
  });

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div
        ref={(node) => {
          drop(node);
          containerRef.current = node;
        }}
        className="relative md:w-[600px] md:h-[600px] w-[300px] h-[300px]"
      >
        <Background />
        {size.width > 0
          ? players.map((player) => (
              <Player
                key={player.id}
                {...player}
                setTransformWrapperDisabled={setTransformWrapperDisabled}
              />
            ))
          : null}
      </div>
    </div>
  );
};

export default Editor;
