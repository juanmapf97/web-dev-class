const Request = require('../models/request');
const Box = require('../models/box');

const getRequestBoxes = function(req, res) {
    const _id = req.params.id;

    Request.findById(_id).then((request) => {
        Box.find({ request_id: request._id }).then((boxes) => {
            return res.send(boxes);
        }).catch((error) => {
            return res.status(400).send(
                { 
                    error: error,
                    message: 'Tus cajas no fueron encontradas o no existen'
                })
        })
    }).catch((error) => {
        return res.status(400).send(
            { 
                error: error,
                message: 'Tu pedido no fue encontrado o no existen'
            })
    })
}

module.exports = {
    getRequestBoxes: getRequestBoxes
}