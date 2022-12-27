import * as React from "react";
import { getPlotExtremes } from "./iconHelper";

/**
 * The CaretDown icon. Also known as a "chevron down". `⌄`
 * @param props 
 * @returns 
 */
export const CaretDown = ({
  width = 16,
  height = 8,
  color = "currentColor",
  strokeWidth = 2,
  fill = "none",
  lineCap = "round",
  padding = 0.25,
  ...rest
}) => {
  const { min, max } = getPlotExtremes({ width, height, padding });
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      stroke={color}
      fill={fill}
      strokeWidth={strokeWidth}
      viewBox={`0 0 ${width} ${height}`}
      strokeLinecap={lineCap}
      {...rest}
    >
      <polyline
        points={`${min.x},${min.y} ${width / 2},${max.y} ${max.x},${min.y}`}
      />
    </svg>
  );
};