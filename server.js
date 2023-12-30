const http = require('http')
const url = require('url')
const fs = require('fs');
const pathUtils = require('path');

const getForCountry = require('./co2service')

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true)
    const path = parsedUrl.pathname
    const query = parsedUrl.query

    if (path === '/getForCountry') {
        const country = query.country
        if (country && typeof country === 'string' && country.length === 2) {
            getForCountry(country, res)
        } else {
            res.writeHead(400, {
                'Content-type': 'application/json'
            })
            res.end(JSON.stringify({ error: 'Invalid parameter' }))
        }
    } else if (path === '/'){
        fs.readFile(pathUtils.join(__dirname, 'index.html'), (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('Error loading index.html');
            } else {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end(data);
            }
        });
    }else if (req.url.match(/\.js$/)) {
        fs.readFile(pathUtils.join(__dirname, req.url), (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('Error loading JavaScript file');
            } else {
                res.writeHead(200, {'Content-Type': 'application/javascript'});
                res.end(data);
            }
        });
    }else {
        res.writeHead(404, {
            'Content-type': 'text/html'
        })
        res.end('page not found')
    }    
})

server.listen(5000, 'localhost', () => {
    console.log('Server is listening at localhost on port 5000')
})

module.exports = server