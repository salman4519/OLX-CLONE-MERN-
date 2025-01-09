// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const productRoutes = require('./Routes/productRoutes');
const authRoutes = require('./Routes/authRoutes');
const path = require('path');

const app = express();
const port = 5000;

const mongoURI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('MongoDB connection error:', err));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors());
app.use(express.json());

// Mount routes
app.use('/auth', authRoutes);  // Auth routes remain the same
app.use('/', productRoutes);  // Use /auth/products for product routes

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
