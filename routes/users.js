const express = require('express')
const router = express.Router()

const { validate } = require('../modules/middleware/validate');
const { verifyUserToken } = require('../modules/middleware/verifyUserToken')
const {
  register,
  userAuthentication,
  passwordUpdate,
  forgotPassword,
  passwordReset,
  profileUpdation,
  logout,
  getUserDetails,
  listUsers
} = require('../modules/user/user-controller')




router.post('/registration', validate('addNewUser'), register)
router.post('/login', validate('authenticate'), userAuthentication)
router.post('/profileUpdation', validate('profileUpdation'), verifyUserToken, profileUpdation)
router.post('/passwordUpdate', validate('updatePassword'), verifyUserToken, passwordUpdate)
router.post('/forgotPassword', validate('emailValidation'), forgotPassword)
router.post('/passwordReset', validate('updatePassword'), passwordReset)
router.get('/logout', logout)
router.get('/getUserDetails', verifyUserToken, getUserDetails)
router.get('/list', verifyUserToken, listUsers)


module.exports = router
