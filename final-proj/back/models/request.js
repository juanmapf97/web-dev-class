const mongoose = require('mongoose');
const Box = require('./box');

const statuses = [ 'Pending pickup', 'Picked up', 'In Storage' ];
// {
//     PP: 'Pending pickup',
//     PU: 'Picked up',
//     IS: 'In Storage'
// }

const requestSchema = new mongoose.Schema({
    status: {
        type: Number,
        required: true,
        default: 0
    },
    status_name: {
        type: String,
        default: statuses[0]
    },
    time: {
        type: Date,
        required: true
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

// requestSchema.virtual('request_boxes', {
//     ref: 'RequestBoxes',
//     localField: '_id',
//     foreignField: 'request_id'
// });

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