const express = require('express')
const router = express.Router()

const { validate } = require('../modules/middleware/validate');
const { verifyUserToken } = require('../modules/middleware/verifyUserToken')
const {
    addNumber,
    listNumbers
} = require('../modules/number/number-controller')




router.post('/add', validate('addNumber'), verifyUserToken, addNumber)
router.get('/list', validate('addNumber'), verifyUserToken, listNumbers)


module.exports = router
