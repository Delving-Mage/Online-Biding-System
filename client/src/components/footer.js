import React from "react";
import { FaTwitter, FaFacebook, FaInstagram, FaGithub } from "react-icons/fa";
import "../styles/footer.css";
import Logo from '../assets/Logo.png';
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Left section: Logo and company name */}
        <div className="footer-left">
          <div className="logo">
            <img
              src={Logo}
              alt="Genix Auctions Logo"
              className="logo-img"
            />
          </div>
          <p className="company-name">Genix Auctions</p>
        </div>

        {/* Middle section: Navigation Links */}
        <div className="footer-middle">
          <div className="footer-links">
            <h4>Products</h4>
            <ul>
              <li>
                <a href="#">About us</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
            </ul>
          </div>
          <div className="footer-links">
            <h4>Auctions</h4>
          </div>
          <div className="footer-links">
            <h4>Bidding</h4>
          </div>
        </div>

        {/* Right section: Social icons */}
        <div className="footer-right">
          <div className="social-icons">
            <a href="#" className="social-icon">
              <FaTwitter />
            </a>
            <a href="#" className="social-icon">
              <FaFacebook />
            </a>
            <a href="#" className="social-icon">
              <FaInstagram />
            </a>
            <a href="#" className="social-icon">
              <FaGithub />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom section: Copyright */}
      <div className="footer-bottom">
        <p>© Copyright 2024, All Rights Reserved by Genix</p>
      </div>
    </footer>
  );
};

export default Footer;
