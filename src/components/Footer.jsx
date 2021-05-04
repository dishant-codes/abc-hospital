import React, { useState, useEffect } from "react";
import "./Footer.css";
import ListAltIcon from "@material-ui/icons/ListAlt";
import PeopleIcon from "@material-ui/icons/People";
import PersonIcon from "@material-ui/icons/Person";
import { NavLink } from "react-router-dom";
import firebase from "firebase";
function Footer() {
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
    <div className="footer">
      <div className="footer_nav">
        <ul className="footer-navlinks">
          <li>
            <NavLink className="nav-items" to="form">
              <ListAltIcon className="footer_items" />
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-items" to="doctor's-panel">
              <PeopleIcon className="footer_items" />
            </NavLink>
          </li>
          {!loggedin ? (
            <li>
              <NavLink className="nav-items  login" to="login">
                Log In
              </NavLink>
            </li>
          ) : (
            <li>
              <NavLink className="nav-items footer_items" to="login">
                <PersonIcon />
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Footer;
