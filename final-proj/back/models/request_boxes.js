const mongoose = require('mongoose')

const requestBoxesSchema = new mongoose.Schema({
    request_id: {
        type: Number,
        required: true
    },
    box_id: {
        type: Number,
        required: true
    }
});

requestBoxesSchema.virtual('request', {
    ref: 'Request',
    localField: 'request_id',
    foreignField: '_id'
});

requestBoxesSchema.virtual('box', {
    ref: 'Box',
    localField: 'box_id',
    foreignField: '_id'
});

const RequestBox = mongoose.model('RequestBox', requestBoxesSchema);
module.exports = RequestBox;