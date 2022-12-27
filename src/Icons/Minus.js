import * as React from "react";
import { getPlotExtremes } from "./iconHelper";

/**
 * Check icon, also known as a checkmark or tick. `⎷`
 * @param props
 * @returns
 */
export const Minus = ({
  width = 12,
  height = 12,
  color = 'currentColor',
  strokeWidth = 2,
  fill = 'none',
  lineCap = 'round',
  lineJoin = 'round',
  padding = 0.1,
  ...rest
}) => {
  const { min, max } = getPlotExtremes({ width, height, padding });
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      stroke={color}
      fill={fill}
      strokeWidth={strokeWidth}
      viewBox={`0 0 ${width} ${height}`}
      strokeLinecap={lineCap}
      strokeLinejoin={lineJoin}
      {...rest}
    >
      <line x1={min.x} y1={height / 2} x2={max.x} y2={height / 2} />
    </svg>
  );
};
