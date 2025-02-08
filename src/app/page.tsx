"use client";

import Image from "next/image";
import Editor from "./components/Editor";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  TransformWrapper,
  TransformComponent,
  ReactZoomPanPinchRef,
} from "react-zoom-pan-pinch";
import { useState } from "react";
import useStore from "./stores/globalStore";

export default function Home() {
  const [transformWrapperDisabled, setTransformWrapperDisabled] =
    useState(false);
  const { setScale } = useStore();

  function handleScaleChange(event: ReactZoomPanPinchRef) {
    setScale(event.instance.transformState.scale);
  }

  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="row-start-1">Title</h1>
      <main className="flex flex-1 row-start-2 relative justify-center items-center w-full h-full">
        <TransformWrapper
          disabled={transformWrapperDisabled}
          // onZoom={handleZoomChange}
          onTransformed={(e) => handleScaleChange(e)}
        >
          <TransformComponent
            wrapperStyle={{
              width: "100%",
              height: "100%",
              position: "absolute",
            }}
            contentStyle={{ width: "100%", height: "100%" }}
          >
            <DndProvider backend={HTML5Backend}>
              <Editor
                setTransformWrapperDisabled={setTransformWrapperDisabled}
              />
            </DndProvider>
          </TransformComponent>
        </TransformWrapper>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
