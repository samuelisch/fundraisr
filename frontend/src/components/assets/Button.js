import React from "react";

const Button = ({ type, clickHandler, text, className, value, disabled }) => {
  return (
    <button
      className={className}
      type={type}
      onClick={clickHandler}
      value={value}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
