import React from 'react'
// import "../static/styles/signup.css";

const InputField = ({ name, type, placeholder, onChange,pattern }) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      required
      className="border-2 border-gray-300 p-2 hover:bg-gray-200 w-full md:w-60 [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400 valid:[&:not(:placeholder-shown)]:border-green-500"
      pattern={pattern}
    />
  );
};

export default InputField