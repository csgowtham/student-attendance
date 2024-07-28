import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AttendanceReport = () => {
  const [batches, setBatches] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [report, setReport] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/batches')
      .then(response => {
        setBatches(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the batches!', error);
      });
  }, []);

  const formatDate = (date) => {
    const d = new Date(date);
    const month = `${d.getMonth() + 1}`.padStart(2, '0');
    const day = `${d.getDate()}`.padStart(2, '0');
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const fetchReport = () => {
    axios.get(`http://localhost:5000/attendance-report`, {
      params: {
        batchId: selectedBatch,
        startDate: formatDate(startDate),
        endDate: formatDate(endDate),
      }
    })
      .then(response => {
        setReport(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the attendance report!', error);
      });
  };

  return (
    <div>
      <h2>Attendance Report</h2>
      <label>Select Batch:</label>
      <select value={selectedBatch} onChange={e => setSelectedBatch(e.target.value)}>
        <option value="">Select a batch</option>
        {batches.map(batch => (
          <option key={batch.id} value={batch.id}>{batch.name} - {batch.class} - {batch.subject}</option>
        ))}
      </select>
      <br />
      <label>Start Date:</label>
      <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
      <br />
      <label>End Date:</label>
      <DatePicker selected={endDate} onChange={date => setEndDate(date)} />
      <br />
      <button onClick={fetchReport}>Get Report</button>

      {report.length === 0 ? (
        <p>No attendance data found for the selected batch and date range.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Student Name</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {report.map((entry, index) => (
              <tr key={index}>
                <td>{entry.date}</td>
                <td>{entry.name}</td>
                <td>{entry.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AttendanceReport;
