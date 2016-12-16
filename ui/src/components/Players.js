import React, { PropTypes } from 'react';
import Player from './Player';
import '../styles/Players.scss';

const Players = (props) => {
  return (
    <div className="players">
      {props.players.map((player, i) => (
        <Player
          key={i}
          name={player}
          symbol={i === 0 ? 'X' : 'O'}
          isWinner={props.winner !== false && props.winner === i}
          isCurrent={i === props.currentPlayer}
        />
      ))}
    </div>
  );
};

Players.propTypes = {
  players: PropTypes.array.isRequired
};

export default Players;
