import React from 'react';

const Tag = ({ text, clickHandler, className }) => {
  return (
    <div className={className} onClick={clickHandler}>
      <span>{text}</span>
    </div>
  )
}

export default Tag