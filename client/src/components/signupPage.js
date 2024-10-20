import SignupTemplate from "../assets/SignupTemplate.png";
import { useEffect, useState } from "react";
import { SignedUpLandingPage } from "./signedUpLandingPage";
import "../styles/signupPage.css";
import { FaGoogle, FaApple, FaFacebook } from "react-icons/fa";
import axios from "axios";

export const SignupPage = ({ signupFlag, setSignupFlag }) => {
  useEffect(() => {
    setSignupFlag(true);
  }, [signupFlag]);

  const [signedFlag, setSignedFlag] = useState(false);
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    receiveEmails: false,
  });

  const [formErrors, setFormErrors] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validateForm = () => {
    let errors = {};
    let valid = true;

    if (!formData.userName) {
      errors.userName = "Username is required.";
      valid = false;
    }

    if (!formData.email) {
      errors.email = "Email is required.";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid email address.";
      valid = false;
    }

    if (!formData.password) {
      errors.password = "Password is required.";
      valid = false;
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters.";
      valid = false;
    }

    setFormErrors(errors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        await axios.post("https://online-biding-system.onrender.com/api/users/register", formData);
        setSignedFlag(true); // Switch to success landing page
      } catch (err) {
        setError("Registration failed. Please try again.");
      }
    }
  };

  return !signedFlag ? (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2 className="signup-header">Sign up</h2>
        <p className="signup-subheader">
          New bidders, as soon as you have submitted your information, you will
          be eligible to bid in the auction.
        </p>

        <div className="input-group">
          <label htmlFor="userName">User Name</label>
          <input
            name="userName"
            placeholder="User Name"
            type="text"
            value={formData.userName}
            onChange={handleInputChange}
            required
          />
          {formErrors.userName && (
            <p className="error-message">{formErrors.userName}</p>
          )}
        </div>

        <div className="input-group">
          <label htmlFor="email">Email Address</label>
          <input
            name="email"
            placeholder="olivia@untitledui.com"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          {formErrors.email && <p className="error-message">{formErrors.email}</p>}
        </div>

        <div className="input-group password-group">
          <label htmlFor="password">Password</label>
          <input
            name="password"
            placeholder="************"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          {formErrors.password && (
            <p className="error-message">{formErrors.password}</p>
          )}
        </div>

        <div className="checkbox-group">
          <input
            type="checkbox"
            name="receiveEmails"
            checked={formData.receiveEmails}
            onChange={handleInputChange}
          />
          <label>Receive outbid emails</label>
        </div>

        <button className="submit-btn" type="submit">
          Submit
        </button>

        {error && <p className="form-error">{error}</p>}

        <div className="signup-alternate">
          <p>or sign up with</p>
          <div className="social-buttons">
            <a href="" className="social-btn google">
              <FaGoogle />
              Google
            </a>
            <a href="" className="social-btn apple">
              <FaApple />
              Apple
            </a>
            <a href="" className="social-btn facebook">
              <FaFacebook />
              Facebook
            </a>
          </div>
        </div>

        <div className="auction-rules">
          Want to know more? <a href="">Auction rules</a>
        </div>
      </form>

      <img
        className="signup-image"
        src={SignupTemplate}
        alt="Sign up template"
      />
    </div>
  ) : (
    <SignedUpLandingPage />
  );
};
