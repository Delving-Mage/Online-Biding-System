import "./App.css";
import { Header } from "./components/header";
import { useState } from "react";
import { HomePage } from "./components/homePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "./components/loginPage";
import { SignupPage } from "./components/signupPage";
import { Dashboard } from "./components/dashboard";
import { AuctionDetail } from "./components/auctionDetails";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [signupFlag,setSignupFlag] = useState(false);
  const [loginFlag,setLoginFlag] = useState(false);
  return (
    <div className="App">
      <BrowserRouter>
        <Header isLoggedIn={isLoggedIn} signupFlag={signupFlag} setSignupFlag={setSignupFlag}/>
        <Routes>
          <Route
            path="/"
            element={!isLoggedIn?<HomePage isLoggedIn={isLoggedIn} />:<Dashboard isLoggedIn={isLoggedIn} />}
          ></Route>
          <Route path="/login" element={<LoginPage sigupFlag={signupFlag} setSignupFlag={setSignupFlag} setIsLoggedIn={setIsLoggedIn}/>}></Route>
          <Route path="/signup" element={<SignupPage sigupFlag={signupFlag} setSignupFlag={setSignupFlag}/>}></Route>
          <Route path="/auction/:auctionId" element={<AuctionDetail />} />

        </Routes>
        
      </BrowserRouter>
    </div>
  );
}

export default App;
