import React from 'react'

const Input = ({ label, type, value, changeHandler, className, placeholder }) => {
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