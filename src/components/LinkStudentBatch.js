import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LinkStudentBatch = () => {
  const [students, setStudents] = useState([]);
  const [batches, setBatches] = useState([]);
  const [studentId, setStudentId] = useState('');
  const [batchId, setBatchId] = useState('');

  useEffect(() => {
    fetchStudents();
    fetchBatches();
  }, []);

  const fetchStudents = async () => {
    const response = await axios.get('http://localhost:5000/students');
    setStudents(response.data);
  };

  const fetchBatches = async () => {
    const response = await axios.get('http://localhost:5000/batches');
    setBatches(response.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/link-student-batch', { studentId, batchId });
    alert('Student linked to batch...');
  };

  return (
    <div>
      <h2>Link Student to Batch</h2>
      <form onSubmit={handleSubmit}>
        <select value={studentId} onChange={(e) => setStudentId(e.target.value)} required>
          <option value="" disabled>Select Student</option>
          {students.map(student => (
            <option key={student.id} value={student.id}>
              {student.name}
            </option>
          ))}
        </select>
        <select value={batchId} onChange={(e) => setBatchId(e.target.value)} required>
          <option value="" disabled>Select Batch</option>
          {batches.map(batch => (
            <option key={batch.id} value={batch.id}>
              {batch.name} - {batch.class} - {batch.subject}
            </option>
          ))}
        </select>
        <button type="submit">Link Student</button>
      </form>
    </div>
  );
};

export default LinkStudentBatch;
