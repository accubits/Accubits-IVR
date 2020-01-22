const express = require('express')
const router = express.Router()

const { validate } = require('../modules/middleware/validate');
const { verifyUserToken } = require('../modules/middleware/verifyUserToken')
const {
    addNumber
} = require('../modules/number/number-controller')




router.post('/add', validate('addNumber'), verifyUserToken, addNumber)


module.exports = router
