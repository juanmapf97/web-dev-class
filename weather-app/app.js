const request = require('request');
const credentials = require('./credentials.js');

var standard_input = process.stdin;
standard_input.setEncoding('utf-8');

console.log('Escribe el lugar del que quieres el pronóstico: (Ej. Monterrey, Nuevo León)')
standard_input.on('data', data => {
    let city = data.replace('\n', '');
    request(`https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?access_token=${credentials.MAPBOX_TOKEN}&limit=1`, mapboxCallback);
});

function mapboxCallback(error, request, body) {
    if (!error) {
        const jsonBody = JSON.parse(body);
        try {
            if (jsonBody.features.length > 0) {
                const longitude = jsonBody.features[0].center[0];
                const latitude = jsonBody.features[0].center[1];
                requestDarksky(latitude, longitude);
            } else {
                console.log(`El lugar buscado no devolvió resultados. ¡Intenta con otro lugar!`)
            }
        } catch(e) {
            if (jsonBody.message) 
                console.log(`Ocurrió un error al buscar la información del clima: ${jsonBody.message}`)
            else
                console.log(`Ocurrió un error al buscar la información del clima: ${e}`)
        }
    } else {
        console.log(`Ocurrió un error al buscar la información del clima: ${error}`)
    }
}

function requestDarksky(lat, long) {
    request(`https://api.darksky.net/forecast/${credentials.DARK_SKY_SECRET_KEY}/${lat},${long}?lang=es&units=si`, darkskyCallback);
}

function darkskyCallback(error, request, body) {
    if (!error) {
        try {
            const jsonBody = JSON.parse(body);
            console.log(`${jsonBody.daily.summary} Actualmente está a ${jsonBody.currently.temperature}ºC. Precipitación de ${jsonBody.daily.data[0].precipProbability * 100}%.`);
        } catch(e) {
            console.log(`Ocurrió un error al buscar la información del clima: ${body}`)
        }
    } else {
        console.log(`Ocurrió un error al buscar la información del clima: ${error}`)
    }
}