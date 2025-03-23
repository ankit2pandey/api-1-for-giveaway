const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env file

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Define a schema and model
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  message: String,
});

const User = mongoose.model('User', userSchema);

const app = express();
app.use(bodyParser.json()); // Parse JSON requests

// Endpoint to handle form submission
app.post('/saveCredentials', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // Save data to MongoDB
    const newUser = new User({ name, email, phone, message });
    await newUser.save();

    res.status(200).send('Data saved successfully!');
  } catch (error) {
    res.status(500).send(`Error saving data: ${error.message}`);
  }
});

// Start the server
app.listen(3000, () => console.log('Server is running on http://localhost:3000'));