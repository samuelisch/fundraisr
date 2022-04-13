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
  min,
}) => {
  return (
    <input
      type={type}
      className="w-64 h-12 px-4 text-sm text-gray-700 bg-white border border-gray-200 rounded-lg focus:border-primary focus:outline-none focus:ring focus:ring-primary focus:ring-opacity-20 p-1 m-3"
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
