import  SignedUpLandingTemplate  from "../assets/SignedUpLandingTemplate.png";
import { useNavigate } from "react-router-dom";

export const SignedUpLandingPage = () => {
  const navigate = useNavigate();
  return (
    //header with only left side
    <div>
      <div>
        Uncover Deals, Unleash Excitement: Dive into Our Auctions Today!
      </div>
      <div>
        <img src={SignedUpLandingTemplate} />
      </div>
      <div>
        <button onClick={() => navigate("/login")}>Login now</button>
      </div>
    </div>
  );
};
