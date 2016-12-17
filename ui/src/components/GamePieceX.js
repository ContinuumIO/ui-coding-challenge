import React from 'react';
import '../styles/GamePieceX.scss';

const GamePieceX = () => {
  return (
    <div className="game-piece-x">
      <div className="length one">
        <div className="filler"></div>
      </div>

      <div className="length two">
        <div className="filler"></div>
      </div>
    </div>
  );
};

export default GamePieceX;
