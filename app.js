const request = require('request');
const credentials = require('./credentials.js');

var standard_input = process.stdin;
standard_input.setEncoding('utf-8');

console.log('Escribe el lugar del que quieres el pronóstico: (Ej. Monterrey, Nuevo León)')
standard_input.on('data', data => {
    let city = data.replace('\n', '');
    request(`https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?access_token=${credentials.MAPBOX_TOKEN}&limit=1`, (e, r, b) => {
        if (!e) {
            const body = JSON.parse(b);
            const longitude = body.features[0].center[0];
            const latitude = body.features[0].center[1];
            request(`https://api.darksky.net/forecast/${credentials.DARK_SKY_SECRET_KEY}/${latitude},${longitude}?lang=es&units=si`, (e, r, b) => {
                if (!e) {
                    const body = JSON.parse(b);
                    console.log(body.daily.summary);
                } else {
                    console.log(`Ocurrió un error al buscar la información del clima: ${e}`)
                }
            });
        } else {
            console.log(`Ocurrió un error al buscar la información del clima: ${e}`)
        }
    });
});