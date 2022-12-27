import { useState } from "react";
import { Button } from "./Button";
import { Check, Cross } from "./Icons";
import { NumberInput } from "./NumberInput";
import { SlideToggle } from "./SlideToggle";

export default function Player({
  player,
  handleScoreChange,
  game,
  active,
  className = "",
  setSubtotal,
  ...props
}) {
  
  const handleChange = (key, value) => {
    handleScoreChange(player, key, value);
    setSubtotal(player);
  };

  // const handleFocus = (e) => {
  //   e.target.select();
  // };

  // useEffect(() => {
  //   let newSubtotal = 0;
  //   for (const score in player.scoreSheet) {
  //     newSubtotal += player.scoreSheet[score].score;
  //   }
  //   setSubtotal(newSubtotal);
  // }, [scores]);

  // const handleNull = (e) => {
  //   const value = e.target.value;
  //   if (typeof value !== "number" || value < 0) e.target.value = 0;
  // };

  return (
    <section className={`scorecard ${className}`}>
      <div className="subtotal">Hand total: {player.subtotal}</div>
      <div className="player">
        <div className="player-row">
          <div className="number-input">
            <div className="number-input__fields">
              <label className="number-input__fields--label">Win?</label>
              <div className="number-input__fields--input" style={{textAlign: 'left'}}>
                {player.scoreSheet.win.value === 1 ? "Yes" : "No"}
              </div>
            </div>
            <div className="number-input__actions">
              <Button
                className="number-input__actions--increment"
                onClick={() => handleChange("win", 1)}
              >
                <Check />
              </Button>
              <Button
                className="number-input__actions--decrement"
                onClick={() => handleChange("win", 0)}
              >
                <Cross />
              </Button>
            </div>
          </div>
        </div>
        <div className="player-row">
          <NumberInput
            id={`player-${player.id}`}
            label="Red Threes"
            scoreKey="redThrees"
            value={player.scoreSheet.redThrees.value}
            min={0}
            max={game === "canasta" ? 4 : 6}
            onChange={handleChange}
          />
          {game === "bolivia" && (
            <NumberInput
              id={`player-${player.id}`}
              label="Black Threes"
              scoreKey="blackThrees"
              value={player.scoreSheet.blackThrees.value}
              min={0}
              max={6}
              onChange={handleChange}
            />
          )}
        </div>
        <div className="player-row">
          <NumberInput
            id={`player-${player.id}`}
            label="Black Melds"
            scoreKey="blackMelds"
            value={player.scoreSheet.blackMelds.value}
            min={0}
            max={0}
            onChange={handleChange}
          />
          <NumberInput
            id={`player-${player.id}`}
            label="Canastas"
            scoreKey="canastas"
            value={player.scoreSheet.canastas.value}
            min={0}
            max={0}
            onChange={handleChange}
          />
        </div>
        {(game === "bolivia" || game === "samba") && (
          <div className="player-row">
            <NumberInput
              id={`player-${player.id}`}
              label="Sambas"
              scoreKey="sambas"
              value={player.scoreSheet.sambas.value}
              min={0}
              max={0}
              onChange={handleChange}
            />
            {game === "bolivia" && (
              <NumberInput
                id={`player-${player.id}`}
                label="Bolivias"
                scoreKey="bolivias"
                value={player.scoreSheet.bolivias.value}
                min={0}
                onChange={handleChange}
              />
            )}
          </div>
        )}
        <div className="player-row">
          <NumberInput
            id={`player-${player.id}`}
            label="Points in Hand"
            scoreKey="pointsInHand"
            value={player.scoreSheet.pointsInHand.value}
            min={0}
            max={0}
            step={5}
            onChange={handleChange}
          />
          <NumberInput
            id={`player-${player.id}`}
            label="Points on Table"
            scoreKey="pointsOnTable"
            value={player.scoreSheet.pointsOnTable.value}
            min={0}
            max={0}
            step={5}
            onChange={handleChange}
          />
        </div>
        <div className="player-row">
          <NumberInput
            id={`player-${player.id}`}
            label="Bonus Points"
            scoreKey="bonus"
            value={player.scoreSheet.bonus.value}
            min={0}
            max={0}
            step={5}
            onChange={handleChange}
          />
          <NumberInput
            id={`player-${player.id}`}
            label="Penalties"
            scoreKey="penalties"
            value={player.scoreSheet.penalties.value}
            min={0}
            max={0}
            step={5}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="player--footer">
        <div className="player__subtotal">Hand total: {player.subtotal}</div>
      </div>
    </section>
  );
}
