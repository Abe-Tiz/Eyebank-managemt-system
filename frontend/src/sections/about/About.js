import React, { useState, useEffect } from "react";
import "../../static/styles/home.css";
import Header from "../header/Header";
import Footer from "../footer/footer";
// import { Typewriter } from "react-simple-typewriter";
import { useTranslation } from "react-i18next";
import Typewriter from "typewriter-effect";

const paragraphStyles = {
  WebkitLineClamp: 3,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  display: "-webkit-box",
};

const About = () => {
  const [isOpen2, setIsOpen2] = useState(false);
  const imgaePath3 = process.env.PUBLIC_URL + "/images/eyet1.jpg";
  const paragraphStyles = {
    maxHeight: "200px",
    overflow: "hidden",
  };

  return (
    <>
      <Header />
      <div className="about-section" id="about">
        <h2 className="title">About Us</h2>
        <div className="container">
          <div className="row">
            <div className="column">
              <img className="img-ab" src={imgaePath3} alt="about us" />
            </div>
            <div className="column">
              <div className="content">
                <p
                  className="description"
                  style={{
                    ...(isOpen2 ? null : paragraphStyles),
                    textAlign: "center",
                    marginTop: "20px",
                    fontSize: "16px",
                    color: "#333",
                    padding: "10px",
                    backgroundColor: "#f5f5f5",
                    borderRadius: "5px",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  At Eye Bank Management System, we are committed to
                  facilitating the noble cause of eye donation and
                  transplantation. Our organization serves as a bridge between
                  eye donors and those in need of corneal transplants, ensuring
                  that the gift of sight is shared with those who need it the
                  most. Our organization serves as a bridge between eye donors
                  and those in need of corneal transplants, ensuring that the
                  gift of sight is shared with those who need it the most.
                </p>
                <button
                  className="read-more-button"
                  onClick={() => setIsOpen2(!isOpen2)}
                >
                  {isOpen2 ? "Read less ..." : "Read more..."}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
