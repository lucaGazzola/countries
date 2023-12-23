const https = require('https');
const config = require('./config');

function makeExternalRequest(options, res) {
    const request = https.request(options, response => {
        let data = ''

        response.on('data', chunk => {
            data += chunk
        })

        response.on('end', () => {
            res.writeHead(200, {
                'Content-type': 'application/json'
            })
            res.end(data)
        })
    })

    request.on('error', error => {
        console.error(`Problem with request: ${error.message}`)
        res.writeHead(500, {
            'Content-type': 'application/json'
        })
        res.end(JSON.stringify({ error: 'Problem with request to external API' }))
    })

    request.end()
}

function getForCountry(country, res) {
    const options = {
        hostname: 'api.co2signal.com',
        path: `/v1/latest?countryCode=${country}`,
        method: 'GET',
        headers: {
            'auth-token': config.authToken
        }
    }

    makeExternalRequest(options, res)
}

module.exports = getForCountry;