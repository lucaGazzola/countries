document.getElementById('country-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const country = document.getElementById('country').value;
    fetch(`http://localhost:5000/getForCountry?country=${country}`)
        .then(response => response.json())
        .then(data => {
            const dataInfo = data.data;
            const datetime = new Date(dataInfo.datetime).toLocaleString();
            document.getElementById('result').innerText = 
                `Country Code: ${data.countryCode}\n` +
                `Datetime: ${datetime}\n` +
                `Carbon Intensity: ${dataInfo.carbonIntensity} ${data.units.carbonIntensity}`;
                document.getElementById('fossil-fuel-bar').value = dataInfo.fossilFuelPercentage;
                document.getElementById('fossil-fuel-percentage').textContent = `${dataInfo.fossilFuelPercentage}%`; 
                document.getElementById('fossil-fuel').style.display = 'block';
        })
        .catch(error => {
            console.error('Error:', error);
        });
});