import React, { useState, useEffect } from 'react';
import "../../static/styles/home.css";
import Header from '../header/Header';
import Footer from '../footer/footer';
import { useTranslation } from "react-i18next";
import Typewriter from "typewriter-effect";


const paragraphStyles = {
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    display: '-webkit-box',
}

const Home = () => {
    const imagePath = process.env.PUBLIC_URL + '/images/eye2.png';
    const imagePath2 = process.env.PUBLIC_URL + '/images/eyet2.jpg';
    const imagePath3 = process.env.PUBLIC_URL + '/images/eyet3.jpg';
    const imagePath4 = process.env.PUBLIC_URL + '/images/eyet1.jpg';

    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const [isOpen3, setIsOpen3] = useState(false);
    const [isOpen4, setIsOpen4] = useState(false);

    return (
        <>
            {/* <Header /> */}

            <div className="container">
                <h1 className='text-blue-600/50'>{t("translation:tagLabel2")}</h1>
                <p className="text-blue-600/80">{t("translation:tagLabel")}</p>

                <Typewriter
                    options={{
                        strings: [t("translation:tagLabel2")],
                        autoStart: true,
                        loop: true,
                    }}
                />

                <div className="eye-section">
                    <img src={imagePath} alt="Eye" />
                    <h2 className="title">{t('mracleTitle')}</h2>
                    <p className="description" style={isOpen4 ? null : paragraphStyles} >
                        {t('homeDescriptionLabel')}
                    </p>
                    <button className="read-more-button" onClick={() => setIsOpen4(!isOpen4)}>
                        {isOpen4 ? 'Read less...' : 'Read more...'}
                    </button>
                </div>

                <div className="transplanted-persons-section">
                    <h2>{t('transplant')} </h2>

                    <div className="person">
                        <img src={imagePath3} alt="Person 1" />
                        <h3 className="person-name">John Doe</h3>
                        <p className="description" style={isOpen ? null : paragraphStyles} >
                            John Doe is a recipient of a corneal transplant. He was suffering
                            from a condition called keratoconus, which caused his cornea to
                            become thin and misshapen. After the transplant, his vision
                            improved significantly, and he can now see the world clearly.
                        </p>
                        <button className="read-more-button" onClick={() => setIsOpen(!isOpen)}>
                            {isOpen ? 'Read less...' : 'Read more...'}
                        </button>
                    </div>

                    <div className="person">
                        <img src={imagePath2} alt="Person 2" />
                        <h3 className="person-name">Jane Smith</h3>
                        <p className="description" style={isOpen3 ? null : paragraphStyles} >
                            Jane Smith had a corneal transplant due to a corneal injury she
                            sustained in an accident. The transplant restored her vision and
                            allowed her to resume her normal activities. She is grateful for
                            the gift of sight she received through the transplant.
                        </p>
                        <button className="read-more-button" onClick={() => setIsOpen3(!isOpen3)}>
                            {isOpen3 ? 'Read Less' : 'Read More'}
                        </button>
                    </div>
                </div>

                {/* <div class="about-section" id="about">
         <h2 className="title">About Us</h2>
         <div class="container">
           <div class="row">
             <div class="column">
               <img class="img-ab" src={imagePath4} alt="about us"/>
             </div>
             <div class="column">
               <div class="content">
                 <p className="description" style={{ ...isOpen2 ? null : paragraphStyles, textAlign: 'center', marginTop: '20px', fontSize: '16px', color: '#333', padding: '10px', backgroundColor: '#f5f5f5', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                   At Eye Bank Management System, we are committed to facilitating the noble cause of eye donation
                   and transplantation. Our organization serves as a bridge between eye donors and those
                   in need of corneal transplants, ensuring that the gift of sight is shared with those
                   who need it the most. Our organization serves as a bridge between eye donors and those
                   in need of corneal transplants, ensuring that the gift of sight is shared with those
                   who need it the most.
                 </p>
                 <button className="read-more-button" onClick={()=>setIsOpen2(!isOpen2)}>
                   {isOpen2?'Read less ...':'Read more...'}
                 </button>
               </div>
             </div>
           </div>
         </div>
       </div> */}

            </div>
            {/* <Footer /> */}
        </>
    );
}

export default Home;