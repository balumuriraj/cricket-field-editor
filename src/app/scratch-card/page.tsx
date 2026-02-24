"use client";

import React from "react";
import { ChevronsRight, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import Rules from "./components/Rules";
import TeamsHeader from "./components/TeamsHeader";
import WeatherSelect from "./components/WeatherSelect";
import PitchConditionSelect from "./components/PitchConditionSelect";
import BallSelect from "./components/BallSelect";
import MatchTitle from "./components/MatchTitle";

const page = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="bg-zinc-900 w-full flex flex-col gap-6 py-16 items-center">
        <div className="flex flex-col justify-center gap-2">
          <div className="flex justify-center">
            <div className=" px-4 py-2 border text-xs rounded-full">
              Quick Match
            </div>
          </div>
          <MatchTitle />
        </div>

        <TeamsHeader />
      </div>

      <div className="w-full max-w-7xl px-6 py-6 lg:px-0 flex gap-6 flex-col lg:flex-row">
        <div className="w-full flex flex-col gap-2 p-2 border rounded-lg">
          <div className="flex items-center gap-1 font-bold text-sm md:text-lg text-center pb-2 border-b">
            <Settings size={16} /> Match Settings
          </div>
          <Rules />
        </div>
        <div className="w-full lg:w-1/2 flex justify-center">
          <div className="w-full max-w-7xl flex flex-col gap-2">
            <WeatherSelect />
            <PitchConditionSelect />
            <BallSelect />
          </div>
        </div>
      </div>

      {/* <Match /> */}

      <div className="w-full flex justify-center bg-black border-t p-4">
        <div className="w-full max-w-7xl flex justify-center sm:justify-end">
          <Button variant={"outline"} className="rounded-md">
            <ChevronsRight size={20} /> Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default page;
