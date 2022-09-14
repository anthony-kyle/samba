import { useCallback, useEffect, useState } from "react";
import { SlideToggle } from './SlideToggle';

export default function Player({ player: initialPlayer, game, ...props }) {
  const [player, setPlayer] = initialPlayer;
  const [subtotal, setSubtotal] = useState(0);
  const [scores, setScores] = useState({
    win: { value: 0, score: 0, multiplier: 100 },
    redThrees: { value: 0, score: 0, multiplier: 100 },
    blackThrees: { value: 0, score: 0, multiplier: -100 },
    blackMelds: { value: 0, score: 0, multiplier: 300 },
    canastas: { value: 0, score: 0, multiplier: 500 },
    sambas: { value: 0, score: 0, multiplier: 1500 },
    bolivias: { value: 0, score: 0, multiplier: 2500 },
    pointsInHand: { value: 0, score: 0, multiplier: -1 },
    pointsOnTable: { value: 0, score: 0, multiplier: 1 },
    penalties: { value: 0, score: 0, multiplier: -1 },
    bonus: { value: 0, score: 0, multiplier: 1 },
  });

  const calculateSubtotal = useCallback(
    (scoreValues) => {
      let newSubtotal = scoreValues?.reduce(
        (total, score) => total + score.score,
        0
      );
      setSubtotal(newSubtotal);
      return subtotal
    },
    [subtotal, setSubtotal]
  );

  const resetForm = () => {
    for (const score in scores) {
      scores[score].value = 0;
      scores[score].score = 0;
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    const newPlayer = {
      ...player,
    };
    newPlayer.score += subtotal;
    setPlayer(newPlayer);
    resetForm();
  };

  const handleScoreChange = (e, key) => {
    let value = parseInt(e.target.value);
    const newScore = { ...scores };
    let multiplier = newScore[key].multiplier;

    switch(key) {
      case 'win':
        value = newScore[key].value === 0 ? 1 : 0;
        break
      case 'redThrees':
        multiplier = ((game === "canasta" && value === 4) || value === 6) ? 200 : 100;
        break
      default:
        break
    }

    newScore[key].value = value;
    newScore[key].score = value * multiplier;

    setScores(newScore);
  };

  useEffect(() => {
    calculateSubtotal([
      scores.win,
      scores.redThrees,
      scores.blackThrees,
      scores.blackMelds,
      scores.canastas,
      scores.sambas,
      scores.bolivias,
      scores.pointsInHand,
      scores.pointsOnTable,
      scores.penalties,
      scores.bonus,
    ]);
  }, [
    calculateSubtotal,
    scores
  ]);

  const handleNull = (e) => {
    const value = e.target.value;
    if (typeof value !== "number" || value < 0) e.target.value = 0;
    calculateSubtotal();
  };

  return (
    <>
      <div className="subtotal">Hand total: {subtotal}</div>
      <div className="player">
        <label className="win">
          Won?
          <SlideToggle checked={scores.win.value === 1} onClick={(e) => handleScoreChange(e, 'win')} />
        </label>
        <label>
          Red Threes
          <input
            onBlur={handleNull}
            type="number"
            min="0"
            max={game === "canasta" ? 4 : 6}
            onChange={(e) => handleScoreChange(e, "redThrees")}
            value={scores.redThrees.value}
            defaultValue={0}
          />
        </label>
        {game === "bolivia" ? (
          <label>
            Black Threes
            <input
              onBlur={handleNull}
              type="number"
              min="0"
              max="6"
              onChange={(e) => handleScoreChange(e, "blackThrees")}
              value={scores.blackThrees.value}
            />
          </label>
        ) : null}
        <label>
          Black Melds
          <input
            onBlur={handleNull}
            type="number"
            min="0"
            onChange={(e) => handleScoreChange(e, "blackMelds")}
            value={scores.blackMelds.value}
          />
        </label>
        <label>
          Canastas
          <input
            onBlur={handleNull}
            type="number"
            min="0"
            onChange={(e) => handleScoreChange(e, "canastas")}
            value={scores.canastas.value}
          />
        </label>
        {game === "bolivia" || game === "samba" ? (
          <label>
            Sambas
            <input
              onBlur={handleNull}
              type="number"
              min="0"
              onChange={(e) => handleScoreChange(e, "sambas")}
              value={scores.sambas.value}
            />
          </label>
        ) : null}
        {game === "bolivia" ? (
          <label>
            Bolivias
            <input
              onBlur={handleNull}
              type="number"
              min="0"
              onChange={(e) => handleScoreChange(e, "bolivias")}
              value={scores.bolivias.value}
            />
          </label>
        ) : null}
        <label>
          Points in Hand
          <input
            onBlur={handleNull}
            type="number"
            min={0}
            onChange={(e) => handleScoreChange(e, "pointsInHand")}
            value={scores.pointsInHand.value}
            step="5"
          />
        </label>
        <label>
          Points on table
          <input
            onBlur={handleNull}
            type="number"
            min={0}
            onChange={(e) => handleScoreChange(e, "pointsOnTable")}
            value={scores.pointsOnTable.value}
            step="5"
          />
        </label>
        <label>
          Bonus Points
          <input
            onBlur={handleNull}
            type="number"
            min={0}
            onChange={(e) => handleScoreChange(e, "bonus")}
            value={scores.bonus.value}
            step="5"
          />
        </label>
        <label>
          Penalties
          <input
            onBlur={handleNull}
            type="number"
            min={0}
            onChange={(e) => handleScoreChange(e, "penalties")}
            value={scores.penalties.value}
            step="5"
          />
        </label>
      </div>
      <div className="player--footer">
        <div className="player__subtotal">Hand total: {subtotal}</div>
        <button type="button" className="btn" onClick={handleSave}>
          Save Hand
        </button>
      </div>
    </>
  );
}
