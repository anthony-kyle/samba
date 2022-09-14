import { useState } from "react";
import Player from "./Player";

export function Tabs({ players, children, game, ...props }) {
  const [activeTab, setActiveTab] = useState(0);
  const [editing, setEditing] = useState(false);

  const handleNameChange = (e, index) => {
    const [player, setPlayer] = players[index];
    setPlayer({ ...player, name: e.target.value });
  };

  const handleKeypress = (e) => {
    if (e.key === "Enter") {
      setEditing(false);
    }
  };

  const initialMeld = (player) => {
    if (player.score < 0) {
      return 15;
    } else if (player.score < 1500) {
      return 50;
    } else if (player.score < 3000) {
      return 90;
    } else if (player.score < 7000) {
      return 120;
    }

    return 150;
  };
  return (
    <div className="tabs">
      <div className="tab-list">
        {players.map((player, index) => (
          <button
            key={`player_${index}_tab`}
            className={index === activeTab ? "active" : ""}
            onClick={() => setActiveTab(index)}
          >
            <div className="player-name">
              {editing ? (
                <div className="name-editor">
                  <input
                    type="text"
                    onChange={(e) => handleNameChange(e, index)}
                    onBlur={() => setEditing(false)}
                    onKeyDown={handleKeypress}
                    value={player[0].name}
                  />
                  <button className="btn" onClick={() => setEditing(false)}>Save</button>
                </div>
              ) : (
                <div onClick={() => setEditing(!editing)}>{player[0].name}</div>
              )}
            </div>
            <div className="player-score">
              Score: <span className="em">{player[0].score}</span>
            </div>
            <div className="player-meld">
              Melding: <span className="em">{initialMeld(player[0])}</span>
            </div>
          </button>
        ))}
      </div>
      <div className="tab-content">
        <Player player={players[activeTab]} game={game} />
      </div>
    </div>
  );
}
