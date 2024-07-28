import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const UpdateAttendance = () => {
  const [batches, setBatches] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});

  useEffect(() => {
    axios.get('http://localhost:5000/batches')
      .then(response => {
        setBatches(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the batches!', error);
      });
  }, []);

  const handleDateChange = date => {
    setSelectedDate(date);
    if (selectedBatch) {
      fetchStudents(selectedBatch, date);
    }
  };

  const handleBatchChange = e => {
    setSelectedBatch(e.target.value);
    if (selectedDate) {
      fetchStudents(e.target.value, selectedDate);
    }
  };

  const fetchStudents = (batchId, date) => {
    const formattedDate = formatDate(date);
    axios.get(`http://localhost:5000/batch-students/${batchId}?date=${formattedDate}`)
      .then(response => {
        setStudents(response.data);
        const initialAttendance = response.data.reduce((acc, student) => {
          acc[student.id] = student.status || false;
          return acc;
        }, {});
        setAttendance(initialAttendance);
      })
      .catch(error => {
        console.error('Error fetching students:', error);
      });
  };

  const handleAttendanceChange = (studentId, status) => {
    setAttendance(prevState => ({
      ...prevState,
      [studentId]: status,
    }));
  };

  const handleSubmit = () => {
    const formattedDate = formatDate(selectedDate);
    axios.post('http://localhost:5000/update-attendance', {
      batchId: selectedBatch,
      date: formattedDate,
      attendance,
    })
    .then(response => {
      alert(response.data.message);
    })
    .catch(error => {
      console.error('There was an error updating the attendance!', error);
    });
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const month = `${d.getMonth() + 1}`.padStart(2, '0');
    const day = `${d.getDate()}`.padStart(2, '0');
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  };

  return (
    <div>
      <h2>Update Attendance</h2>
      <label>Select Batch:</label>
      <select value={selectedBatch} onChange={handleBatchChange}>
        <option value="">Select a batch</option>
        {batches.map(batch => (
          <option key={batch.id} value={batch.id}>{batch.name}</option>
        ))}
      </select>
      <br />
      <label>Select Date:</label>
      <DatePicker selected={selectedDate} onChange={handleDateChange} />
      <br />
      {students.length > 0 && (
        <div>
          <h3>Attendance for {formatDate(selectedDate)}</h3>
          <ul>
            {students.map(student => (
              <li key={student.id}>
                {student.name}
                <input
                  type="checkbox"
                  checked={attendance[student.id] || false}
                  onChange={(e) => handleAttendanceChange(student.id, e.target.checked)}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
      <button onClick={handleSubmit}>Save Attendance</button>
    </div>
  );
};

export default UpdateAttendance;
