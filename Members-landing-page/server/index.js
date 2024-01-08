const express = require('express');
const app = express();

// Define routes on the backend
app.get('/home', (req, res) => {
  // Logic to handle requests related to the home route
});

app.get('/about', (req, res) => {
  // Logic to handle requests related to the about route
});

app.get('/contact', (req, res) => {
  // Logic to handle requests related to the contact route
});

app.get('/memorials', (req, res) => {
  // Logic to handle requests related to the memorials route
});

app.get('/bylaws', (req, res) => {
  // Logic to handle requests related to the bylaws route
});

app.get('/news', (req, res) => {
  // Logic to handle requests related to the news route
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
