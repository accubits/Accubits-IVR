const moment = require('moment')
const { check } = require('express-validator')

const validate = method => {
  switch (method) {
    case 'authenticate': {
      return [
        check('username', "Username doesn't exists").exists(),
        check('password', "Password doesn't exists").exists()
      ]
    }
    case 'addNewUser': {
      return [
        check('password', "Password doesn't exists").exists(),
        check('firstName', 'Name cannot be left blank').trim().isLength({ min: 1 }),
        check('firstName', 'First name entered exceeds the maximum length').trim().isLength({ max: 50 }),
        check('lastName', 'Name cannot be left blank').trim().isLength({ min: 1 }),
        check('lastName', 'Last name exceeds the maximum length').trim().isLength({ max: 50 }),
        check('phoneNo', 'Phone number cannot be left blank').exists().trim().isLength({ min: 1 }),
        check('phoneNo', 'Phone number exceeds the maximum length').trim().isLength({ max: 15 }),
        check('phoneNo')
          .custom(value => /^[^-\s][a-zA-Z0-9_\s-]+$/.test(value))
          .withMessage('No spaces are allowed in starting of phone number'),
        check('password')
          .isLength({ min: 8 })
          .withMessage('Password should be combination of one uppercase , one lower case, one special char, one digit and min 8')
          .matches(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/, "i")
          .withMessage('Password should be combination of one uppercase , one lower case, one special char, one digit and min 8')
      ]
    }
   
    case 'updatePassword': {
      return [
        check('newPassword')
          .isLength({ min: 8 })
          .withMessage('Password should be combination of one uppercase , one lower case, one special char, one digit and min 8')
          .matches(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/, "i")
          .withMessage('Password should be combination of one uppercase , one lower case, one special char, one digit and min 8')
      ]
    }
    case 'emailValidation': {
      return [
        check('emailId')
          .isEmail()
          .withMessage('Please enter a valid email address')
          .trim()
          .normalizeEmail()
      ]
    }

    case 'profileUpdation': {
      return [
        check('firstName', 'Name cannot be left blank').trim().isLength({ min: 1 }),
        check('firstName', 'First name entered exceeds the maximum length').trim().isLength({ max: 50 }),
        check('lastName', 'Name cannot be left blank').trim().isLength({ min: 1 }),
        check('lastName', 'Last name exceeds the maximum length').trim().isLength({ max: 50 }),
        check('phoneNo', 'Phone number cannot be left blank').exists().trim().isLength({ min: 1 }),
        check('phoneNo', 'Phone number exceeds the maximum length').trim().isLength({ max: 20 }),
        check('phoneNo')
          .custom(value => /^[^-\s][a-zA-Z0-9_\s-]+$/.test(value))
          .withMessage('No spaces are allowed in starting of phone number'),
        
      ]

    }

    case 'addNumber': {
      return [
        check('name', 'Name cannot be left blank').trim().isLength({ min: 1 }),
        check('name', 'First name entered exceeds the maximum length').trim().isLength({ max: 50 }),
        check('phoneNo', 'Phone number cannot be left blank').exists().trim().isLength({ min: 1 }),
        check('phoneNo', 'Phone number exceeds the maximum length').trim().isLength({ max: 20 }),
        check('phoneNo')
          .custom(value => /^[^-\s][a-zA-Z0-9_\s-]+$/.test(value))
          .withMessage('No spaces are allowed in starting of phone number'),
      ]
    }

    case 'addIVROption': {
      return [
        check('numberId', "numberId must be numeric").isNumeric(),
        check('userId', "userId must be numeric").isNumeric(),
        check('selectNo',"selectNo must be numeric").isNumeric(),
        check('orderNo',"orderNo must be numeric").isNumeric(),

      ]
    }
  }

  
}

module.exports = {
  validate
}
