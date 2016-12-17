import React, { PropTypes } from 'react';
import '../styles/WinningLine.scss';

const WinningLine = (props) => {
  const horizontal = {
    transform: 'rotate(90deg)',
    transformOrigin: 'left top',
    right: '-3%'
  };

  const vertical = {
    top: '0'
  };

  const diagonal = {
    left: '46%',
    height: '128%',
    top: '-14%'
  };

  const styleMap = {
    '0,1,2': { ...horizontal, top: '14%' },
    '3,4,5': { ...horizontal, top: '48%' },
    '6,7,8': { ...horizontal, top: '83%' },
    '0,3,6': { ...vertical, left: '13%' },
    '1,4,7': { ...vertical, left: '48%' },
    '2,5,8': { ...vertical, left: '83%' },
    '0,4,8': { ...diagonal, transform: 'rotate(-45deg)' },
    '2,4,6': { ...diagonal, transform: 'rotate(45deg)' }
  };

  if (!props.path) {
    return null;
  }

  return (
    <div className="winning-line" style={styleMap[props.path]}>
      <div className="fill"></div>
    </div>
  );
};

WinningLine.propTypes = {
  path: PropTypes.string
};

export default WinningLine;
