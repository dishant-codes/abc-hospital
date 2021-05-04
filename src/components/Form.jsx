import React, { useEffect, useState } from "react";
import "./Form.css";
import googlePay from "./images.png";
import phonePe from "./phonepe.jpg";
import cards from "./cards.jpg";
import { db } from "../firebase";
import firebase from "firebase";

function Form() {
  const [Name, setName] = useState({
    firstName: "",
    lastName: "",
  });
  const [address, setAddress] = useState({
    addressLine1: "",
    addressLine2: "",
    city: "",
    states: "",
    zipCode: "",
  });

  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("Male");
  const [history, setHistory] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [payment, setPayment] = useState("");
  const [count, setCount] = useState(0);
  const [patientType, setpatientType] = useState("New");
  const [fees, setFees] = useState(true);
  const [fee, setFee] = useState("Rs.300/-");
  const [doctor, setDoctor] = useState("");
  const [department, setDepartment] = useState("");
  const [appointDate, setAppointDate] = useState("");
  const [title, setTitle] = useState("New Patient Registration");

  useEffect(() => {
    db.collection("Patients")
      .get()
      .then((snapshot) => {
        let counter = snapshot.size;
        setCount(counter);
        // console.log(count);
      });
  }, [count]);

  const handleSubmit = (e) => {
    e.preventDefault();
    db.collection("Patients")
      .doc(Name.firstName + " " + Name.lastName)
      .set({
        Patient_Type: patientType,
        Registration_No: count + 1,
        Fees_Paid: fee,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        _FirstName: Name.firstName,
        _LastName: Name.lastName,
        Mobile_No: mobile,
        Email_ID: email,
        Appointment_date: appointDate,
        Gender: gender,
        Patient_History: history,
        Patient_Symptoms: symptoms,
        Doctor: doctor,
        Department: department,
        Address:
          address.addressLine1 +
          ", " +
          address.addressLine2 +
          ", " +
          address.city +
          ", " +
          address.states +
          ", " +
          address.zipCode,
        Payment_Method: payment,
      })
      .then(() => {
        alert("Form has been Submitted");
        resetValue();
      })
      .catch((error) => {
        alert(error);
      });
    const resetValue = () => {
      Name.firstName = "";
      Name.lastName = "";
      address.addressLine1 = "";
      address.addressLine2 = "";
      address.city = "";
      address.states = "";
      address.zipCode = "";
      setMobile("");
      setEmail("");
      setGender("Male");
      setHistory("");
      setSymptoms("");
      setPayment("");
      setpatientType("New");
      setDepartment("");
      setDoctor("");
      setFee("Rs.300/-");
      setFees(true);
    };
  };

  const ChangeHandler = (e) => {
    setName({ ...Name, [e.target.name]: e.target.value });
  };

  const CheckPatientType = (type) => {
    if (type === "Renewal") {
      setpatientType("Renewal");
      setFees(false);
      setFee("Rs.200/-");
      setTitle("Renewal Patient");
    } else {
      setpatientType("New");
      setFees(true);
      setFee("Rs.300/-");
      setTitle("New Patient Registration");
    }
  };
  const CheckDept = (type) => {
    if (type === "Dr. One") {
      setDepartment("General Physician");
    } else if (type === "Dr. Two") {
      setDepartment("Eye Specialist");
    } else if (type === "Dr. Three") {
      setDepartment("Dentist");
    } else {
      setDepartment("");
    }
  };
  return (
    <div className="form">
      <div className="form-title">
        <h1>{title}</h1>
        <span>Please fill in the form below</span>
      </div>
      <form action="" onSubmit={handleSubmit}>
        <div className="name">
          <label>Patient Name</label>
          <div className="fname">
            <input
              type="text"
              name="firstName"
              value={Name.firstName}
              onChange={ChangeHandler}
              required
            />
            <span>First Name</span>
          </div>

          <div className="lname">
            <input
              type="text"
              name="lastName"
              value={Name.lastName}
              onChange={ChangeHandler}
              required
            />
            <span>Last Name</span>
          </div>
        </div>
        <div className="patientType">
          <label>Select patient type</label>
          <select
            name="department"
            id="department"
            onChange={(e) => {
              CheckPatientType(e.target.value);
            }}
          >
            <option value="New">New</option>
            <option value="Renewal">Renewal</option>
          </select>
        </div>
        <div className="address">
          <label>Address</label>
          <div className="street-address">
            <input
              type="text"
              name="addressLine1"
              value={address.addressLine1}
              onChange={(e) =>
                setAddress({ ...address, [e.target.name]: e.target.value })
              }
              required
            />
            <span>Street Address</span>
          </div>
          <div className="street-address">
            <input
              type="text"
              name="addressLine2"
              value={address.addressLine2}
              onChange={(e) =>
                setAddress({ ...address, [e.target.name]: e.target.value })
              }
              required
            />
            <span>Street Address line 2</span>
          </div>
          <div className="city-state">
            <div className="city">
              <input
                type="text"
                name="city"
                value={address.city}
                onChange={(e) =>
                  setAddress({ ...address, [e.target.name]: e.target.value })
                }
                required
              />
              <span>City</span>
            </div>
            <div className="state">
              <input
                type="text"
                name="states"
                value={address.states}
                onChange={(e) =>
                  setAddress({ ...address, [e.target.name]: e.target.value })
                }
                required
              />
              <span>State</span>
            </div>
          </div>
          <div className="zip-code">
            <input
              type="text"
              name="zipCode"
              value={address.zipCode}
              onChange={(e) =>
                setAddress({ ...address, [e.target.name]: e.target.value })
              }
              required
            />
            <span>Postal / Zip Code</span>
          </div>
        </div>
        <div className="mobile-no">
          <label>Mobile No.</label>
          <input
            type="text"
            value={mobile}
            placeholder="eg. 8788233512"
            maxLength="10"
            minLength="10"
            onChange={(e) => setMobile(e.target.value)}
            required
          />
        </div>
        <div className="email">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <span>example@example.com</span>
        </div>
        <div className="gender">
          <label>Gender</label>
          <input
            type="radio"
            name="gender"
            value={gender}
            onClick={() => setGender("Male")}
            required
          />{" "}
          Male <br />
          <input
            type="radio"
            name="gender"
            value={gender}
            onClick={() => setGender("Female")}
            required
          />{" "}
          Female
        </div>
        <div className="patient-history">
          <lebal>Patient's History</lebal>
          <textarea
            name="petient's_history"
            placeholder="Type here..."
            rows="7"
            value={history}
            onChange={(e) => setHistory(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="symptoms">
          <lebal>Symptoms</lebal>
          <textarea
            name="sysmptoms"
            placeholder="Type here..."
            rows="7"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="appointment_date">
          <lebal className="appoitment_label">Appointment Date</lebal>
          <input
            type="date"
            name="date"
            id="date"
            onChange={(e) => setAppointDate(e.target.value)}
          />
        </div>
        <div className="department">
          <label>Select a Department</label>
          <select
            name="department"
            id="department"
            onChange={(e) => {
              setDoctor(e.target.value);
              CheckDept(e.target.value);
            }}
          >
            <option>Select department</option>
            <optgroup label="General Physician">
              <option value="Dr. One">Dr. One</option>
            </optgroup>
            <optgroup label="Eye Specialist">
              <option value="Dr. Two">Dr. Two</option>
            </optgroup>
            <optgroup label="Dentist">
              <option value="Dr. Three">Dr. Three</option>
            </optgroup>
          </select>
        </div>

        <div className="paymant-option">
          <h3>Payment Fees {fees ? "Rs.300/-" : "Rs.200/-"} </h3>
          <label>Select a payment method</label>
          <div className="pay-method">
            <input
              type="radio"
              name="paymant"
              value={payment}
              onClick={() => setPayment("Google Pay")}
              id=""
              required
            />
            <img src={googlePay} alt="google pay" height="50px" width="100px" />
          </div>
          <div className="pay-method">
            <input
              type="radio"
              name="paymant"
              value={payment}
              onClick={() => setPayment("PhonePe")}
              id=""
              required
            />
            <img src={phonePe} alt="PhonePe" height="40px" width="100px" />
          </div>
          <div className="pay-method">
            <input
              type="radio"
              name="paymant"
              value={payment}
              id=""
              onClick={() => setPayment("Credit Card")}
              required
            />
            <img src={cards} alt="Credit Card" height="40px" width="170px" />
          </div>
          <div className="pay-method">
            <input
              type="radio"
              name="paymant"
              value={payment}
              onClick={() => setPayment("Net Banking")}
              id=""
              required
            />
            <lebal>Net Banking</lebal>
            <select id="bank_name" required>
              <option className="default" disabled value="default">
                Choose an Option
              </option>
              <option value="Axis_Bank">Axis Bank</option>
              <option value="HDFC_Bank">HDFC Bank</option>
              <option value="ICICI_Bank">ICICI Bank</option>
              <option value="Kotak_Bank">Kotak Bank</option>
              <option value="State_Bank_of_India">State Bank of India</option>
              <option value="Bank_of_Maharastra">Bank of Maharastra</option>
              <option value="Cosmos_Bank">Cosmos Bank</option>
              <option value="Union_Bank_of_India">Union Bank of India</option>
              <option value="Dena_Bank">Dena Bank</option>
              <option value="Yes_Bank_Ltd">Yes Bank Ltd</option>
            </select>
          </div>
        </div>
        <button className="submit" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Form;
