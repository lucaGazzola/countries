fetch('https://restcountries.com/v3.1/all')
    .then(response => response.json())
    .then(data => {
        const dataList = document.getElementById('countries');
        data.forEach(country => {
            const option = document.createElement('option');
            option.value = country.name.common;
            dataList.appendChild(option);
        });
    })
    .catch(err => {
        console.error(err);
    });

document.getElementById('country-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const countryName = document.getElementById('country').value;
    fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
        .then(response => response.json())
        .then(data => {
            const flagUrl = data[0].flags.png;
            const coatOfArmsUrl = data[0].coatOfArms.png; // Assuming the API returns a coat of arms URL
            const mapUrl = data[0].maps.openStreetMaps; // Assuming the API returns an OpenStreetMap URL
            const flagDiv = document.getElementById('flag');
            flagDiv.innerHTML = ''; // Clear the previous flag, coat of arms, and map

            // Set the display property of the flag div to flex
            flagDiv.style.display = 'flex';

            // Create a div for the images
            const imagesDiv = document.createElement('div');
            flagDiv.appendChild(imagesDiv);

            // Create and add the flag image
            const flagImg = document.createElement('img');
            flagImg.src = flagUrl;
            flagImg.style.height = '100px'; // Set the height of the flag image
            flagImg.style.marginRight = '10px'; // Add right margin to the flag image
            imagesDiv.appendChild(flagImg);

            // Create and add the coat of arms image
            const coatOfArmsImg = document.createElement('img');
            coatOfArmsImg.src = coatOfArmsUrl;
            coatOfArmsImg.style.height = '100px'; // Set the height of the coat of arms image
            coatOfArmsImg.style.marginLeft = '10px'; // Add left margin to the coat of arms image
            imagesDiv.appendChild(coatOfArmsImg);

            // Create a map div
            const mapDiv = document.createElement('div');
            mapDiv.id = 'map';
            mapDiv.style.height = '200px';
            mapDiv.style.width = '300px';
            flagDiv.appendChild(mapDiv);

            // Get the latitude and longitude of the country
            const latlng = data[0].latlng;

            // Delay the map initialization
            setTimeout(() => {
                // Get the area of the country in square kilometers
                const area = data[0].area;

                // Estimate the zoom level based on the area
                let zoomLevel;
                if (area > 1000000) {
                    zoomLevel = 3;
                } else if (area > 500000) {
                    zoomLevel = 4;
                } else if (area > 200000) {
                    zoomLevel = 5;
                } else if (area > 100000) {
                    zoomLevel = 6;
                } else {
                    zoomLevel = 7;
                }

                // Create a Leaflet map and center it on the country
                const map = L.map('map').setView(latlng, zoomLevel);

                // Add a tile layer to the map
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    maxZoom: 19
                }).addTo(map);
            }, 0);
        })
        .catch(err => {
            console.error(err);
        });
});