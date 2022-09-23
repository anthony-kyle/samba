import { useState } from "react";
import Player from "./Player";

export function Tabs({ players, children, game, ...props }) {
  const [activeTab, setActiveTab] = useState(0);
  const [editing, setEditing] = useState(null);

  const handleNameChange = (e, index) => {
    const [player, setPlayer] = players[index];
    setPlayer({ ...player, name: e.target.value });
    console.log(players)
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
      {/* <div className="tab-list"> */}
        {players.map((player, index) => (
          <div class="column">
          <div
            key={`player_${index}_tab`}
            className={index === activeTab ? "active" : ""}
            // onClick={() => setActiveTab(index)}
          >
            <div className="player-name">
              {editing === player[0].id ? (
                <div className="name-editor">
                  <input
                    type="text"
                    onChange={(e) => handleNameChange(e, index)}
                    onBlur={() => setEditing(null)}
                    onKeyDown={handleKeypress}
                    value={player[0].name}
                  />
                  <div className="btn" onClick={() => setEditing(null)}>Save</div>
                </div>
              ) : (
                <div onClick={() => setEditing(player[0].id)}>{player[0].name}</div>
              )}
            </div>
            <div className="player-score">
              Score: <span className="em">{player[0].score}</span>
            </div>
            <div className="player-meld">
              Melding: <span className="em">{initialMeld(player[0])}</span>
            </div>
          </div>
        <Player player={players[activeTab]} game={game} />
        </div>
        ))}
      {/* </div>
      <div className="tab-content"> */}
      {/* </div>    </div> */}
    </div>
  );
}
