import React, { useState, useEffect } from "react";
import "./DrInfo.css";
import Appointment from "./Appointment";
import Dashboard from "./Dashboard";
import PatientsDetails from "./Patients_details";
import PaymentDetails from "./Payment_details";
function Details({ patientsList, details, EditIcon }) {
  const [dashboard, setDashboard] = useState(false);
  const [appointment, setAppointment] = useState(false);
  const [patients, setPatients] = useState(false);
  const [payment, setPayments] = useState(false);

  useEffect(() => {
    if (details === "Dashboard") {
      setDashboard(true);
      setAppointment(false);
      setPatients(false);
      setPayments(false);
    } else if (details === "Appointment") {
      setDashboard(false);
      setAppointment(true);
      setPatients(false);
      setPayments(false);
    } else if (details === "Patients") {
      setDashboard(false);
      setAppointment(false);
      setPatients(true);
      setPayments(false);
    } else if (details === "Payments") {
      setDashboard(false);
      setAppointment(false);
      setPatients(false);
      setPayments(true);
    } else {
      setDashboard(true);
    }
  }, [details]);
  return (
    <div>
      {dashboard ? <Dashboard patientsList={patientsList} /> : ""}
      {appointment ? <Appointment patientsList={patientsList} /> : ""}
      {patients ? <PatientsDetails patientsList={patientsList} /> : ""}
      {payment ? <PaymentDetails patientsList={patientsList} /> : ""}
    </div>
  );
}

export default Details;
