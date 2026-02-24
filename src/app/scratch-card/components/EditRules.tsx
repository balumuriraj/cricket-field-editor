"use client";

import React from 'react'
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const EditRules = () => {
  return (
    <Tabs defaultValue="easy" className=" w-full">
          <TabsList className="w-full">
            <TabsTrigger value="easy" className="w-full">
              Easy
            </TabsTrigger>
            <TabsTrigger value="pro" className="w-full">
              Pro
            </TabsTrigger>
          </TabsList>

          <TabsContent value="easy" className="mt-4">
            <div className="flex flex-col gap-2 mb-4">
              <div className="font-bold">Overs</div>
              <div className="flex gap-2 flex-wrap">
                <div className="w-16 h-16 flex justify-center items-center rounded-md border-2">5</div>
                <div className="w-16 h-16 flex justify-center items-center rounded-md border-2">10</div>
                <div className="w-16 h-16 flex justify-center items-center rounded-md border-2">15</div>
                <div className="w-16 h-16 flex justify-center items-center rounded-md border-2">20</div>
                <div className="w-16 h-16 flex justify-center items-center rounded-md border-2">25</div>
                <div className="w-16 h-16 flex justify-center items-center rounded-md border-2">30</div>
                <div className="w-16 h-16 flex justify-center items-center rounded-md border-2">40</div>
                <div className="w-16 h-16 flex justify-center items-center rounded-md border-2">50</div>
                <Input className="w-24 overflow-hidden h-16 inline-block border-2 text-center" type="number" placeholder={"custom"} />
              </div>
            </div>

            <div className="flex flex-col gap-2 mb-4">
              <div className="font-bold">Wickets</div>
              <div className="flex gap-2 flex-wrap">
                <div className="w-16 h-16 flex justify-center items-center rounded-md border-2">1</div>
                <div className="w-16 h-16 flex justify-center items-center rounded-md border-2">2</div>
                <div className="w-16 h-16 flex justify-center items-center rounded-md border-2">3</div>
                <div className="w-16 h-16 flex justify-center items-center rounded-md border-2">4</div>
                <div className="w-16 h-16 flex justify-center items-center rounded-md border-2">5</div>
                <div className="w-16 h-16 flex justify-center items-center rounded-md border-2">6</div>
                <div className="w-16 h-16 flex justify-center items-center rounded-md border-2">7</div>
                <div className="w-16 h-16 flex justify-center items-center rounded-md border-2">8</div>
                <div className="w-16 h-16 flex justify-center items-center rounded-md border-2">9</div>
                <div className="w-16 h-16 flex justify-center items-center rounded-md border-2">10</div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="pro">
            <div className="flex flex-col gap-2 mb-4">
              <div>Max Overs</div>
              <div>
                <Input type="number" value={20} />
              </div>
            </div>

            <div className="flex flex-col gap-2 mb-4">
              <div>Max wickets</div>
              <div>
                <Input type="number" value={10} />
              </div>
            </div>

            <div className="flex gap-2 items-center">
              <div>Max overs per bowler</div>
              <div>
                <Input type="number" value={20} />
              </div>
            </div>

            <div className="flex gap-2 items-center">
              <div>Max wickets</div>
              <div>
                <Input type="number" value={10} />
              </div>
            </div>

            <div className="flex gap-2 items-center">
              <div>Power plays</div>
              <div>
                <Input type="number" value={1} />
              </div>
            </div>

            <div className="flex gap-2 items-center">
              <div>Power play overs</div>
              <div>
                <Input type="number" value={2} />
              </div>
            </div>

            <div className="flex gap-2 items-center">
              <div>Max overs per bowler</div>
              <div>
                <Input type="number" value={20} />
              </div>
            </div>
          </TabsContent>
        </Tabs>
  )
}

export default EditRules