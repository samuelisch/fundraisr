import React from 'react';

const Button = ({ type, clickHandler, text, className }) => {
  return (
    <button className={className} type={type} onClick={clickHandler}>{text}</button>
  )
}

export default Button