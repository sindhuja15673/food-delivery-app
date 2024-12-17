const express = require('express');
const connectDB = require('./db');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
require('dotenv').config();

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
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

