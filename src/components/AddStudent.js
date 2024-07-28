import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddStudent = () => {
  const [student, setStudent] = useState({
    name: '',
    email: '',
    batchId: ''
  });
  const [batches, setBatches] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/batches')
      .then(response => {
        setBatches(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the batches!', error);
      });
  }, []);

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/add-student', student)
      .then(response => {
        alert('Student added successfully');
      })
      .catch(error => {
        console.error('There was an error adding the student!', error);
      });
  };

  return (
    <div id="content-wrapper" className="d-flex flex-column">
      <div id="content">
        <div className="container-fluid">
          <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">Add Student</h1>
          </div>
          <div className="row">
            <form onSubmit={handleSubmit}>
              <input type="text" name="name" placeholder="Name" onChange={handleChange} />
              <input type="email" name="email" placeholder="Email" onChange={handleChange} />
              <select name="batchId" onChange={handleChange}>
                <option value="">Select Batch</option>
                {batches.map(batch => (
                  <option key={batch.id} value={batch.id}>{batch.name} - {batch.class} - {batch.subject}</option>
                ))}
              </select>
              <button type="submit">Add Student</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddStudent;