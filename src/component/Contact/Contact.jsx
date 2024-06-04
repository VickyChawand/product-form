import React, { useState } from "react";
import './contact.css';

const Contact = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');

  const handleFirstname = (e) => {
    const val = e.target.value;
    const isValid = /^[A-Za-z]+$/.test(val);

    if (!isValid) {
        alert("Invalid input for First Name");
      }
      else if(val.length < 1){
        alert("Input field can't be empty");
      }
    setFirstName(val);
    console.log("First name", val);
  };

  const handleLastname = (e) => {
    const val = e.target.value;
    const isValid = /^[A-Za-z]+$/.test(val);

    if (!isValid) {
        alert("Invalid input for Last Name");
      }
      else if(val.length < 1){
        alert("Input field can't be empty");
      }
    setLastName(val);
    console.log("Last name", val);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };


  const handlePhoneNumber = (e) => {
    const val = e.target.value;
    const isValid = /^[1-9]\d*$/.test(val);

    if (!isValid) {
        alert("Invalid input for Phon Number");
      }
      else if(val.length < 1){
        alert("Input field can't be empty");
      }
    setPhone(val);
    console.log("Phone:" , val);
  };

  const handleCompany = (e) => {
    const val = e.target.value;
    const isValid = /^[A-Za-z]+$/.test(val);

    if (!isValid) {
        alert("Invalid input for Company");
      }
      else if(val.length < 1){
        alert("Input field can't be empty");
      }
    setCompany(val);
    console.log("Company", val); 
  }

  return (
    <div className="outter-main">
      <h3>Contact Details</h3>
      <div className="details">
        <label>First Name</label>
        <input type="text" value={firstName} onChange={handleFirstname} />
      </div>
      <div className="details">
        <label>Last Name</label>
        <input type="text" value={lastName} onChange={handleLastname} />
      </div>
      <div className="details">
        <label>Email</label>
        <input type="email" value={email} onChange={handleEmail}/>
      </div>
      <div className="details">
        <label>Phone</label>
        <input  value={phone} onChange={handlePhoneNumber} />
      </div>
      <div className="details">
        <label>Company</label>
        <input type="text" value={company} onChange={handleCompany} />
      </div>
    </div>
  );
};

export default Contact;
