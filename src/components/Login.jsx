import React, { useState } from "react";
import "./Login.css";
import LoginPage from "./LoginPage";
import DrInfo from "./DrInfo";
function Login() {
  const [loggedin, setLoggedin] = useState(false);
  const [drname, setDrname] = useState("");
  return (
    <div>
      {!loggedin ? (
        <LoginPage setLoggedin={setLoggedin} setDrname={setDrname} />
      ) : (
        <DrInfo />
      )}
    </div>
  );
}

export default Login;
