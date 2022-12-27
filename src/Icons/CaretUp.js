import * as React from "react";
import { getPlotExtremes } from "./iconHelper";

/**
 * CaretUp icon, also known as a "chevron up". `⌃`
 * @param props
 * @returns 
 */
export const CaretUp = ({
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
      strokeWidth={strokeWidth}
      viewBox={`0 0 ${width} ${height}`}
      strokeLinecap={lineCap}
      fill={fill}
      {...rest}
    >
      <polyline
        points={`${min.x},${max.y} ${width / 2},${min.y} ${max.x},${max.y}`}
      />
    </svg>
  );
};
