import React from 'react'

const Input = ({ type, className, value, changeHandler, label, placeholder }) => {
  return (
    <input 
      type={type}
      className={className}
      value={value}
      onChange={changeHandler}
      aria-label={label}
      autoComplete='off'
      placeholder={placeholder}
    />
  )
}

export default Input