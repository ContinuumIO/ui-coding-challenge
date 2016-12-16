import React, { PropTypes } from 'react';
import '../styles/Square.scss';

const Square = ({onClick, winner, children}) => {
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

Square.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default Square;
