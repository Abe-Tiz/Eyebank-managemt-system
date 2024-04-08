import React from 'react'
import '../static/styles/button.css'
const ButtonPrimary = ({ title, onClick }) => {
  return (
    <div>
      {/* btn  */}
      <button
        type="submit"
        className="bg-gray-300 hover:bg-sky-900 px-5 py-2 text-2xl text-gray-500 font-extrabold mt-3 mr-5 "
        onClick={onClick}
      >
        {title}
      </button>
    </div>
  );
};

export default ButtonPrimary

