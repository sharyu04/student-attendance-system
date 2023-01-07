import './App.css';
import axios from "axios";
import { useState } from 'react';
import { useEffect } from 'react';
import dateFormat, { masks } from "dateformat";

function App() {
  const [details, setDetails] = useState({ name: "", rollNo: "" });
  const [student, setStudents] = useState({ name: "", rollNo: "" });
  const [alert, setAlert] = useState({ set: false, message: "" });
  const [totalPresent, setTotalPresent] = useState();

  const onChange1 = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value })
  }

  const onChange2 = (e) => {
    setStudents({ ...student, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("clicked");
      console.log(details);
      await axios.post("/registerStudent", details);
      setAlert({ set: 5, message: "Student registered successfully!" });
      setDetails({ name: "", rollNo: "" });
      setTimeout(() => {
        setAlert({ set: false, message: "" });
      }, 20000);
    } catch (err) {
      console.log(err);
      setAlert({ set: 3, message: `Roll no already registered!` });
      setDetails({ name: "", rollNo: "" });
      setTimeout(() => {
        setAlert({ set: false, message: "" });
      }, 20000);
    }
  }



  const checkInHandler = async () => {
    try {
      console.log("checkIn clicked");
      const res = await axios.put("/checkIn", student);
      console.log(res);
      setAlert({ set: 1, message: `Roll no ${student.rollNo} checked in!` });
      setStudents({ name: "", rollNo: "" });
      setTimeout(() => {
        setAlert({ set: false, message: "" });
      }, 20000);
    } catch (err) {
      console.log(err);
      setAlert({ set: 1, message: err.response.data })
    }
  }

  const checkOutHandler = async () => {
    try {
      console.log("checkout clicked");
      await axios.put("/checkOut", student);
      console.log("Done");
      setAlert({ set: 1, message: `Roll no ${student.rollNo} checked Out!` });
      setStudents({ name: "", rollNo: "" });
      setTimeout(() => {
        setAlert({ set: false, message: "" });
      }, 20000);
    } catch (err) {
      console.log(err)
      setAlert({ set: 1, message: err.response.data })
    }
  }

  const studentDetailsHandler = async () => {
    try {
      console.log("student details clicked");
      const std = await axios.post("/getStudent", student);
      console.log(std.data);
      setAlert({ set: 2, message: { rollNo: std.data.rollNo, name: std.data.name, checkInTime: std.data.checkInTime, checkOutTime: std.data.checkOutTime } });

      setStudents({ name: "", rollNo: "" });
      setTimeout(() => {
        setAlert({ set: false, message: "" });
      }, 20000);
    } catch (err) {
      setAlert({ set: 4, message: err.response.data });
    }
  }

  useEffect(() => {
    const fetchTotalCount = async () => {
      const count = await axios.post("/totalPresentStudents");
      console.log(count.data.count);
      setTotalPresent(count.data.count);
    }
    fetchTotalCount();
  }, [alert])

  return (
    <div className="container">
      <h1 className='title'>Student Attendance System</h1>
      <div className='main'>
        <form className='registration-box' onSubmit={handleSubmit}>
          <label className='form-label' >Name</label>
          <input type="text" placeholder='Enter students full name' className='form-input' name='name' value={details.name} required onChange={onChange1} />
          <label className='form-label'>RollNo</label>
          <input type="number" placeholder='Enter students roll no' className='form-input' name='rollNo' value={details.rollNo} required onChange={onChange1} />
          <button className='submit-button button' type='submit'>Register</button>
        </form>
        <hr className="line"></hr>
        <div className="student-info">
          <form className="student-form">
            <label className='form-label'>Name</label>
            <input type="text" placeholder='Enter students full name' className='form-input' name='name' value={student.name} required onChange={onChange2} />
            <label className='form-label'>RollNo</label>
            <input type="number" placeholder='Enter students roll no' className='form-input' name='rollNo' value={student.rollNo} required onChange={onChange2} />
          </form>
          <div className="button-box">
            <button className="checkIn button" onClick={checkInHandler}>Check In</button>
            <button className="checkOut button" onClick={checkOutHandler} >Check Out</button>
            <button className="studentDetails button" onClick={studentDetailsHandler}>Student Details</button>
          </div>
          <div className="count-box">
            <h4 className="count-statement">Total student present</h4>
            <h1 className='count'>{totalPresent}</h1>
          </div>
        </div>
      </div>
      {alert.set === 1 && <div className="messageBox1">
        <p>{alert.message}</p>
      </div>}
      {alert.set === 2 && <div className="messageBox2">
        <div className='alertDiv'>
          <h4>Name</h4>
          <p>{alert.message.name}</p>
        </div>
        <div className='alertDiv'>
          <h4>Roll No</h4>
          <p> {alert.message.rollNo}</p>
        </div>
        {alert.message.checkInTime !== null ?
          <div className='alertDiv'>
            <h4>Checkin Time</h4>
            <p> {dateFormat(alert.message.checkInTime, "h:MM:ss TT")}</p>
            <p> {dateFormat(alert.message.checkInTime, "mmmm dS, yyyy")}</p>
          </div> :
          <div className='alertDiv'>Student not checked in yet!</div>}
        {alert.message.checkOutTime !== null ?
          <div className='alertDiv'>
            <h4>Checkout Time</h4>
            <p> {dateFormat(alert.message.checkOutTime, "h:MM:ss TT")}</p>
            <p> {dateFormat(alert.message.checkOutTime, "mmmm dS, yyyy")}</p>
          </div> :
          <div className='alertDiv'>
            <h4>Checkout Time</h4>
            <p> Student did not checkout yet!</p>
          </div>}
      </div>}
      {alert.set === 3 && <div className="messageBox1">
        <p>{alert.message}</p>
      </div>}
      {alert.set === 4 && <div className="messageBox1">
        <p>{alert.message}</p>
      </div>}
      {alert.set === 5 && <div className="messageBox1">
        <p>{alert.message}</p>
      </div>}
    </div>
  );
}

export default App;
