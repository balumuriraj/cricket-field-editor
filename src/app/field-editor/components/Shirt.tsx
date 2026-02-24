"use client";

import React, { useMemo, useState } from "react";
import Plain from "./shirts/Plain";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { HexColorPicker } from "react-colorful";

const Shirt = ({ size, fill }: { size: number; fill?: string }) => {
  const [open, setOpen] = useState(false);
  const parsedValue = useMemo(() => {
    return fill || "#FFFFFF";
  }, [fill]);
  const [color, setColor] = useState(parsedValue);

  return (
    <Popover onOpenChange={setOpen} open={open}>
      <PopoverTrigger asChild>
        <div onClick={() => setOpen(true)} className="cursor-pointer">
          <Plain size={size} fill={color} />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-full">
        <HexColorPicker color={parsedValue} onChange={(c) => setColor(c)} />
      </PopoverContent>
    </Popover>
  );
};

export default Shirt;
