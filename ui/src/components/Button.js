import React from 'react';
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

export default Button;
