import { useEffect, useState } from 'react';
import './App.css';
import { GameSettings } from './GameSettings';
import { Tabs } from './Tabs';
import { useLocalStorageState } from './utils';

function App() {
  const [numPlayers, setNumPlayers] = useLocalStorageState(
    {
      key: 'numPlayers',
      initialValue: 2
    });
  const player1 = useLocalStorageState(
    { key: 'player_one', initialValue: { id: 1, name: 'Player 1', score: 0 } });
  const player2 = useLocalStorageState(
    { key: 'player_two', initialValue: { id: 2, name: 'Player 2', score: 0 } });
  const player3 = useLocalStorageState(
    { key: 'player_three', initialValue: { id: 3, name: 'Player 3', score: 0 } });
  const [players, setPlayers] = useState(parseInt(numPlayers) === 3 ? [player1, player2, player3] : [player1, player2]);
  const [game, setGame] = useLocalStorageState({key: 'game', initialValue: 'samba',  });

  const handlePlayerCountChange = (e) => {
    setNumPlayers(e.target.value)
  }

  const changeGame = (e) => {
    setGame(e.target.value)
  }

  const newGame = () => {
    player1[1]({ ...player1[0], score: 0 })
    player2[1]({ ...player2[0], score: 0 })
    player3[1]({ ...player3[0], score: 0 })
  }

  useEffect(() => {
    if (parseInt(numPlayers) === 3) {
      setPlayers([player1, player2, player3]);
    } else {
       setPlayers([player1, player2]);
    }
  }, [numPlayers, setPlayers, player1[0], player2[0], player3[0]]);

  return (
    <div className="App">
      <main>
        <GameSettings numPlayers={numPlayers} handlePlayerCountChange={handlePlayerCountChange} game={game} changeGame={changeGame} newGame={newGame} />
        {<Tabs players={players} game={game} />}
      </main>
    </div>
  );
}

export default App;
