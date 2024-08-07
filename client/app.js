var map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

function updateMap(city) {
    var url = 'https://nominatim.openstreetmap.org/search?q=' + encodeURIComponent(city) + '&format=json';
    fetch(url)
        .then(response => response.json())
        .then(data => {
            var latitude = data[0].lat;
            var longitude = data[0].lon;

            var marker = L.marker([latitude, longitude]).addTo(map);
            map.setView([latitude, longitude], 13);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}