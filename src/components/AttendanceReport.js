import React, { useState } from 'react';
import axios from 'axios';

const AttendanceReport = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reports, setReports] = useState([]);

  const handleStartDateChange = (e) => setStartDate(e.target.value);
  const handleEndDateChange = (e) => setEndDate(e.target.value);

  const fetchReports = () => {
    axios.get('http://localhost:5000/attendance', {
      params: {
        startDate,
        endDate
      }
    })
    .then(response => {
      setReports(response.data);
    })
    .catch(error => {
      console.error('There was an error fetching the attendance report!', error);
    });
  };

  return (
    <div id="content-wrapper" className="d-flex flex-column">
      <div id="content">
        <div className="container-fluid">
          <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">Attendance Report</h1>
          </div>
          <div className="row">
            <div>
              <label>
                Start Date:
                <input type="date" value={startDate} onChange={handleStartDateChange} />
              </label>
              <label>
                End Date:
                <input type="date" value={endDate} onChange={handleEndDateChange} />
              </label>
              <button onClick={fetchReports}>Get Report</button>
            </div>
            <div>
              <h2>Attendance Report</h2>
              <ul>
                {reports.map((report, index) => (
                  <li key={index}>
                    {report.date} - Student ID: {report.student_id}, Status: {report.status}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceReport;
