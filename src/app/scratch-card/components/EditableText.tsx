"use client";

import { Input } from "@/components/ui/input";
import React, { useState } from "react";

const EditableText = ({
  size,
  text,
  setText,
}: {
  size?: number;
  text: string;
  setText: (text: string) => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleTitleClick = () => {
    setIsEditing(true);
  };

  const handleTitleChange = (e) => {
    setText(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (text.trim() === "") {
        setText("Click to Edit");
      }

      setIsEditing(false);
    }
    if (e.key === "Escape") {
      if (text.trim() === "") {
        setText("Click to Edit");
      }
      setIsEditing(false);
    }
  };

  const handleBlur = () => {
    console.log("text", text);
    if (text.trim() === "") {
      console.log("trim", text);
      setText("Click to Edit");
    }

    setIsEditing(false);
  };

  return (
    <div className="">
      {isEditing ? (
        <div className="">
          <Input
            value={text || "Click to Edit"}
            onChange={handleTitleChange}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            autoFocus
            className="max-w-28 sm:max-w-96 md:text-lg text-center w-full h-auto border-0 p-0 m-0 ring-0 focus:outline-none focus:ring-0 rounded-none bg-transparent font-bold"
            style={{ fontSize: size ? `${size}px` : undefined, border: "none" }}
          />
        </div>
      ) : (
        <div
          onClick={handleTitleClick}
          className="group flex items-center gap-2 cursor-pointer relative border-dashed border-b border-blue-500 mx-4"
        >
          <div
            className="font-bold group-hover:text-gray-700 text-ellipsis line-clamp-1 text-sm md:text-lg  text-center"
            style={{ fontSize: size ? `${size}px` : undefined }}
          >
            {text}
          </div>
        </div>
      )}
    </div>
  );
};

export default EditableText;
