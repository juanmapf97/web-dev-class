const User = require('../models/user')

const createUser = function(req, res){
    const user = new User(req.body)
    user.save().then(function() {
        user.generateToken().then(function(token){
            return res.send({user, token})
        }).catch(function(error){
            // TODO check this
            return res.status(401).send(
                { 
                    error: error,
                    message: 'Se requiere autenticación para hacer esto.'
                })
        })
    }).catch(function(error) {
        return res.status(400).send(
            { 
                error: error,
                message: 'Error al crear usuario. Intenta más tarde o revisa tus datos.'
            })
    })
}

const login = function(req, res) {
    User.findByCredentials(req.body.email, req.body.password).then(function(user){
        user.generateToken().then(function(token){
            return res.send({user, token})
        }).catch(function(error){
            return res.status(401).send(
                { 
                    error: error,
                    message: 'Se requiere autenticación para hacer esto.'
                })
        })
    }).catch(function(error) {
        return res.status(401).send(
            { 
                error: error,
                message: 'Revisa tus datos y vuelve a intentar.'
            })
    })
}

const logout = function(req, res) {
    req.user.tokens = req.user.tokens.filter(function(token) {
        return token.token !== req.token
    })
    req.user.save().then(function() {
        return res.send()
    }).catch(function(error) {
        return res.status(500).send(
            { 
                error: error,
                message: 'Ocurrió un error inesperado'
            })
    })
}

const getUser = function(req, res) {
    return res.send(req.user);
}

const updateUser = function(req, res) {
    const _id = req.user._id
    const updates = Object.keys(req.body)
    const allowedUpdates = ['first_name', 'last_name', 'password', 'email']
    
    const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))
  
    if( !isValidUpdate ) {
      return res.status(400).send({
        error: 'Invalid update, only allowed to update: ' + allowedUpdates,
        message: 'Un campo que intentaste actualizar no está permitido'
      })
    }
    User.findByIdAndUpdate(_id, req.body ).then(function(user) {
      if (!user) {
        return res.status(404).send()
      }
      return res.send(user)
    }).catch(function(error) {
        return res.status(500).send(
            { 
                error: error,
                message: 'Ocurrió un error inesperado'
            })
    })
}

module.exports = {
    login: login,
    logout: logout,
    createUser : createUser,
    updateUser : updateUser,
    getUser: getUser
}