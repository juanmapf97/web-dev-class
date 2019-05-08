const mongoose = require('mongoose')
const config = require('../config')

// var connectionURL = 'mongodb+srv://admin:taquitos@cluster0-xg9bk.mongodb.net/clase?retryWrites=true'
var connectionURL = process.env.DB_CONNECTION_STRING || config.connectionURL

mongoose.connect( connectionURL, {
  useNewUrlParser: true,
  useCreateIndex: true
})
