var express = require('express');
var router = express.Router();

const { validate } = require('../modules/middleware/validate');
const { verifyUserToken } = require('../modules/middleware/verifyUserToken')


const {
    welcome,
    menu
} = require('../modules/ivr')
const {
    addIVROption
} = require('../modules/ivr/ivr-controller')

router.post('/welcome', welcome);
router.post('/menu', menu);

router.post('/addOption', validate("addIVROption"), verifyUserToken, addIVROption)

module.exports = router