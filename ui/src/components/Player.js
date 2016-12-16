import React, { PropTypes } from 'react';
import '../styles/Player.scss';

const Player = (props) => {
  return (
    <div className={`player ${props.isWinner ? 'winner' : ''}`}>
      <div className={`is-current ${props.isCurrent && 'active'}`}></div>
      <div className="name">{props.name}</div>
    </div>
  );
};

Player.propTypes = {
  isWinner: PropTypes.bool,
  isCurrent: PropTypes.bool,
  name: PropTypes.string
};

export default Player;
