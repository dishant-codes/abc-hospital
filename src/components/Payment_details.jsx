import React from "react";
import EditIcon from "@material-ui/icons/Edit";

function PaymentDetails({ patientsList }) {
  return (
    <div>
      <div className="payment-details">
        <h2>Payments</h2>
        <div className="patient_list">
          <div className="table-title">
            <label>Pateints</label>
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
              <th>Fees paid</th>
            </tr>
            {patientsList &&
              patientsList.map((patients) => {
                return (
                  <tr className="table_row">
                    <td>{patients.Registration_No}</td>
                    <td>{patients._FirstName}</td>
                    <td>{patients._LastName}</td>
                    <td>{patients.Gender}</td>
                    <td>{patients.Fees_Paid}</td>
                  </tr>
                );
              })}
          </table>
        </div>
      </div>
    </div>
  );
}

export default PaymentDetails;
