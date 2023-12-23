const http = require('http')
const url = require('url')
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
    } else {
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