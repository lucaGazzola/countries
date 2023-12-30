# CO2 Data Viewer

This project is a simple web application that displays CO2 data for a specific country. The data includes the datetime of the data, the carbon intensity in gCO2eq/kWh, and the percentage of fossil fuel usage.

The application consists of a server-side component built with Node.js and a client-side component built with vanilla JavaScript. The server-side component fetches the CO2 data from an external API and serves it to the client-side component, which displays the data in a user-friendly format.

This project is an experiment in using GitHub Copilot, an AI-powered code completion tool. The code in this project was generated with the assistance of GitHub Copilot, demonstrating its capabilities in generating code for both the server-side and client-side components of a web application.

## API Key

To run this project, you will need to obtain an API key from [Electricity Map API Portal](https://api-portal.electricitymaps.com/). Once you have your API key, you should add it to your `server.js` file where the API request is made.

## Usage

1. Start the server by running `node server.js` in the terminal.
2. Open a web browser and navigate to `http://localhost:5000`.
3. Enter a country code in the input field and click the "Get Data" button to fetch and display the CO2 data for that country.

## Disclaimer

The CO2 data used in this project is the exclusive property of Electricity Maps and/or related parties. If you're in doubt about your rights to use this data, please contact api@co2signal.com.