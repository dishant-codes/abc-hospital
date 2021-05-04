import React, { useState, useEffect } from "react";
import "./Head.css";
import { NavLink } from "react-router-dom";
import firebase from "firebase";
function Head() {
  const [loggedin, setLoggedin] = useState(false);
  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        setLoggedin(true);
      } else {
        setLoggedin(false);
      }
      console.log(loggedin);
    });
  }, [loggedin]);

  return (
    <div className="header">
      <h1>ABC Hospital</h1>
      <div className="navbar">
        <ul className="navlinks">
          <li>
            <NavLink className="nav-items" to="doctor's-panel">
              Medical Professionals
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-items" to="form">
              Patients Form
            </NavLink>
          </li>
          {!loggedin ? (
            <li>
              <NavLink className="nav-items" to="login">
                Log In
              </NavLink>
            </li>
          ) : (
            <li>
              <NavLink className="nav-items" to="login">
                Profile
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Head;
