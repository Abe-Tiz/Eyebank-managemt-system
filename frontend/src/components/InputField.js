import React from 'react'
// import "../static/styles/signup.css";

const InputField = ({ name, type, placeholder, onChange }) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      required
      className="border-2 border-gray-300  p-2 hover:bg-gray-200 w-60"
    />
  );
};

export default InputField