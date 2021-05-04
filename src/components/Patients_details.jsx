import React from "react";
import EditIcon from "@material-ui/icons/Edit";

function PatientsDetails({ patientsList }) {
  return (
    <div>
      <div className="patients-details">
        <h2>Pateints</h2>
        <div className="patient_list">
          <div className="table-title">
            <label>Your Patient</label>
            <a
              href="https://console.firebase.google.com/u/2/project/abc-hospital-a9e05/firestore/data~2FPatients"
              target="_blank"
              rel="noreferrer"
            >
              <EditIcon />
            </a>
          </div>
          <table>
            <tr className="table_row">
              <th>Registration No</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Gender</th>
              <th>Type</th>
            </tr>
            {patientsList &&
              patientsList.map((patients) => {
                return (
                  <tr className="table_row">
                    <td>{patients.Registration_No}</td>
                    <td>{patients._FirstName}</td>
                    <td>{patients._LastName}</td>
                    <td>{patients.Gender}</td>
                    <td>{patients.Patient_Type}</td>
                  </tr>
                );
              })}
          </table>
        </div>
      </div>
    </div>
  );
}

export default PatientsDetails;
