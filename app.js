document.getElementById('country-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const country = document.getElementById('country').value;
    fetch(`http://localhost:5000/getForCountry?country=${country}`)
        .then(response => response.json())
        .then(data => {
            const dataInfo = data.data;
            document.getElementById('data').innerText = 
                `Country Code: ${data.countryCode}\n` +
                `Datetime: ${dataInfo.datetime}\n` +
                `Carbon Intensity: ${dataInfo.carbonIntensity} ${data.units.carbonIntensity}\n` +
                `Fossil Fuel Percentage: ${dataInfo.fossilFuelPercentage}%`;
        })
        .catch(error => {
            console.error('Error:', error);
        });
});