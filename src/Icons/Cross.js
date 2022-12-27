import * as React from "react";
import { getPlotExtremes } from "./iconHelper";

/**
 * Cross icon, also known as a "times" or "x". `✖`
 * @param props
 * @returns 
 */
export const Cross = ({
  width = 12,
  height = 12,
  color = "currentColor",
  strokeWidth = 2,
  fill = "none",
  lineCap = "round",
  padding = 0.25,
  ...rest
}) => {
  const { min, max } = getPlotExtremes({width, height, padding});
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      stroke={color}
      strokeWidth={strokeWidth}
      viewBox={`0 0 ${width} ${height}`}
      strokeLinecap={lineCap}
      fill={fill}
      {...rest}
    >
      <line x1={min.x} y1={min.y} x2={max.x} y2={max.y} />
      <line x1={min.x} y1={max.y} x2={max.x} y2={min.y} />
    </svg>
  );
};
