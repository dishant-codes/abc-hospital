import React, { useState, useEffect, memo } from "react";
import firebase from "firebase";
import "./DrInfo.css";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import HomeIcon from "@material-ui/icons/Home";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import D1 from "./male_doctor.png";
import D2 from "./female_doctor.png";
import D3 from "./male_doctor.png";
import { db } from "../firebase";
import Details from "./Details";

function DrInfo() {
  const [avatar, setAvatar] = useState();
  const [doctorname, setDoctorname] = useState("");
  const [patientsList, setPatients] = useState();
  const [dept, setDept] = useState("");
  const [dropdown, setDropdown] = useState(false);
  const [NavHeight, setNavHeight] = useState("0px");
  const [details, setDetails] = useState("Dashboard");
  const rememberMe = localStorage.getItem("rememberMe") === "true";
  const docname = rememberMe ? localStorage.getItem("user") : "";
  useEffect(() => {
    if (docname === "doctor1@gmail.com") {
      setAvatar(D1);
      setDoctorname("One");
      setDept("General Physician");
    } else if (docname === "doctor2@gmail.com") {
      setAvatar(D2);
      setDoctorname("Two");
      setDept("Eye Specialist");
    } else {
      setAvatar(D3);
      setDoctorname("Three");
      setDept("Dentist");
    }
  }, [docname]);

  const LogOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
        alert(docname + " is Logout successful");
      })
      .catch((error) => {
        // An error happened.
        alert("Error: " + error);
      });
  };
  useEffect(() => {
    db.collection("Patients")
      .where("Doctor", "==", "Dr. " + doctorname)
      .get()
      .then((snapshot) => {
        const patients = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          patients.push(data);
        });
        setPatients(patients);
      })
      .catch((error) => {
        // An error happened.
        alert("Error: " + error);
      });
  }, [doctorname]);

  return (
    <div className="Dr_portal">
      <div className="sidebar">
        <div className="profile">
          <img src={avatar} alt="profile" srcset="" height="70" width="70" />

          <div className="profile_info">
            <small>Welcome</small>{" "}
            <span className="name">{"Dr." + doctorname}</span>
            <small>{dept}</small>
            <div className="logout-container">
              <ExitToAppIcon
                className="logout_btn"
                onClick={LogOut}
                style={{ cursor: "pointer" }}
              />
              <span className="msg">Log out</span>
            </div>
          </div>
        </div>
        <div className="navigation">
          <div className="nav_head">
            <p>manu</p>
            {dropdown ? (
              <ArrowDropUpIcon
                className="dropdown"
                onClick={() => {
                  setDropdown(false);
                  setNavHeight("0px");
                }}
              />
            ) : (
              <ArrowDropDownIcon
                className="dropup"
                onClick={() => {
                  setDropdown(true);
                  setNavHeight("270px");
                }}
              />
            )}
          </div>

          <div className="nav-manu" style={{ maxHeight: NavHeight }}>
            <div className="nav-item" onClick={() => setDetails("Dashboard")}>
              <HomeIcon />
              <span>Dashboard</span>
            </div>
            <div className="nav-item" onClick={() => setDetails("Appointment")}>
              <EventAvailableIcon />
              <span>Appointment</span>
            </div>
            <div className="nav-item" onClick={() => setDetails("Patients")}>
              <PermIdentityIcon />
              <span>Patients</span>
            </div>
            <div className="nav-item" onClick={() => setDetails("Payments")}>
              <AccountBalanceWalletIcon />
              <span>Payments</span>
            </div>
          </div>
        </div>
      </div>
      <div className="details">
        <Details patientsList={patientsList} details={details} />
      </div>
    </div>
  );
}

export default memo(DrInfo);
