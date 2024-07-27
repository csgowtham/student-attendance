import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateAttendance = () => {
  const [date, setDate] = useState('');
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});

  useEffect(() => {
    // Fetch student data from the backend
    axios.get('http://localhost:5000/students')
      .then(response => {
        setStudents(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the students!', error);
      });
  }, []);

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleAttendanceChange = (studentId, status) => {
    setAttendance({
      ...attendance,
      [studentId]: status
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const attendanceRecords = students.map(student => ({
      studentId: student.id,
      status: attendance[student.id] || 'Absent'
    }));
    axios.post('http://localhost:5000/attendance', { date, attendance: attendanceRecords })
      .then(response => {
        alert('Attendance recorded successfully');
      })
      .catch(error => {
        console.error('There was an error recording the attendance!', error);
      });
  };

  return (
    <div id="content-wrapper" className="d-flex flex-column">
      <div id="content">
        <div className="container-fluid">
          <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">Update Attendance</h1>
          </div>
          <div className="row">
            <form onSubmit={handleSubmit}>
              <input type="date" onChange={handleDateChange} />
              {students.length > 0 ? (
                students.map(student => (
                  <div key={student.id}>
                    <label>
                      {student.name}
                      <input
                        type="checkbox"
                        checked={attendance[student.id] === 'Present'}
                        onChange={(e) => handleAttendanceChange(student.id, e.target.checked ? 'Present' : 'Absent')}
                      />
                    </label>
                  </div>
                ))
              ) : (
                <p>No students available</p>
              )}
              <button type="submit">Save Attendance</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateAttendance;
