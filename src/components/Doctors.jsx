import React from "react";
import maleDoctor from "./male_doctor.png";
import FemaleDoctor from "./female_doctor.png";
import { NavLink } from "react-router-dom";
import "./Doctors.css";
function Doctors() {
  const Dr_Info = [
    {
      name: "Dr.One",
      spaciality: "General Physician",
      img: maleDoctor,
    },
    {
      name: "Dr.Two",
      spaciality: "Eye Spacialist",
      img: FemaleDoctor,
    },
    {
      name: "Dr.Three",
      spaciality: "Dentist",
      img: maleDoctor,
    },
  ];
  return (
    <>
      <div className="Doctors-container">
        <h1>Cunsulting Doctors</h1>
        <div className="dr-cards">
          {Dr_Info.map((val, index) => {
            return (
              <div id={index} key={index} className="dr-card">
                <img src={val.img} width="300px" height="300px" alt="" />
                <h4>{val.name}</h4>
                <p>{val.spaciality}</p>
                <NavLink className="appoint-btn" to="form">
                  Appointment
                </NavLink>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
export default Doctors;
