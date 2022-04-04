let h5 = document.querySelector('h5');
let h6 = document.querySelector('h6');
let map;

function success(pos) { // o pos esta vindo da função navegation

    console.log(pos.coords.latitude, pos.coords.longitude);
    h5.textContent = `Latitude:${pos.coords.latitude}, Longitude:${pos.coords.longitude}`;
    h6.textContent = 'Mais ou menos ' + pos.coords.accuracy + ' metros.'

    if (map === undefined) {
        map = L.map('mapid').setView([pos.coords.latitude, pos.coords.longitude], 13);
    } else {
        map.remove();
        map = L.map('mapid').setView([pos.coords.latitude, pos.coords.longitude], 13);
    }

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([pos.coords.latitude, pos.coords.longitude]).addTo(map)
        .bindPopup('Eu estou aqui!')
        .openPopup();
}

function error(err) {
    console.log(err);
}

var watchID = navigator.geolocation.watchPosition(success, error, {
    enableHighAccuracy: true,
    timeout: 5000
});