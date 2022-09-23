import {useEffect, useState} from 'react';
import {Scorefield} from './Scorefield';
import {SlideToggle} from './SlideToggle';

export default function Player({player: initialPlayer, game, ...props}) {
  const [player, setPlayer] = initialPlayer;
  const [subtotal, setSubtotal] = useState(0);
  const [scores, setScores] = useState({
    win: {value: 0, score: 0, multiplier: 100},
    redThrees: {value: 0, score: 0, multiplier: 100},
    blackThrees: {value: 0, score: 0, multiplier: -100},
    blackMelds: {value: 0, score: 0, multiplier: 300},
    canastas: {value: 0, score: 0, multiplier: 500},
    sambas: {value: 0, score: 0, multiplier: 1500},
    bolivias: {value: 0, score: 0, multiplier: 2500},
    pointsInHand: {value: 0, score: 0, multiplier: -1},
    pointsOnTable: {value: 0, score: 0, multiplier: 1},
    penalties: {value: 0, score: 0, multiplier: -1},
    bonus: {value: 0, score: 0, multiplier: 1},
  });

  const resetForm = () => {
    for (const score in scores) {
      scores[score].value = 0;
      scores[score].score = 0;
    }
    setSubtotal(0);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const newPlayer = {
      ...player,
    };

    if (newPlayer.score >= 0 && subtotal >= 0) {
      newPlayer.score += subtotal;
      console.log(player, newPlayer, subtotal);
      setPlayer(newPlayer);
      resetForm();
    }
  };

  const performScoreChange = ({target, action, min, max, step}) => {
    const newScores = {
      ...scores,
    };
    const newScore = newScores[target];

    switch (action) {
      case 'increment':
        if (newScore.value < max) {
          newScore.value+=step;
        }
        break;
      case 'decrement':
        if (newScore.value > min) {
          newScore.value-=step;
        }
        break;
      case 'reset':
        newScore.value = 0;
        break;
      case 'toggle':
        newScore.value = newScore.value === 0 ? 1 : 0;
        break;
      default:
        break;
    }

    switch (target) {
      case 'redThrees':
        newScore.multiplier =
          (game === 'canasta' && newScore.value === 4) || newScore.value === 6
            ? 200
            : 100;
        break;
      default:
        break;
    }

    newScore.score = newScore.value * newScore.multiplier;
    setScores(newScores);
  };

  const handleScoreChange = (e, key) => {
    const newScore = {...scores};
    let multiplier = newScore[key].multiplier;
    let value = 0;
    if (key !== 'win') {
      value = parseInt(e.target.value);
    }

    switch (key) {
      case 'win':
        value = newScore[key].value === 0 ? 1 : 0;
        break;
      case 'redThrees':
        multiplier =
          (game === 'canasta' && value === 4) || value === 6 ? 200 : 100;
        break;
      default:
        break;
    }

    newScore[key].value = value;
    newScore[key].score = value * multiplier;

    setScores(newScore);
  };

  const handleFocus = (e) => {
    e.target.select();
  };

  useEffect(() => {
    let newSubtotal = 0;
    for (const score in scores) {
      newSubtotal += scores[score].score;
    }
    setSubtotal(newSubtotal);
  }, [scores]);

  const handleNull = (e) => {
    const value = e.target.value;
    if (typeof value !== 'number' || value < 0) e.target.value = 0;
  };

  return (
    <>
      <div className='subtotal'>Hand total: {subtotal}</div>
      <div className='player'>
        <Scorefield
          counterName='win'
          label='Win'
          value={scores.win.value}
          controller={performScoreChange}
          on='toggle'
          off='toggle'
        />
        <Scorefield
          counterName='redThrees'
          label='Red Threes'
          value={scores.redThrees.value}
          controller={performScoreChange}
          max={game === 'canasta' ? 4 : 6}
        />
        {game === 'bolivia' ? (
          <Scorefield
            counterName='blackThrees'
            label='Black Threes'
            value={scores.blackThrees.value}
            controller={performScoreChange}
            max={6}
          />
        ) : null}
        <Scorefield
          counterName='blackMelds'
          label='Black Melds'
          value={scores.blackMelds.value}
          controller={performScoreChange}
        />
        <Scorefield
          counterName='canastas'
          label='Canastas'
          value={scores.canastas.value}
          controller={performScoreChange}
        />
        {game === 'bolivia' || game === 'samba' ? (
          <Scorefield
            counterName='sambas'
            label={game === 'samba' ? 'Sambas' : 'Escaleras'}
            value={scores.sambas.value}
            controller={performScoreChange}
          />
        ) : null}
        {game === 'bolivia' ? (
          <Scorefield
            counterName='bolivias'
            label='Bolivias'
            value={scores.bolivias.value}
            controller={performScoreChange}
          />
        ) : null}
        <Scorefield
          counterName='pointsInHand'
          label='Points in hand'
          value={scores.pointsInHand.value}
          controller={performScoreChange}
          step={5}
          />
        <Scorefield
          counterName='pointsOnTable'
          label='Points on table'
          value={scores.pointsOnTable.value}
          controller={performScoreChange}
          step={5}
        />
        <Scorefield
          counterName='penalties'
          label='Penalties'
          value={scores.penalties.value}
          controller={performScoreChange}
          step={5}
        />
        <Scorefield

          counterName='bonus'
          label='Bonus'
          value={scores.bonus.value}
          controller={performScoreChange}
          step={5}
        />
      </div>
      <div className='player--footer'>
        <div className='player__subtotal'>Hand total: {subtotal}</div>
        <button type='button' className='btn' onClick={handleSave}>
          Save Hand
        </button>
      </div>
    </>
  );
}
