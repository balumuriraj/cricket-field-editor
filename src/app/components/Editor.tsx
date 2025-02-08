"use client";

import React, { useState } from "react";
import { useDrop } from "react-dnd";
import { presets } from "../lib/presets";
import Player from "./Player";
import Background from "./Background";
import useStore from "../stores/globalStore";

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
      <div ref={drop} className="relative w-[650px] h-[650px]">
        <Background />
        {players.map((player) => (
          <Player
            key={player.id}
            {...player}
            setTransformWrapperDisabled={setTransformWrapperDisabled}
          />
        ))}
      </div>
    </div>
  );
};

export default Editor;
