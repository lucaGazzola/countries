const express = require('express');
const path = require('path');
const app = express();

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

app.use(express.static(path.join(__dirname, 'client')));

const server = app.listen(5000, 'localhost', () => {
    console.log('Server is listening at localhost on port 5000');
});

module.exports = server;