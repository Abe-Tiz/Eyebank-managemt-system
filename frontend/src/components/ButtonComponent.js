import React from 'react'
import '../static/styles/button.css'
import Colors from './../config/Colors';
const ButtonComponent = ({
  title,
  onClick,
  disabled,
  canSubmit,
  customClass,
}) => {
  return (
    <div>
      <button
        disabled={disabled}
        type="submit"
        onClick={onClick}
        className={`bg-sky-900 cursor-pointer ${customClass }  px-3 py-2 text-2xl text-white font-extrabold mt-3 mr-5  ${
          canSubmit
            ? "disabled:cursor-no-drop disabled:border-1 disabled:bg-gradient-to-br disabled:from-gray-400 disabled:to-gray-600 disabled:text-gray-400 group-invalid:pointer-events-none group-invalid:bg-gradient-to-br group-invalid:from-gray-100 group-invalid:to-gray-300 group-invalid:text-gray-400 group-invalid:opacity-80"
            : ""
        }`}
      >
        {title}
      </button>
    </div>
  );
};

export default ButtonComponent