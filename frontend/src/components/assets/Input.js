import React from "react";

const Input = ({
  type,
  className,
  name,
  value,
  changeHandler,
  label,
  placeholder,
  multiple,
  minLength,
  min
}) => {
  return (
    <input
      type={type}
      className={className}
      name={name}
      value={value}
      onChange={changeHandler}
      aria-label={label}
      autoComplete="off"
      placeholder={placeholder}
      multiple={multiple}
      minLength={minLength}
      min={min}
    />
  );
};

export default Input;
