"use client";

import DateTimePicker from "@/app/components/DateTimePicker";
import { Input } from "@/components/ui/input";
import React from "react";
import WeatherSelect from "./WeatherSelect";
import PitchConditionSelect from "./PitchConditionSelect";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const Details = () => {
  const [venue, setVenue] = React.useState("");

  return (
    <div className="p-2 flex flex-col gap-2">
      <div className="flex gap-2 flex-col sm:flex-row">
        <div className="flex flex-col gap-2 w-full">
          <div className="flex justify-between items-center">
            <div className="text-sm">Venue</div>
          </div>
          <Input
            type="text"
            defaultValue={venue}
            onChange={(e) => setVenue(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2 w-full">
          <Label htmlFor={"ball-type"}>Ball</Label>
          <Select>
            <SelectTrigger id="ball-type" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="leather">Leather</SelectItem>
              <SelectItem value="tennis">Tennis</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex gap-2 flex-col sm:flex-row">
        <div className="flex flex-col gap-2 w-full">
          <Label htmlFor={"pitch-type"}>Pitch Type</Label>
          <Select>
            <SelectTrigger id="pitch-type" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rough">Rough</SelectItem>
              <SelectItem value="mat">Mat</SelectItem>
              <SelectItem value="turf">Turf</SelectItem>
              <SelectItem value="astroturf">Astroturf</SelectItem>
              <SelectItem value="cement">Cement</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2 w-full">
          <PitchConditionSelect />
        </div>
      </div>

      <div className="flex gap-2 flex-col sm:flex-row">
        <div className="flex flex-col gap-2 w-full">
          <WeatherSelect />
        </div>

        <div className="flex flex-col gap-2 w-full">
          <div className="flex justify-between items-center">
            <div className="text-sm">Date</div>
          </div>
          <DateTimePicker />
        </div>
      </div>
    </div>
  );
};

export default Details;
