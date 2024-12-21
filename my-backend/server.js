const express = require('express');
const connectDB = require('./db');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
require('dotenv').config();
const path = require('path');

const app = express();

// Connect to database
connectDB();

app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true, // Allow credentials (cookies, authorization headers)
}));

app.use(express.json()); // Parse JSON bodies

// Use routes
app.use('/api', productRoutes);
app.use('/api', paymentRoutes);
// Start the server
app.use(express.static(path.join(__dirname, '../build')));

// Route to serve index.html for all non-API requests
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});


const PORT = process.env.PORT || 5000;

const HOST = '0.0.0.0'; // Bind to all network interfaces

app.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});




