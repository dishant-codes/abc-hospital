import React, { useEffect, useState } from "react";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import PersonIcon from "@material-ui/icons/Person";
import CanvasJSReact from "./canvasjs.react";
import { db } from "../firebase";
import "./Dashboard.css";
function Dashboard() {
  const [newpatients, setNewPatient] = useState(0);
  const [chartData, setChartData] = useState({});
  // var CanvasJS = CanvasJSReact.CanvasJS;
  var CanvasJSChart = CanvasJSReact.CanvasJSChart;
  useEffect(() => {
    db.collection("Patients")
      .where("Patient_Type", "==", "New")
      .get()
      .then((snapshot) => {
        let counter = snapshot.size;
        setNewPatient(counter);
        console.log(newpatients);
      });
  }, [newpatients]);
  const chart = () => {
    setChartData({
      title: {
        text: "HOSPITAL SURVEY",
      },
      axisX: {
        title: "Timeline",
        valueFormatString: "MMM",
      },
      axisY: {
        title: "Patients",
      },
      height: 300,
      data: [
        {
          type: "spline",
          lineThickness: 2,
          dataPoints: [
            { x: new Date(2021, 1), y: 26 },
            { x: new Date(2021, 2), y: 38 },
            { x: new Date(2021, 3), y: 43 },
            { x: new Date(2021, 4), y: 29 },
            { x: new Date(2021, 5), y: 41 },
            { x: new Date(2021, 6), y: 54 },
          ],
        },
      ],
    });
  };
  useEffect(() => {
    chart();
  }, []);
  return (
    <div>
      <div className="dashboard">
        <h2>Dashboard</h2>
        <div className="status">
          <div className="new_patients">
            <div className="status-title">
              <small>New Patient</small>
              <span>{newpatients}</span>
            </div>
            <PersonIcon className="status-icon" />
          </div>
          <div className="hospital_earn">
            <div className="status-title">
              <small>Hospital Earning</small>
              <span> RS.30,600/-</span>
            </div>
            <AccountBalanceIcon className="status-icon" />
          </div>
        </div>

        <div className="charts">
          <CanvasJSChart options={chartData} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
