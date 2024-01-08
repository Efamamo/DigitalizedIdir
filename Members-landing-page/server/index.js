// Import necessary packages
const express = require('express');
const mysql = require('mysql2/promise'); // Using mysql2 to interact with MySQL
const cors = require('cors')

// Create an instance of Express
const app = express();
app.use(cors());

// Database configuration
const dbConfig = {
  host: 'localhost', // Replace with your MySQL host
  user: 'digital-idir', // Replace with your MySQL username
  password: 'digital-idir', // Replace with your MySQL password
  database: 'digital-idir-Database' // Replace with your MySQL database name
};

app.get('/', (req, res) => {
  res.send('hello world')
})

// Route to fetch events data from the database
app.get('/api/events', async (req, res) => {
  try {
    // Create a connection to the MySQL database
    const connection = await mysql.createConnection(dbConfig);

    // Query to fetch events from the 'events' table (adjust table name if different)
    const [rows] = await connection.execute('SELECT * FROM events');

    // Close the database connection
    await connection.end();


    // Send the fetched events data as a JSON response
    res.json(rows);
  } catch (error) {
    // If an error occurs during database operation, send an error response
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

// Start the server on a specified port (e.g., 3001)
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
