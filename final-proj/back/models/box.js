const mongoose = require('mongoose')

const boxSchema = new mongoose.Schema({
    size: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        default: 'Bodega 1'
    },
    description: {
        type: String
    },
    request_id: {
        type: String,
        required: true
    }
});

boxSchema.virtual('price').get(function() {
    return Math.max((this.size * 100) * 12.5, 150);
})

boxSchema.methods.toJSON = function() {
    const box = this
    const boxObject = box.toObject({ virtuals: true })

    return boxObject
}

const Box = mongoose.model('Box', boxSchema);
module.exports = Box;