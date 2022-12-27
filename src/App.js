import { useEffect, useState } from 'react';
import './App.css';
import { GameSettings } from './GameSettings';
import { Tabs } from './Tabs';
import { useLocalStorageState } from './utils';

const scoreSheet = {
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
}

function App() {
  const [numPlayers, setNumPlayers] = useLocalStorageState(
    {
      key: 'numPlayers',
      initialValue: 2
    });
  const [player1, setPlayer1] = useLocalStorageState(
    { key: 'player_one', initialValue: { id: 1, name: 'Player 1', score: 0, scoreSheet: { ...scoreSheet }, subtotal: 0 } });
  const [player2, setPlayer2] = useLocalStorageState(
    { key: 'player_two', initialValue: { id: 2, name: 'Player 2', score: 0, scoreSheet: { ...scoreSheet }, subtotal: 0 } });
  const [player3, setPlayer3] = useLocalStorageState(
    { key: 'player_three', initialValue: { id: 3, name: 'Player 3', score: 0, scoreSheet: { ...scoreSheet }, subtotal: 0 } });
  const [players, setPlayers] = useState(parseInt(numPlayers) === 3 ? [[player1, setPlayer1], [player2, setPlayer2], [player3, setPlayer3]] : [[player1, setPlayer1], [player2, setPlayer2]]);
  const [game, setGame] = useLocalStorageState({ key: 'game', initialValue: 'samba', });

  const handlePlayerCountChange = (e) => {
    setNumPlayers(e.target.value)
  }

  const changeGame = (e) => {
    setGame(e.target.value)
  }

  const updatePlayer = async (player) => {
    switch (player.id){
      case 1:
        setPlayer1(player);
        return;
      case 2:
        setPlayer2(player);
        return;
      case 3:
        setPlayer3(player);
        return;
      default:
        return;
    }
  }

  const setSubtotal = async (player) => {
    const newPlayer = { ...player };
    let subtotal = 0;
    for (let type of Object.values(newPlayer.scoreSheet)) {
      subtotal += type.score;
    }
    newPlayer.subtotal = subtotal;
    await updatePlayer(newPlayer);
  } 

  const newGame = () => {
    setPlayer1({ ...player1, score: 0, scoreSheet: { ...scoreSheet }, subtotal: 0 })
    setPlayer2({ ...player2, score: 0, scoreSheet: { ...scoreSheet }, subtotal: 0  })
    setPlayer3({ ...player3, score: 0, scoreSheet: { ...scoreSheet }, subtotal: 0  })
  }

  const savePlayerScore = async (player) => {
    const newPlayer = { ...player };
    newPlayer.score += newPlayer.subtotal;
    newPlayer.subtotal = 0;
    newPlayer.scoreSheet = scoreSheet;
    await updatePlayer(newPlayer);
  }


  const handleSave = async () => {
    await savePlayerScore(player1);
    await savePlayerScore(player2);
    await savePlayerScore(player3);
    window.location.reload();
  };


  const handleScoreChange = async (player, key, score) => {
    const newPlayer = { ...player };
    const newScore = { ...player.scoreSheet };
    let multiplier = newScore[key].multiplier;
    let value = score;

    switch (key) {
      case "redThrees":
        multiplier =
          (game === "canasta" && value === 4) || value === 6 ? 200 : 100;
        break;
      default:
        break;
    }

    newScore[key].value = value;
    newScore[key].score = value * multiplier;
    newPlayer.scoreSheet = newScore;

    await updatePlayer(player)
  };

  useEffect(() => {
    if (parseInt(numPlayers) === 3) {
      setPlayers([[player1, setPlayer1], [player2, setPlayer2], [player3, setPlayer3]]);
    } else {
      setPlayers([[player1, setPlayer1], [player2, setPlayer2]]);
    }
  }, [numPlayers, setPlayers, player1, player2, player3]);

  return (
    <div className="App">
      <main>
        <GameSettings numPlayers={numPlayers} handlePlayerCountChange={handlePlayerCountChange} game={game} changeGame={changeGame} newGame={newGame} />
        {<Tabs players={players} game={game} handleScoreChange={handleScoreChange} setSubtotal={setSubtotal} />}
      </main>
      <footer className="footer">
        <button type="button" className="btn" onClick={handleSave}>
          Save Hand
        </button>
      </footer>
    </div>
  );
}

export default App;
