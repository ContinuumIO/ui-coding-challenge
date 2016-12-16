import React from 'react';
import '../styles/Square.scss';

const Square = ({fill, onClick, winner, children}) => {
  return (
    <div
      onClick={onClick}
      className={`square ${winner ? 'winner' : ''}`}>
      <div className="fill">
        {children}
      </div>
    </div>
  );
};

export default Square;
