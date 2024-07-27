import React, { useState } from 'react';
import axios from 'axios';

const AddStudent = () => {
const API_URL = 'http://localhost:5000';
  const [student, setStudent] = useState({
    name: '',
    email: '',
    className: '',
    subject: ''
  });

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${API_URL}/add-student`, student)
      .then(response => {
        alert('Student added successfully');
      })
      .catch(error => {
        console.error('There was an error adding the student!', error);
      });
  };

  return (<>
  <div id="content-wrapper" className="d-flex flex-column">
    <div id="content">
        <div className="container-fluid">
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">AddStudent</h1>                                               
            </div>
            <div className="row">
                <form onSubmit={handleSubmit}>
                        <input type="text" name="name" placeholder="Name" onChange={handleChange} />
                        <input type="email" name="email" placeholder="Email" onChange={handleChange} />
                        <input type="text" name="className" placeholder="Class" onChange={handleChange} />
                        <input type="text" name="subject" placeholder="Subject" onChange={handleChange} />
                        <button type="submit">Add Student</button>
                </form> 
            </div>
        </div>
    </div>
      
      
    </div>

  </>
    
  );
};

export default AddStudent;
