"use client";

import { Input } from "@/components/ui/input";
import React from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Rules = () => {
  const [overs, setOvers] = React.useState(5);
  const [players, setPlayers] = React.useState(11);
  return (
    <div className="p-2 flex flex-col gap-2">
      <div className="flex gap-2 flex-col sm:flex-row">
        <div className="flex flex-col gap-2 w-full">
          <div className="flex justify-between items-center">
            <div className="text-sm">Overs</div>
          </div>
          <Input
            type="number"
            defaultValue={overs}
            onChange={(e) => setOvers(Number(e.target.value))}
          />
        </div>

        <div className="flex flex-col gap-2 w-full">
          <div className="flex justify-between items-center">
            <div className="text-sm">Wickets</div>
          </div>
          <Input type="number" defaultValue={5} />
        </div>
      </div>

      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-green-500">
            Advanced
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex gap-2 flex-col sm:flex-row">
              <div className="flex flex-col gap-2 w-full">
                <div className="flex justify-between items-center">
                  <div className="text-sm">Overs</div>
                </div>
                <Input
                  type="number"
                  defaultValue={overs}
                  onChange={(e) => setOvers(Number(e.target.value))}
                />
              </div>

              <div className="flex flex-col gap-2 w-full">
                <div className="flex justify-between items-center">
                  <div className="text-sm">Wickets</div>
                </div>
                <Input type="number" defaultValue={5} />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Rules;
