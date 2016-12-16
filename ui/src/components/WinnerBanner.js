import React, { PropTypes } from 'react';
import Button from './Button';
import '../styles/WinnerBanner.scss';

const WinnerBanner = (props) => {
  return (
    <div className="winner-banner">
      <h1>WINNER!</h1>
      <h2>{props.winner}</h2>
      <div className="banner-container">
        <div className="angle left"></div>
        <div className="angle right"></div>
        <div className="banner">{props.message}</div>
      </div>
      <Button onClick={props.onPlayAgain} backgroundColor={'#565175'}>
        PLAY AGAIN
      </Button>
    </div>
  );
};

WinnerBanner.propTypes = {
  winner: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string,
  onPlayAgain: PropTypes.func.isRequired
};

export default WinnerBanner;
