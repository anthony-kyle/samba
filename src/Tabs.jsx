import { useState } from "react";
import Player from "./Player";

export function Tabs({ players, handleScoreChange, children, game, setSubtotal, ...props }) {
  const [activeTab, setActiveTab] = useState(0);
  const [editing, setEditing] = useState(null);

  const handleNameChange = (e, index) => {
    const [player, setPlayer] = players[index];
    setPlayer({ ...player, name: e.target.value });
  };

  const handleKeypress = (e) => {
    if (e.key === "Enter") {
      setEditing(null);
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
        {players.map(([player, setPlayer], index) => (
          <button
            key={`player_${index}_tab`}
            className={index === activeTab ? "active" : ""}
            onClick={() => setActiveTab(index)}
          >
            <div className="player-name">
              {editing === player.id ? (
                <div className="name-editor">
                  <input
                    type="text"
                    onChange={(e) => handleNameChange(e, index)}
                    onBlur={() => setEditing(null)}
                    onKeyDown={handleKeypress}
                    value={player.name}
                  />
                  <div className="btn" onClick={() => setEditing(null)}>Save</div>
                </div>
              ) : (
                <div onClick={() => setEditing(player.id)}>{player.name}</div>
              )}
            </div>
            <div className="player-score">
              Score: <span className="em">{player.score}</span>
            </div>
            <div className="player-meld">
              Melding: <span className="em">{initialMeld(player)}</span>
            </div>
          </button>
        ))}
      </div>
      <div className="tab-content">
        {players.map(([player, setPlayer], index) => (
          <Player key={`player-${index}`} player={player} setSubtotal={setSubtotal} game={game} handleScoreChange={handleScoreChange} className={activeTab === index ? 'active' : ''} />
        ))}
      </div>
    </div>
  );
}
