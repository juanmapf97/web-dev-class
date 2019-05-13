const Request = require('../models/request');
const Box = require('../models/box');
const RequestBox = require('../models/request_boxes')

/**
 * {
 *  "time": "12-12-2020",
 *  "latitude": 25.21231,
 *  "longitude": 123.2234,
 *  "boxes": [
 *      {
 *          "size": 0.12,
 *      },
 *      {
 *          "size": 0.24,
 *      },
 *      {
 *          "size": 0.10,
 *      }
 *  ]
 * }
 * @param {*} req 
 * @param {*} res 
 */

const createRequest = function(req, res) {
    const boxes = req.body.boxes;
    delete req.body.boxes;
    const request = new Request(req.body);
    request.createdBy = req.user._id;
    request.save().then(() => {
        for (const box in boxes) {
            if (boxes.hasOwnProperty(box)) {
                const element = boxes[box];
                const createdBox = new Box(element);
                createdBox.request_id = request._id;
                createdBox.save();
            }
        }
        return res.send(request);
    }).catch((error) => {
        return res.status(400).send(error);
    });
}

const getRequests = function(req, res) {
    if (req.user.is_admin) {
        Request.find().populate('boxes').then((requests) => {
            return res.send(requests);
        }).catch((error) => {
            return res.status(400).send(error);
        })
    } else {
        Request.find({ createdBy: req.user._id })
        .populate('boxes')
        .then((requests) => {
            return res.send(requests);
        }).catch((error) => {
            return res.status(400).send(error);
        })
    }
}

const getRequest = function(req, res) {
    if (req.user.is_admin) {
        const _id = req.params.id;
        Request.findOne({ _id }).populate('boxes').then((request) => {
            return res.send(request);
        }).catch((error) => {
            return res.status(400).send(error);
        })
    } else {
        const _id = req.params.id;
        Request.findOne({ _id, createdBy: req.user._id }).populate('boxes').then((request) => {
            return res.send(request);
        }).catch((error) => {
            return res.status(400).send(error);
        })
    }
}

const updateRequest = function(req, res) {
    if (req.user.is_admin) {
        const _id = req.params.id
        const updates = Object.keys(req.body)
        const allowedUpdates = ['status', 'time', 'latitude', 'longitude']
        
        const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))
    
        if( !isValidUpdate ) {
            return res.status(400).send({
                error: 'Invalid update, only allowed to update: ' + allowedUpdates
            })
        }
        Request.findByIdAndUpdate(_id, req.body ).then((request) => {
            if (!request) {
                return res.status(404).send()
            }
            return res.send(request)
        }).catch(function(error) {
            res.status(500).send(error)
        })
    } else {
        const _id = req.params.id
        const updates = Object.keys(req.body)
        const allowedUpdates = ['receive_time', 'receive_street', 'receive_street_info', 'receive_colony', 'receive_state', 'receive_comments', 'receive_postal_code']
        
        const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))
    
        if( !isValidUpdate ) {
            return res.status(400).send({
                error: 'Invalid update, only allowed to update: ' + allowedUpdates
            })
        }
        Request.findByIdAndUpdate(_id, req.body ).then((request) => {
            if (!request) {
                return res.status(404).send()
            }
            return res.send(request)
        }).catch(function(error) {
            res.status(500).send(error)
        })
    }
}

const deleteRequest = function(req, res) {
    if (req.user.is_admin) {
        const _id = req.params.id;
        Box.deleteMany({request_id: _id}).then((value) => {
            Request.deleteOne({_id}).then((value) => {
                return res.send()
            }).catch((error) => {
                return res.status(400).send(error);
            })
        }).catch((error) => {
            return res.status(400).send(error);
        });
    } else {
        return res.status(400).send({
            error: 'Must be admin to delete'
        })
    }
}

module.exports = {
    createRequest: createRequest,
    getRequests: getRequests,
    getRequest: getRequest,
    updateRequest: updateRequest,
    deleteRequest: deleteRequest
}