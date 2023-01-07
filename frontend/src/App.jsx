import './App.css';
import axios from "axios";
import { useState } from 'react';

function App() {
  const [details, setDetails] = useState({name:"",rollNo:""});

  const onChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value })
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      console.log("clicked");
      console.log(details);
      await axios.post("/registerStudent", details);
      setDetails({name:"",rollNo:""});
    } catch (err) {
      console.log(err);
    }
  }

  const checkInHandler = async() => {

  }

  return (
    <div className="container">
      <h1 className='title'>Student Attendance System</h1>
      <div className='main'>
        <form className='registration-box' onSubmit={handleSubmit}>
          <label className='form-label' >Name</label>
          <input type="text" placeholder='Enter students full name' className='form-input' name='name' value={details.name} required onChange={onChange} />
          <label className='form-label'>RollNo</label>
          <input type="number" placeholder='Enter students roll no' className='form-input' name='rollNo' value={details.rollNo} required onChange={onChange} />
          <button className='submit-button button' type='submit'>Register</button>
        </form>
        <div className="student-info">
          <form className="student-form">
            <label className='form-label'>Name</label>
            <input type="text" placeholder='Enter students full name' className='form-input' />
            <label className='form-label'>RollNo</label>
            <input type="number" placeholder='Enter students roll no' className='form-input' />
          </form>
          <div className="button-box">
            <button className="checkIn button" onClick={checkInHandler}>Check In</button>
            <button className="checkOut button" >Check Out</button>
            <button className="studentDetails button" >Student Details</button>
          </div>
          <div className="count-box">
            <h4 className="count-statement">Total student present</h4>
            <h1 className='count'>12</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
