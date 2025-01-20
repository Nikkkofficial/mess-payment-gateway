// Import required modules
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Load environment variables from .env file
dotenv.config();

// Create an Express application
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Enable CORS for cross-origin requests
app.use(bodyParser.json()); // Parse incoming JSON data

// Create MySQL database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ', err);
    return;
  }
  console.log('Connected to the database');
});

// Test route
app.get('/', (req, res) => {
  res.send('Mess Payment Gateway API is running');
});

// Login route for students and admins
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  // Query database for user
  db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
    if (err) {
      console.error('Database query error: ', err);
      return res.status(500).json({ message: 'Database query error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = results[0];

    // Check if the password matches
    bcrypt.compare(password, user.password, (err, match) => {
      if (err) {
        console.error('Error comparing password: ', err);
        return res.status(500).json({ message: 'Error comparing password' });
      }

      if (!match) {
        return res.status(401).json({ message: 'Invalid password' });
      }

      // Create JWT token
      const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      res.json({ token });
    });
  });
});

// Protected route (example: student dashboard)
app.get('/api/dashboard', (req, res) => {
  // Get token from the Authorization header
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Failed to authenticate token' });
    }

    // If token is valid, get the user from the database
    db.query('SELECT * FROM students WHERE id = ?', [decoded.id], (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Error retrieving student data' });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: 'Student not found' });
      }

      const student = results[0];
      res.json({
        student,
        message: 'Welcome to the dashboard',
      });
    });
  });
});

// Example route to handle payment (just a placeholder for now)
app.post('/api/payment', (req, res) => {
  const { studentId, amount } = req.body;

  // Logic to process payment (this is just a mockup for now)
  // In reality, this would involve interacting with a payment gateway like Stripe or PayPal

  // For now, just update the database with the payment status
  db.query(
    'UPDATE students SET balance = balance - ? WHERE id = ?',
    [amount, studentId],
    (err, results) => {
      if (err) {
        console.error('Error processing payment: ', err);
        return res.status(500).json({ message: 'Payment failed' });
      }

      res.json({ message: 'Payment successful', studentId, amount });
    }
  );
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
