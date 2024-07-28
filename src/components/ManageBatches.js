import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageBatches = () => {
  const [batches, setBatches] = useState([]);
  const [batch, setBatch] = useState({ name: '', className: '', subject: '', faculty: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchBatches();
  }, []);

  const fetchBatches = async () => {
    const response = await axios.get('http://localhost:5000/batches');
    setBatches(response.data);
  };

  const handleChange = (e) => {
    setBatch({ ...batch, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      await axios.put(`http://localhost:5000/update-batch/${editId}`, batch);
      setIsEditing(false);
      setEditId(null);
    } else {
      await axios.post('http://localhost:5000/add-batch', batch);
    }
    setBatch({ name: '', className: '', subject: '', faculty: '' });
    fetchBatches();
  };

  const handleEdit = (batch) => {
    setIsEditing(true);
    setEditId(batch.id);
    setBatch(batch);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/delete-batch/${id}`);
    fetchBatches();
  };

  return (
    <div>
      <h2>Manage Batches</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Batch Name" value={batch.name} onChange={handleChange} required />
        <input type="text" name="className" placeholder="Class" value={batch.className} onChange={handleChange} required />
        <input type="text" name="subject" placeholder="Subject" value={batch.subject} onChange={handleChange} required />
        <input type="text" name="faculty" placeholder="Faculty" value={batch.faculty} onChange={handleChange} required />
        <button type="submit">{isEditing ? 'Update Batch' : 'Add Batch'}</button>
      </form>
      <ul>
        {batches.map(batch => (
          <li key={batch.id}>
            {batch.name} - {batch.className} - {batch.subject} - {batch.faculty}
            <button onClick={() => handleEdit(batch)}>Edit</button>
            <button onClick={() => handleDelete(batch.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageBatches;
