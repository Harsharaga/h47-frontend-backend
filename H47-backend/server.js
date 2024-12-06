const express = require('express');
const cors = require('cors');
const jwt = require('jwt-simple');
const bodyParser = require('body-parser');

const app = express();
const port = 3000; // Change this port if needed

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Mock user data (You can replace this with a database in production)
const users = [
  {
    username: 'user1',
    password: 'password123',
    id: 1,
  },
];

// Secret key for JWT encoding
const JWT_SECRET_KEY = 'your-secret-key';

// Login endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).send('Invalid credentials');
  }

  // Create JWT token
  const token = jwt.encode({ id: user.id, username: user.username }, JWT_SECRET_KEY);

  return res.json({ token });
});

// Dashboard data endpoint
app.get('/dashboard', (req, res) => {
  // Here you can add logic to fetch real data from a database or external API
  const dashboardData = {
    summary: 'The paper reviews the use of Fiber Bragg Grating (FBG)-based wearable sensors and devices in healthcare, highlighting their potential to transform personal health monitoring. FBG sensors, with their high precision, small size, and immunity to electromagnetic interference, are well-suited for wearable devices. The review focuses on the principles, materials, design, and applications of these sensors in monitoring physiological parameters and human motion. It discusses the significance of miniaturized FBG interrogators for improving sensor wearability and their role in advancing wearable healthcare technology. FBG-based devices excel in long-term monitoring of body parameters like heart rate, respiratory rate, and body temperature, offering stability, durability, and reduced maintenance. However, challenges such as the high cost and size of sensor demodulation equipment limit their widespread use. The paper suggests that FBG sensors are a promising solution for next-generation healthcare systems, which emphasize personalized, continuous monitoring. It concludes by emphasizing the need for further research to overcome current limitations, particularly in miniaturization and cost reduction, to fully realize the potential of FBG sensors in healthcare applications.',
    techStack: 'Angular, Node.js, Express, MySQL',
    sourceUrl: 'https://www.sciencedirect.com/science/article/abs/pii/S0030399224013781',
  };

  return res.json(dashboardData);
});

// Chart data endpoint
app.get('/chart-data', (req, res) => {
  // Sample chart data
  const chartData = {
    labels: ['Innovation 1', 'Innovation 2', 'Innovation 3'],
    values: [10, 25, 35],
  };

  return res.json(chartData);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
