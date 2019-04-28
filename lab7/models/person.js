const mongoose = require('mongoose');

const Person = new mongoose.Schema(
    {
        name: String,
        age: Number,
        born: String,
        timeline: String,
        alliegance: [String],
        playedBy: String,
        titles: [String],
        father: String,
        mother: String,
        spouse: String
    }
);

module.exports = mongoose.model('Person', Person);