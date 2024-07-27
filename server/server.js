const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'attendance_system'
});

db.connect(err => {
  if (err) throw err;
  console.log('MySQL connected...');
});

app.post('/add-student', (req, res) => {
  const { name, email, className, subject } = req.body;
  const sql = 'INSERT INTO students (name, email, class, subject) VALUES (?, ?, ?, ?)';
  db.query(sql, [name, email, className, subject], (err, result) => {
    if (err) throw err;
    res.send('Student added...');
  });
});

app.get('/students', (req, res) => {
  const sql = 'SELECT * FROM students';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

app.post('/attendance', (req, res) => {
  const { date, attendance } = req.body;
  attendance.forEach(record => {
    const sql = 'INSERT INTO attendance (student_id, date, status) VALUES (?, ?, ?)';
    db.query(sql, [record.studentId, date, record.status], (err, result) => {
      if (err) throw err;
    });
  });
  res.send('Attendance recorded...');
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});

app.get('/attendance', (req, res) => {
  const { startDate, endDate } = req.query;
  const sql = 'SELECT * FROM attendance WHERE date BETWEEN ? AND ?';
  db.query(sql, [startDate, endDate], (err, results) => {
    if (err) {
      console.error('Error fetching attendance:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(results); // Ensure the response is JSON
    }
  });
});
