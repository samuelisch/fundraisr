import React from 'react'

const Input = ({ label, type, value, changeHandler, className }) => {
  return (
    <input 
      type={type}
      className={className}
      value={value}
      changeHandler={changeHandler}
      aria-label={label}
      autoComplete='off'
    />
  )
}

export default Input