import React from 'react';
import '../styles/Player.scss';

const Player = (props) => {
  return (
    <div className={`player ${props.isWinner ? 'winner' : ''}`}>
      <div className={`is-current ${props.isCurrent && 'active'}`}></div>
      <div className="name">{props.name}</div>
    </div>
  );
};

export default Player;
