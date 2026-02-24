"use client";

import React, { useEffect } from "react";
import { getPositionsForWidth } from "../lib/positions";
import useStore from "../stores/globalStore";

const Background = () => {
  const positions = getPositionsForWidth(100);
  const { scale } = useStore();
  const [hidePositions, setHidePositions] = React.useState(false);

  // useEffect(() => {
  //   if (scale >= 2) {
  //     setHidePositions(false);
  //   } else {
  //     setHidePositions(true);
  //   }
  // }, [scale]);

  return (
    <div className="absolute md:w-[600px] md:h-[600px] w-[300px] h-[300px]">
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <g>
          <circle cx="50" cy="50" r="50" fill="green" />
          <rect width="5" height="18.33" y="40.83" x="47.5" fill="orange" />
          <circle
            cx="50"
            cy="50"
            r="48"
            stroke="white"
            strokeWidth="0.15"
            fill="none"
          />
          <rect
            width="42.86"
            height="50"
            x="28.57"
            y="24"
            rx="21.43"
            ry="21.43"
            fill="none"
            stroke="white"
            strokeWidth="0.15"
            strokeDasharray="0.5"
          />
          <g>
            <line
              x1="47.5"
              y1="42.5"
              x2="52.5"
              y2="42.5"
              stroke="white"
              strokeWidth="0.15"
            />

            <line
              x1="48.5"
              y1="40.83"
              x2="48.5"
              y2="42.5"
              stroke="white"
              strokeWidth="0.15"
            />
            <line
              x1="51.5"
              y1="40.83"
              x2="51.5"
              y2="42.5"
              stroke="white"
              strokeWidth="0.15"
            />
          </g>

          <g>
            <line
              x1="47.5"
              y1="57.5"
              x2="52.5"
              y2="57.5"
              stroke="white"
              strokeWidth="0.15"
            />

            <line
              x1="48.5"
              y1="57.5"
              x2="48.5"
              y2="59.15"
              stroke="white"
              strokeWidth="0.15"
            />
            <line
              x1="51.5"
              y1="57.5"
              x2="51.5"
              y2="59.15"
              stroke="white"
              strokeWidth="0.15"
            />
          </g>
        </g>
        {hidePositions ? null : (
          <g>
            {positions.map(({ name, x, y }) => (
              <g
                key={name}
                transform={`translate(${x}, ${y}) scale(${1 / scale})`}
                opacity={0.5}
              >
                <circle cx={0} cy={0} r="1" fill="white" />
                <text
                  x={0}
                  y={0}
                  fontSize="2"
                  fill="white"
                  textAnchor="middle"
                  dy="3px"
                  
                >
                  {name}
                </text>
              </g>
            ))}
          </g>
        )}
      </svg>
    </div>
  );
};

export default Background;
