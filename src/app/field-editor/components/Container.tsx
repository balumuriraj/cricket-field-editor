"use client";

import React, { useState } from "react";
import useStore from "../stores/globalStore";
import {
  ReactZoomPanPinchRef,
  TransformComponent,
  TransformWrapper,
} from "react-zoom-pan-pinch";
import { DndProvider } from "react-dnd";
import Editor from "./Editor";
import { HTML5Backend } from "react-dnd-html5-backend";

const Container = () => {
  const [transformWrapperDisabled, setTransformWrapperDisabled] =
    useState(false);
  const { setScale } = useStore();

  function handleScaleChange(event: ReactZoomPanPinchRef) {
    setScale(event.instance.transformState.scale);
  }

  return (
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
          <Editor setTransformWrapperDisabled={setTransformWrapperDisabled} />
        </DndProvider>
      </TransformComponent>
    </TransformWrapper>
  );
};

export default Container;
