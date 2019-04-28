const express = require('express');
const mongoose = require('mongoose');
const controller = require('./person_controller');

const router = require('./router');

const app = express();

const port = 3000;
app.use(express.json());
app.use('/', router);

connect();

function listen() {
    app.listen(port);
    console.log('App listening...');
}

function connect() {
    mongoose.connection.on('error', console.error.bind(console, 'connection error: '))
                       .on('disconnected', connect)
                       .once('open', listen);
    return mongoose.connect('mongodb://localhost/persons', { useNewUrlParser: true });
}