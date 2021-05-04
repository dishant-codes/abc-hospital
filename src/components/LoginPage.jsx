import React, { useEffect, useState } from "react";
import firebase from "firebase";

function LoginPage({ setLoggedin, setDrname }) {
  const [logEmail, setLogEmail] = useState("");
  const [pass, setPass] = useState("");

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // user is signed in.
        setLoggedin(true);
      } else {
        // No user is signed in.
        setLoggedin(false);
      }
      console.log("login page");
    });
  }, []);

  const LogIn = () => {
    // Login;
    firebase
      .auth()
      .signInWithEmailAndPassword(logEmail, pass)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        setDrname(user.email);
        const rememberMe = true;
        localStorage.setItem("rememberMe", rememberMe);
        localStorage.setItem("user", rememberMe ? user.email : "");
        // alert(user.email + " is Loggedin successful");
      })
      .catch((error) => {
        var errorMessage = error.message;
        alert("Error: " + errorMessage);
      });
  };

  return (
    <div>
      <div className="login-container">
        <h1>Doctor's Login Page </h1>
        <div className="form">
          <div className="log_email">
            <label>Email</label>
            <input
              type="email"
              value={logEmail}
              onChange={(e) => setLogEmail(e.target.value)}
              name="email"
              id="emain_id"
            />
          </div>
          <div className="password">
            <label>Password</label>
            <input
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              name="password"
              id="pass_id"
            />
          </div>
          <button className="btn_login" onClick={LogIn} type="submit">
            login
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
