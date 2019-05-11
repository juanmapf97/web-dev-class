const Request = require('../models/request');
const Box = require('../models/box');

const getRequestBoxes = function(req, res) {
    const _id = req.params.id;

    Request.findById(_id).then((request) => {
        Box.find({ request_id: request._id }).then((boxes) => {
            return res.send(boxes);
        }).catch((error) => {
            return res.status(400).send(error);
        })
    }).catch((error) => {
        return res.status(400).send(error);
    })
}

module.exports = {
    getRequestBoxes: getRequestBoxes
}