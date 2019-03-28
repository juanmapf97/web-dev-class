const request = require('request');
const credentials = require('./credentials.js');
const express = require('express');

const app = express();

app.listen(3000, () => {
    console.log('Server listening at http://localhost:3000');
});

app.get('/weather', (req, res) => {
    startRequests(req, res);
});

function startRequests(req, res) {
    req.location = req.query.search;
    request(`https://api.mapbox.com/geocoding/v5/mapbox.places/${req.query.search}.json?access_token=${credentials.MAPBOX_TOKEN}&limit=1`, (err, request, body) => {
        mapboxCallback(err, request, body, req, res);
    });
}

function mapboxCallback(error, request, body, req, res) {
    if (!error) {
        const jsonBody = JSON.parse(body);
        try {
            if (jsonBody.features.length > 0) {
                const longitude = jsonBody.features[0].center[0];
                const latitude = jsonBody.features[0].center[1];
                requestDarksky(latitude, longitude, req, res);
            } else {
                res.json({ error: `El lugar buscado no devolvió resultados. ¡Intenta con otro lugar!` });
            }
        } catch(e) {
            if (jsonBody.message) 
                res.json({ error: `Ocurrió un error al buscar la información del clima: ${jsonBody.message}` });
            else
                res.json({ error: `Ocurrió un error al buscar la información del clima: ${e}` });
        }
    } else {
        res.json({ error: `Ocurrió un error al buscar la información del clima: ${error}` });
    }
}

function requestDarksky(lat, long, req, res) {
    request(`https://api.darksky.net/forecast/${credentials.DARK_SKY_SECRET_KEY}/${lat},${long}?lang=es&units=si`, (err, request, body) => {
        darkskyCallback(err, request, body, req, res);
    });
}

function darkskyCallback(error, request, body, req, res) {
    if (!error) {
        try {
            const jsonBody = JSON.parse(body);
            res.json({
                location: req.location,
                weather: `${jsonBody.daily.summary} Actualmente está a ${jsonBody.currently.temperature}ºC. Precipitación de ${jsonBody.daily.data[0].precipProbability * 100}%.`
            });
        } catch(e) {
            res.json({ error: `Ocurrió un error al buscar la información del clima: ${body}` });
        }
    } else {
        res.json({error: `Ocurrió un error al buscar la información del clima: ${error}`});
    }
}