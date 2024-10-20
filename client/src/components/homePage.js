import HomepageTemplate from "../assets/HomepageTemplate.png";
import HomepageWhiteAlertBox from "../assets/HomepageWhiteAlertBox.png";
import HomepageBlueAlertBox from "../assets/HomepageBlueAlertBox.png";
import HomepageAlertProfile from "../assets/HomepageAlertProfile.png";
import { Dashboard } from "./dashboard";
import { FaRegCirclePlay } from "react-icons/fa6";

import "../styles/homepage.css";
import Footer from "./footer";
export const HomePage = ({userName, isLoggedIn }) => {
  return (
    <>
      <div className="homepage-container">
        <div className="homepage-flexContainerItem">
          <div className="homepage-heading">
            Your Gateway to Extraordinary Finds
          </div>
          <p className="homepage-p">
            Unlock deals, bid smart, and seize the moment with our online
            bidding bonanza!
          </p>
          <button className="homepage-button">
            <FaRegCirclePlay />
            <div className="homepage-text">Watch Video</div>
          </button>
        </div>
        {/* add bg and other images of homepage */}
        <img className="homepage-bgImg" src={HomepageTemplate} />
        <img className="homepage-alertBoxTop" src={HomepageWhiteAlertBox} />
        <img className="homepage-alertBoxBottom" src={HomepageBlueAlertBox} />
        <img className="homepage-alertProfile" src={HomepageAlertProfile} />
        <div className="homepage-alertText">Seamless, lightweight! <div>Loving this site.</div></div>
      </div>

      <Dashboard userName={userName} isLoggedIn={isLoggedIn} />
    </>
  );
};
