export const Scorefield = ({ counterName, label, value, controller, min = 0, max = Infinity, on = 'increment', off = 'decrement', step=1,...props }) => {
  return (
    <div className={`scorefield ${counterName}`}>
      <div className="scorefield__score">
        <div className="scorefield__score__label">{label}</div>
        <input type="number" min={min} max={max} className="scorefield__score__value" value={value} step={step} {...props} />
      </div>
      <div className="scorefield__controls">
        <button className="scorefield__controls__button btn" onClick={()=>controller({target: counterName, action: on, min, max, step})}>+</button>
        <button className="scorefield__controls__button btn" onClick={()=>controller({target: counterName, action: off, min, max, step})}>-</button>
      </div>
    </div>
  );
};