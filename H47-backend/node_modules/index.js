require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
const jwtSimple = require('jwt-simple');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
app.use(cors({
    origin: 'https://lustrous-brioche-fcc795.netlify.app', // Allow frontend hosted on Netlify
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(bodyParser.json());
app.use(express.json());

// Mock user data
const users = [
    {
        username: 'user1',
        password: 'password123',
        id: 1,
    },
];

// Secret key for JWT encoding
const JWT_SECRET_KEY = 'your-secret-key';

// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'h47',
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        process.exit(1);
    } else {
        console.log('Connected to MySQL');
    }
});

function verifyToken(req, res, next) {
    const token = req.header('x-auth-token'); // Ensure frontend sends this header
    if (!token) {
        return res.status(401).send('Access denied');
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET_KEY);
        req.user = decoded; // Attach decoded payload to the request
        next();
    } catch (err) {
        res.status(400).send('Invalid token');
    }
}


app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Check mock data
    const user = users.find(
        (u) => u.username === username && u.password === password
    );

    if (user) {
        const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET_KEY, { expiresIn: '1h' });
        return res.json({ token });

    }

});

// Dashboard data endpoint
app.get('/dashboard', (req, res) => {
    const dashboardData = {
        summary: 'The paper reviews the use of Fiber Bragg Grating (FBG)-based wearable sensors and devices...',
        techStack: 'Angular, Node.js, Express, MySQL',
        sourceUrl: 'https://www.sciencedirect.com/science/article/abs/pii/S0030399224013781',
    };

    return res.json(dashboardData);
});

// Chart data endpoint (Mock + MySQL Example)
app.get('/chart-data', verifyToken, (req, res) => {
    // Mock data
    const chartData = {
        labels: ['Innovation 1', 'Innovation 2', 'Innovation 3'],
        values: [10, 25, 35],
    };

    res.json(chartData);

    
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
