import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";  // Import axios to fetch user data
import "../styles/header.css";
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoMdArrowDropdown } from "react-icons/io";
import { PiTranslateFill } from "react-icons/pi";
import { FaUserCircle } from "react-icons/fa";  // Import user icon
import Logo from '../assets/Logo.png'
export const Header = ({ isLoggedIn, setSignupFlag, signupFlag }) => {
  const navigate = useNavigate();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [userData, setUserData] = useState({ username: "", email: "" });

  // Fetch user data from backend
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');  // Get the token from localStorage
        const res = await axios.get('https://online-biding-system.onrender.com/api/users/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(res.data); // Set the fetched user data
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };

    if (isLoggedIn) fetchUserData();
  }, [isLoggedIn]);

  return (
    <nav>
      <ul className={!signupFlag || isLoggedIn ? "flex-container" : "container"}>
        <li
          onClick={() => {
            setSignupFlag(false);
            navigate("/");
          }}
          className="flex-itemHeader"
        >
          <img src={Logo} alt="Logo" /> Genix Auctions
        </li>
        {!signupFlag || isLoggedIn ? (
          <React.Fragment>
            <li className="flex-itemBold">
              <div>Auctions <RiArrowDropDownLine /></div>
            </li>
            <li className="flex-item">
              <div>Bidding <RiArrowDropDownLine /></div>
            </li>
            <li className="flex-item">
              <div>About us <RiArrowDropDownLine /></div>
            </li>
            <li className="flex-item">
              <div><PiTranslateFill /> English <IoMdArrowDropdown /></div>
            </li>
            {!isLoggedIn ? (
              <li className="flex-item">
                <button
                  className="login_Btn"
                  onClick={() => {
                    setSignupFlag(true);
                    navigate("/login");
                  }}
                >
                  Login
                </button>
              </li>
            ) : null}
            {isLoggedIn ? (
              <li className="flex-item profile-container">
                <button
                  className="profile-btn"
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                >
                  <FaUserCircle size={32} />
                </button>

                {/* Profile Dropdown */}
                {showProfileDropdown && (
                  <div className="profile-dropdown">
                    <div className="profile-header">
                      <img src={userData.profileImage || 'default-profile.png'} alt="Profile" className="profile-image" />
                      <div>
                        <p>{userData.username}</p>
                        <p className="profile-email">{userData.email}</p>
                      </div>
                    </div>
                    <ul>
                      <li>View profile</li>
                      <li>Settings</li>
                      <li>My bids</li>
                      <li>Credit cards</li>
                      <li>My Auctions</li>
                      <li>Invite colleagues</li>
                      <li>Notifications</li>
                      <li>Community</li>
                      <li>Support</li>
                      <li>API</li>
                      <li onClick={() => {
                        localStorage.removeItem('token');
                        navigate('/login');
                      }}>Log out</li>
                    </ul>
                  </div>
                )}
              </li>
            ): <button
            className="signup_Btn"
            onClick={() => {
              setSignupFlag(true);
              navigate("/signup");
            }}
          >
            Get Started
          </button>}
          </React.Fragment>
        ) : null}
      </ul>
    </nav>
  );
};
