const mongoose = require('mongoose');
const Box = require('./box');

const statuses = [ 'Pending pickup', 'Picked up', 'In Storage' ];
// {
//     PP: 'Pending pickup',
//     PU: 'Picked up',
//     IS: 'In Storage'
// }

const requestSchema = new mongoose.Schema({
    giver_first_name: {
        type: String,
        required: true
    },
    giver_last_name: {
        type: String,
        required: true
    },
    giver_phone: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        required: true,
        default: 0
    },
    status_name: {
        type: String,
        default: statuses[0]
    },
    pickup_time: {
        type: Date,
        required: true
    },
    receive_street: {
        type: String
    },
    receive_street_info: {
        type: String
    },
    receive_colony: {
        type: String
    },
    receive_state: {
        type: String
    },
    receive_postal_code: {
        type: String
    },
    receive_comments: {
        type: String
    },
    receive_time: {
        type: Date
    },
    street: {
        type: String,
        required: true
    },
    street_info: {
        type: String,
        required: true
    },
    colony: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    postal_code: {
        type: String,
        required: true
    },
    comments: {
        type: String
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    createdBy: {
        type: String,
        required: true
    }
});

requestSchema.virtual('boxes', {
    ref: 'Box',
    localField: '_id',
    foreignField: 'request_id'
});

requestSchema.methods.toJSON = function() {
    const request = this;
    const requestObject = request.toObject({ virtuals: true });

    return requestObject;
}

const Request = mongoose.model('Request', requestSchema);
module.exports = Request;