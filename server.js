require('dotenv').config(); // Load environment variables
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Contact = require('./models/user');

const app = express();

app.use(cors({
  origin:"https://avskexim.com/",
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB using the env variable
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB via Env"))
  .catch(err => console.error("DB Connection Error:", err));

// The POST Route
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    // Create a new document using the model
    const newContact = new Contact({ name, email, phone });

    // Save to the database
    await newContact.save();

    res.status(201).json({ message: "Data saved successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to Saved the Data" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});