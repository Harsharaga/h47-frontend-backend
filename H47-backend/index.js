require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');

// Create an Express app
const app = express();
app.use(express.json());

// Create a MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER,   // Your MySQL username
    password: process.env.DB_PASS, // Your MySQL password
    database: 'h47'             // Database name
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        process.exit(1);
    } else {
        console.log('Connected to MySQL');
    }
});

// JWT Authentication Middleware
function verifyToken(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).send('Access denied');
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(400).send('Invalid token');
    }
}

// Sample endpoint to fetch chart data
app.get('/api/charts', verifyToken, (req, res) => {
    db.query('SELECT * FROM chart_data', (err, results) => {
        if (err) {
            return res.status(500).send('Database query error');
        }
        res.json(results);
    });
});

// Sample login endpoint for JWT generation (use a hardcoded username for simplicity)
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === 'password') {
        const token = jwt.sign({ username: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(400).send('Invalid credentials');
    }
});

// Run the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
