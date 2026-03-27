const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors()); // CRITICAL: Allows your Vite app to talk to this server
app.use(express.json()); // Parses incoming JSON requests

// MongoDB Connection
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    await client.connect();
    const db = client.db('my_website_db'); // Replace with your DB name
    const collection = db.collection('users');

    const result = await collection.insertOne({
      fullname: name,
      email: email,
      phoneNumber: phone,
      createdAt: new Date(),
    });

    res.status(201).json({ success: true, data: result });
  } catch (error) {
    console.error("MongoDB Error:", error);
    res.status(500).json({ error: 'Failed to save contact info' });
  } finally {
    // Closes the connection after the operation completes or fails
    await client.close();
  }
});

app.listen(()=>{
  console.log("listen port at");
})
