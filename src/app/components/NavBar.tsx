"use client";

import { Button } from "@/components/ui/button";
import { Volleyball } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function NavBar() {
  return (
    <header className="fixed top-0 z-50 flex w-full justify-center border-b px-6 py-2 backdrop-blur-sm bg-black bg-opacity-85">
      <div className="relative flex w-full max-w-7xl items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <Volleyball size="20px" className="mr-1" />
            <div className="text-base font-bold">cricboard</div>
          </Link>
        </div>
        <div className="flex items-center gap-2">
        <Link href="/scratch-card">
            <Button variant={"link"} className="text-xs">
              Quick Match
            </Button>
          </Link>
          <Link href="/field-editor">
            <Button variant={"link"} className="text-xs">
              Field Editor
            </Button>
          </Link>          
          <Link href="/signin">
            <Button variant={"outline"} className="text-sm">
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
