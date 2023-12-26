import React from "react";
import "../../static/styles/footer.css";
import { BsFacebook } from "react-icons/bs";
import { BiLogoLinkedin } from "react-icons/bi";
import { FaTwitter, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Footer() {
  // const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="footer">
      <div className="sb_footer section_padding">
        <div className="sb_footer-links">
          <div className="sb_footer-links-div">
            <Link to="/">{t("Home")}</Link>
            <Link to="/about">{t("About")}</Link>
            <Link to="/aware">{t("Awarness")}</Link>
            <Link to="/contact">{t("Contact")}</Link>
          </div>
          <div className="sb_footer-links-div">
            {/* <h4>Coming Soon on </h4> */}

            <div className="socialmedia">
              <a href="#" className="social_link">
                <FaInstagram className="social_link-icon" size={24} />
              </a>
              <a href="#" className="social_link">
                <FaTwitter className="social_link-icon" size={24} />
              </a>
              <a href="#" className="social_link">
                <BiLogoLinkedin className="social_link-icon" size={24} />
              </a>
              <a href="#" className="social_link">
                <BsFacebook className="social_link-icon" size={24} />
              </a>
            </div>
          </div>
        </div>

        <hr></hr>

        <div className="sb_footer-below">
          <div className="sb_footer-copyright">
            <p>@{new Date().getFullYear()} Eye Bank. All rights reserved.</p>
          </div>
          <div className="sb_footer-below-links">
            <a href="/terms">
              <div>
                <p>Terms & Conditions</p>
              </div>
            </a>
            <a href="/privacy">
              <div>
                <p>Privacy</p>
              </div>
            </a>
            <a href="/security">
              <div>
                <p>Security</p>
              </div>
            </a>
            <a href="/cookie">
              <div>
                <p>Cookie Declaration</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
