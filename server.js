const express = require('express');
const path = require('path');
const app = express();
const co2Service = require('./co2service');

// Define your API routes
app.get('/getForCountry', (req, res) => {
    const country = req.query.country;
    if (country && typeof country === 'string' && country.length === 2) {
        co2Service(country, res);
    } else {
        res.writeHead(400, { 'Content-type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid parameter' }));
    }
});

// Serve your index.html file for the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

// Serve static files from the "client" directory
app.use(express.static(path.join(__dirname, 'client')));

// Start the server
const server = app.listen(5000, 'localhost', () => {
    console.log('Server is listening at localhost on port 5000');
});

module.exports = server;