import React from "react";
import { Button } from "./Button";
import { Minus, Plus } from "./Icons";

export const NumberInput = ({
  label,
  scoreKey,
  onChange,
  value = 0,
  min = 0,
  max = 0,
  step = 1,
  ...props
}) => {
  const actions = {
    increment: () =>
      onChange(
        scoreKey,
        value + step <= max || max === 0 ? value + step : value
      ),
    decrement: () => onChange(scoreKey, value - step >= min ? value - step : 0),
  };
  return (
    <div className="number-input">
      <div className="number-input__fields">
        <label
          className="number-input__fields--label"
          htmlFor={`number-input-${scoreKey}-${props.id}`}
        >
          {label}
        </label>
        <input
          id={`number-input-${scoreKey}-${props.id}`}
          type="number"
          className="number-input__fields--input"
          value={value}
          min={min}
          max={max}
          onChange={(e) => onChange(scoreKey, e.target.value)}
        />
      </div>
      <div className="number-input__actions">
        <Button
          className="number-input__actions--increment"
          onClick={actions.increment}
        >
          <Plus />
        </Button>
        <Button
          className="number-input__actions--decrement"
          onClick={actions.decrement}
        >
          <Minus />
        </Button>
      </div>
    </div>
  );
};
