import React from 'react'
import '../static/styles/button.css'
import Colors from './../config/Colors';
const ButtonComponent = ({title,onClick}) => {
  return (
    <div>
      <button onClick ={onClick} style={{backgroundColor:Colors.primaryButton}} type='submit' className="common_button">
        {title}
      </button>
    </div>
  );
}

export default ButtonComponent