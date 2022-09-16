import { useState } from "react";
import { HamburgerButton } from "./HamburgerButton";

export const GameSettings = ({
  newGame,
  changeGame,
  game,
  numPlayers,
  handlePlayerCountChange,
}) => {
  const [visible, setVisible] = useState(false);

  const handleMenuOpen = () => {
    setVisible(!visible);
  }
  return (
    <header>
      <div className="topBar">
        <div className="gameName">{game} scorecard</div>
        <HamburgerButton
          open={visible}
          onClick={handleMenuOpen}
          aria-label="Open Settings"
        />
      </div>
      <div className={`game-settings ${visible ? "open" : ""}`}>
        <div className="game-settings__block">
          <div>&nbsp;</div>
          <button type="button" className={`btn`} onClick={newGame}>
            New Game
          </button>
        </div>
        <div className="game-settings__block">
          <div>Select Game</div>
          <select onChange={changeGame} value={game}>
            <option value="canasta">Canasta</option>
            <option value="samba">Samba</option>
            <option value="bolivia">Bolivia</option>
          </select>
        </div>
        <div className="game-settings__block">
          <div>Players: {numPlayers}</div>
          <input
            type="range"
            min="2"
            max="4"
            value={numPlayers}
            onChange={handlePlayerCountChange}
          />
        </div>
      </div>
    </header>
  );
};
