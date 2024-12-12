const express = require('express');
const connectDB = require('./db');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
require('dotenv').config();

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies

// Use routes
app.use('/api', productRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
