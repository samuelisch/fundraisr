import React from "react";

const Button = ({ type, clickHandler, text, className, value }) => {
  return (
    <button className={className} type={type} onClick={clickHandler} value={value}>
      {text}
    </button>
  );
};

export default Button;
