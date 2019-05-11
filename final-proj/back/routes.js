const express = require('express')
const router = express.Router()
var cors = require('cors');

const users = require('./controllers/users.js')
const request = require('./controllers/requests')
const boxes = require('./controllers/boxes')
const auth = require('./middleware/auth')

router.all('*', cors());

router.get('/users', auth, users.getUser)
router.post('/users/login', users.login)
router.post('/users/logout', auth, users.logout)
router.post('/users', users.createUser)  // signup
router.patch('/users', auth, users.updateUser)

router.get('/requests/:id', auth, request.getRequest)
router.get('/requests', auth, request.getRequests)
router.post('/requests', auth, request.createRequest)
router.patch('/requests/:id', auth, request.updateRequest)

router.get('/boxes/:id', auth, boxes.getRequestBoxes)

router.get('*', function(req, res) {
  res.send({
    error: 'This route does not exist, try /users or /todos'
  })
})

module.exports = router

