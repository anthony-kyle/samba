/**
 * Calculate the amount of padding to apply to the X and Y axis of the icon.
 * Accepts a width and height and a padding percentage decimal.
 * @param options - The options for calculating the plot.
 * @returns
 */
const getPaddedPlot = ({ width, height, padding }) => {
  const xPad = width * padding;
  const yPad = height * padding;
  return {
    xPad,
    yPad,
  };
};

/**
 * Takes a coordinate and relative padding, and returns the adjusted coordinate.
 * @param options - The options for calculating the padded plot.
 * @returns
 */
const getPaddedXY = ({
  x,
  y,
  xPad,
  yPad,
  inset = false,
}) => {
  if (inset) {
    return { x: x - xPad, y: y - yPad };
  } else {
    return { x: x + xPad, y: y + yPad };
  }
};

/**
 * Obtains the minimum and maximum X and Y coordinates based on the given
 * width, height and percentage padding.
 * @param options - The options for calculating the plot.
 * @returns
 */
export const getPlotExtremes = ({
  width,
  height,
  padding,
}) => {
  const { xPad, yPad } = getPaddedPlot({ width, height, padding });
  const min = getPaddedXY({ x: 0, y: 0, xPad, yPad });
  const max = getPaddedXY({ x: width, y: height, inset: true, xPad, yPad });
  return { min, max };
};
