import React from 'react'
// import "../static/styles/signup.css";

const InputField = ({
  name,
  value,
  onChange,
  isValidAge,
  errorMessage,
  placeholder,
  type,
}) => {
  return (
    <div className="flex flex-col items-start">
      <input
        name={name}
        className={`border-2 border-gray-300 p-2 hover:bg-gray-200 w-full md:w-60 ${
          isValidAge ? "border-red-400 " : "border-green-500"
        }`}
        type={type}
        placeholder={placeholder}
        value={value}
              onChange={onChange}
              required
      />
      {isValidAge && <div className="warning text-danger">{errorMessage}</div>}
    </div>
  );
};

export default InputField