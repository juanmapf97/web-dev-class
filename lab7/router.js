const express = require('express');
const controller = require('./person_controller');
const router = express.Router();

router.get('/persons', controller.getPersons);
router.get('/persons/:id', controller.getPersonById);
router.post('/persons', controller.createPerson);
router.patch('/persons/:id', controller.updatePerson);
router.delete('/persons/:id', controller.deletePerson);

module.exports = router;