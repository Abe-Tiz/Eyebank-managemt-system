import React, { useState } from 'react';
// import './home.css';
import '../static/styles/home.css'
const Home = () => {
    const imagePath = process.env.PUBLIC_URL + '/images/eye2.png';
    const imagePath2 = process.env.PUBLIC_URL + '/images/eyet2.jpg';
    const imagePath3 = process.env.PUBLIC_URL + '/images/eyet3.jpg';

    const [tagline, setTagline] = useState("Explore the World of Vision with EyeBank");
    const changeTagline = () => {
        setTagline("Explore the World of Vision with EyeBank");
    };

    const [showFullDescription, setShowFullDescription] = useState(false);
    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription);
    };

    return (
        <div className="container">
            <h1 className="tagline" onClick={changeTagline}>{tagline}</h1>

            <div className="eye-section">
                <img src={imagePath} alt="Eye" />
                <h2 className="title">The Miraculous Eye</h2>
                <p className="description">
                    The eye is an incredible organ that allows us to see the world around us. It is a complex structure composed
                    of many different parts working together to provide vision. From the cornea to the retina, each component
                    plays a vital role in the process of sight.
                </p>
            </div>

            <div className="transplanted-persons-section">
                <h2>Transplanted Persons</h2>

                <div className="person">
                    <img src={imagePath3} alt="Person 1" />
                    <h3 className="person-name">John Doe</h3>
                    <p className={`description ${showFullDescription ? '' : 'truncated'}`}>
                        John Doe is a recipient of a corneal transplant. He was suffering from a condition called keratoconus,
                        which caused his cornea to become thin and misshapen. After the transplant, his vision improved
                        significantly, and he can now see the world clearly.
                    </p>
                    <button className="read-more-button" onClick={toggleDescription}>
                        {showFullDescription ? 'Read Less' : 'Read More'}
                    </button>
                </div>

                <div className="person">
                    <img src={imagePath2} alt="Person 2" />
                    <h3 className="person-name">Jane Smith</h3>
                    <p className={`description ${showFullDescription ? '' : 'truncated'}`}>
                        Jane Smith had a corneal transplant due to a corneal injury she sustained in an accident. The transplant
                        restored her vision and allowed her to resume her normal activities. She is grateful for the gift of sight
                        she received through the transplant.
                    </p>
                    <button className="read-more-button" onClick={toggleDescription}>
                        {showFullDescription ? 'Read Less' : 'Read More'}
                    </button>
                </div>
            </div>
            <div>
                <p className={`description ${showFullDescription ? '' : 'truncated'}`}>
                    Jane Smith had a corneal transplant due to a corneal injury she sustained in an accident. The transplant
                    restored her vision and allowed her to resume her normal activities. She is grateful for the gift of sight
                    she received through the transplant.
                </p>
            </div>
        </div>
    );
};

export default Home;
