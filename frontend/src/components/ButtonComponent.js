import React from 'react'
import '../static/styles/button.css'
import Colors from './../config/Colors';
const ButtonComponent = ({title,onClick}) => {
  return (
    <div>
      {/* <button
        onClick={onClick}
        style={{ backgroundColor: Colors.primaryButton }}
        type="submit"
        className="common_button"
      >
        {title}
      </button> */}
      <button
        type="submit"
        onClick={onClick}
        className="common_button bg-green hover:bg-gray-400 px-5 py-2 text-2xl text-white font-extrabold mt-3 mr-5 "
      >
        {title}
      </button>
    </div>
  );
}

export default ButtonComponent