import React from "react";
import "../static/styles/button.css";
import Colors from "./../config/Colors";
import {Link, useNavigate } from 'react-router-dom';

const ButtonPrimary = ({ title }) => {
    const navigate = useNavigate();
    return (
        <div>
            <Link 
                to='/login'
                style={{ backgroundColor: Colors.orangeColor }}
                className="common_button2"
            >
        
            {title}
        </Link>
        </div>
    );
};

export default ButtonPrimary;
