"use client";

import Shirt from "@/app/field-editor/components/Shirt";
import { Shield } from "lucide-react";
import React from "react";

const Team = ({ color }: { color: string }) => {

  return (
    <div className="w-full flex flex-col gap-2 items-center">
      <div className="relative">
        <div className="sm:hidden"><Shirt size={60} fill={color} /></div>
        <div className="hidden sm:block"><Shirt size={100} fill={color} /></div>
        <div className="sm:hidden absolute bottom-0 right-0 p-2 bg-white rounded-full text-black drop-shadow-lg">
          <Shield size={20} />
        </div>
        <div className="hidden sm:block absolute bottom-0 right-0 p-2 bg-white rounded-full text-black drop-shadow-lg">
          <Shield size={25} />
        </div>
      </div>

    </div>
  );
};

export default Team;
