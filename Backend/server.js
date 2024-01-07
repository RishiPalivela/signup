const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;

// Set up database connection
const uri = 'mongodb+srv://RishiPalivela:Grws1234@rishipaliveladb.zqlslwf.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Connect to the database
client.connect(err => {
if (err) {
    console.error('Error connecting to the database:', err);
} else {
    console.log('Connected to the database');
}
});

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Signup endpoint
app.post('/api/signup', async (req, res) => {
const { firstName, lastName, email, password } = req.body;

  // Basic validation
if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ error: 'All fields are required.' });
}

  // Check if email is already registered
const existingUser = await client.db('RishiPalivelaDB').collection('users').findOne({ email });
if (existingUser) {
    return res.status(400).json({ error: 'Email is already registered.' });
}

  // Store user data in the database
await client.db('RishiPalivelaDB').collection('users').insertOne({ firstName, lastName, email, password });

res.json({ success: true });
});

// Close database connection on server shutdown
process.on('SIGINT', () => {
client.close();
process.exit();
});

// Start the server
app.listen(port, () => {
console.log(`Server is running at http://localhost:${port}`);
});

