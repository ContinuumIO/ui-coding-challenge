import React, { PropTypes } from 'react';
import '../styles/Button.scss';

const Button = (props) => {
  const style = {
    backgroundColor: props.backgroundColor || ''
  };

  return (
    <button
      className="button"
      type={props.type}
      disabled={props.disabled}
      onClick={props.onClick}
      style={style}
    >
      {props.children}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  backgroundColor: PropTypes.string
};

export default Button;
