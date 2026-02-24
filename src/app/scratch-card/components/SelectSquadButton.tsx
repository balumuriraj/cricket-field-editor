"use client";

import React, { useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Delete, Plus, Trash2 } from "lucide-react";

const SelectSquadButton = () => {
  const [players, setPlayers] = useState(["player1", "player2"]);
  return (
    <Drawer>
      <DrawerTrigger>
        <Button variant={"outline"} size={"sm"} className="text-xs">
          Edit Squad
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Playing squad</DrawerTitle>
          <DrawerDescription>Add or remove players</DrawerDescription>
        </DrawerHeader>

        <div className="flex flex-col gap-2 p-4">
          {players.map((player, index) => (
            <div
              key={index}
              className="flex flex-row items-center justify-between gap-2"
            >
              <Input
                type="text"
                defaultValue={player}
                onInput={(event) => {
                  const newPlayers = players.map((p, i) =>
                    i === index ? (event.target as HTMLInputElement).value : p
                  );
                  setPlayers(newPlayers);
                }}
              />
              <Button
                variant="outline"
                onClick={() => {
                  const newPlayers = players.filter((_, i) => i !== index);
                  setPlayers(newPlayers);
                }}
              >
                <Trash2 size={16} />
              </Button>
            </div>
          ))}
          <Button
            variant="outline"
            onClick={() => setPlayers([...players, "player"])}
          >
            <Plus /> Add Player
          </Button>
        </div>

        <div className="flex w-full justify-center p-4">
          <DrawerClose className="w-24">
            <Button className="w-full" variant="outline">
              Done
            </Button>
          </DrawerClose>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default SelectSquadButton;
