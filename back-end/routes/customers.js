const express = require('express')
const router = express.Router()
const controller = require('../controllers/customer')
const auth = require('../lib/auth')

router.post('/',controller.create)
router.get('/',auth,controller.retrieve)
router.get('/:id', controller.retrieveOne)
router.put('/:id', controller.update)
router.delete('/:id', controller.delete)

module.exports = router;
