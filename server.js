const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env file
const cors = require('cors');

// Create the Express app instance first
const app = express();

// Enable CORS for all origins
app.use(cors());

// Parse JSON requests
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Define the first schema and model
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  message: String,
});

const User = mongoose.model('User', userSchema);

// Define the second schema and model with a unique name
const emailSchema = new mongoose.Schema({
  email: String,
});

const EmailUser = mongoose.model('EmailUser', emailSchema);

// Endpoint to handle form submission for full data
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

// Endpoint to handle form submission for email only
app.post('/saveCredentials-email', async (req, res) => {
  try {
    const { email } = req.body;

    // Save data to MongoDB
    const newEmailUser = new EmailUser({ email });
    await newEmailUser.save();

    res.status(200).send('Email saved successfully!');
  } catch (error) {
    res.status(500).send(`Error saving email: ${error.message}`);
  }
});

// Start the server
app.listen(3000, () => console.log('Server is running on http://localhost:3000'));