import LoginTemplate from "../assets/LoginTemplate.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaApple, FaFacebook, FaGoogle } from "react-icons/fa6";
import axios from "axios";

export const LoginPage = ({setUserName, signupFlag, setSignupFlag, setIsLoggedIn }) => {
  const navigate = useNavigate();
  useEffect(() => {
    setSignupFlag(true);
  }, [signupFlag]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    keepSignedIn: false,
  });

  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState('');

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
        const res = await axios.post('https://online-biding-system.onrender.com/api/users/login', formData);
        localStorage.setItem('token', res.data.token);
        setIsLoggedIn(true);
        navigate('/');
      } catch (err) {
        setError('Login failed. Please check your credentials.');
      }
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2 className="signup-header">Login </h2>
        <p className="signup-subheader">
          Welcome back! Enter your credentials to access your account.
        </p>

        <div className="input-group">
          <label htmlFor="email">Email Address</label>
          <input
            name="email"
            placeholder="hello@example.com"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          {formErrors.email && (
            <p className="error-message">{formErrors.email}</p>
          )}
        </div>

        <div className="input-group">
         <div className="input-label">
          <label htmlFor="password">Password</label>
          <a style={{textDecoration:"none"}} href="">Forgot Password</a></div>
          <input
            name="password"
            placeholder="************"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
          />
          {formErrors.password && (
            <p className="error-message">{formErrors.password}</p>
          )}
        </div>

        <div className="checkbox-group">
          <input
            type="checkbox"
            checked={formData.keepSignedIn}
            onChange={handleInputChange}
          />
          <label>Keep me signed in</label>
        </div>

        {error && <p className="form-error">{error}</p>}

        <div>
          <button className="submit-btn" type="submit">
            Continue
          </button>
        </div>

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

          <div className="login-footer">
            Don't have an account?{" "}
            <div className="auction-rules" onClick={() => navigate("/signup")}>
              Sign up here
            </div>
          </div>
        </div>
      </form>
      <img className="login_img" src={LoginTemplate} alt="Login Template" />
    </div>
  );
};
