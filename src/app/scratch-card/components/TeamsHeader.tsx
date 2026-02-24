"use client";

import React, { useState } from "react";
import EditableText from "./EditableText";
import Team from "./Team";
import DateTimePicker from "@/app/components/DateTimePicker";
import SelectSquadButton from "./SelectSquadButton";

const TeamsHeader = () => {
  const [name1, setName1] = useState("Team Name");
  const [name2, setName2] = useState("Team Name");
  const [location, setLocation] = useState("Lord's Cricket Ground");
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="w-full flex flex-col gap-8 items-center">
      <div className="flex flex-row items-center max-w-7xl w-full">
        <div className="flex flex-col gap-4 w-full">
          <Team color="#FF0000" />
          <div className="w-full flex justify-center flex-col items-center gap-4">
            <EditableText text={name1} setText={setName1} />
            <SelectSquadButton />
          </div>
        </div>
        <div className="font-bold text-xl p-6">vs</div>
        <div className="flex flex-col gap-4 w-full">
          <Team color="#0000FF" />
          <div className="w-full flex justify-center flex-col items-center gap-4">
            <EditableText text={name2} setText={setName2} />
            <SelectSquadButton />
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center gap-3">
        <div className="flex justify-center">
          <EditableText text={location} setText={setLocation} />
        </div>
        <DateTimePicker date={date} setDate={(d) => setDate(d)} />
      </div>
    </div>
  );
};

export default TeamsHeader;
