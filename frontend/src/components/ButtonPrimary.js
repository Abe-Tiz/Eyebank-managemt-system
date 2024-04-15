import React from 'react'
import '../static/styles/button.css'
const ButtonPrimary = ({ title, onClick, customClass }) => {
  return (
    <div>
      {/* btn  */}
      <button
        type="submit"
        className={`w-48 ${customClass} bg-gray-300 border-2 border-sky-700 hover:bg-sky-700 px-3 py-2 text-2xl text-gray-500 hover:text-white font-bold mt-3 mr-5`}
        onClick={onClick}
      >
        {title}
      </button>
    </div>
  );
};

export default ButtonPrimary

