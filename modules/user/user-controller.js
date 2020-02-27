const bcrypt = require('bcryptjs');
const passport = require('passport');
const redis = require('../../utilities/redis');
const {
  validationResult
} = require('express-validator');
const responseMessages = require('../../config/responseMessage');
const {
  isValidUser,
  addNewUser,
  updateUser,
  updatePassword,
  resetPassword,
  userDetails,
  singleUserDetails,
  listUserServ
} = require('./user-service')
const {
  signUpMail,
  forgetPasswordMail,
} = require('./email');



const listUsers = async (req, res) => {
  try {
      const result = await listUserServ(req.body);
      if (result) {
          const data = {
              status: true,
              data: result
          }
          res.status(200)
          res.json(data)
      } else {
          const data = {
              status: false,
              data: responseMessages.internalError
          }
          res.status(500)
          res.json(data)
      }
  } catch (e) {
      next(e)
  }
}



// user registration
const register = async (req, res, next) => {
  try {
    let errorArr = [];

    let errors = validationResult(req);
    errorArr = errors.array();

    if (errorArr.length) {
      const data = {
        status: false,
        errors: errorArr
      }
      res.status(422);
      res.json(data);
      return
    }

    const emailId = req.body.emailId
    const valid = await isValidUser(emailId)

    if (!valid) {
      const password = bcrypt.hashSync(req.body.password, 10)
      req.body.password = password
      const result = await addNewUser(req.body)
      if (result) {
        // signUpMail(emailId)
        const data = {
          status: true,
          data: responseMessages.userCreation.success
        }
        res.status(200)
        res.json(data)
      } else {
        const data = {
          status: false,
          data: responseMessages.internalError
        }
        res.status(500)
        res.json(data)
      }
    } else {
      const data = {
        status: false,
        data: responseMessages.userCreation.exists
      }
      res.status(400)
      res.json(data)
    }
  } catch (e) {
    console.log(e)
  }
}


// for user login
const userAuthentication = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const data = {
      status: false,
      errors: errors.array()
    }
    res.status(422)
    res.json(data)
    return
  }

  passport.authenticate('local', async function (err, user, info) {
    if (!user) {
      const data = {
        status: false,
        data: responseMessages.invalidUser
      }
      console.log(err)
      res.status(403)
      res.send(data)
    } else {
      delete user.dataValues.password
      const device = req.body.device ? 'M' : 'D'
      user.dataValues.device = device
      redis.loginSession(user, device, token => {
        const data = {
          status: true,
          token: token,
          data: responseMessages.loginSuccess
        }
        return res.send(data)
      })
    }
  })(req, res, next)
}


// user profile updation

const profileUpdation = async (req, res, next) => {
  const userId = req.userId
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      const data = {
        status: false,
        errors: errors.array()
      }
      res.status(422)
      res.json(data)
      return
    }
    const updateDetails = {
      id: userId,
      details: req.body
    }
    const result = await updateUser(updateDetails)
    if (result) {
      const data = {
        status: true,
        data: responseMessages.profileUpdated
      }
      res.send(data)
    } else {
      const data = {
        status: false,
        data: responseMessages.profileUpdatedError
      }
      res.status(400)
      res.send(data)
    }
  } catch (e) {
    console.log(e)
  }
}



// update password

const passwordUpdate = async (req, res, next) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      const data = {
        status: false,
        errors: errors.array()
      }
      res.status(422)
      res.json(data)
      return
    }
    const currentPassword = req.body.currentPassword
    const newPassword = req.body.newPassword
    const confirmPassword = req.body.confirmPassword
    if (newPassword !== confirmPassword) {
      const data = {
        status: false,
        data: responseMessages.passwordMismatch
      }
      res.status(400)
      res.send(data)
    }
    const userId = req.userId
    const userData = await userDetails(userId)
    if (userData) {
      bcrypt.compare(currentPassword, userData.password, function (err, result) {
        if (err) {
          const data = {
            status: false,
            data: responseMessages.internalError
          }
          res.status(500)
          res.send(data)
        }
        if (result) {
          bcrypt.hash(newPassword, 10, async function (err, hash) {
            if (err) {
              const data = {
                status: false,
                data: responseMessages.internalError
              }
              res.status(500)
              res.send(data)
            }

            const details = {
              userId,
              hash
            }
            const updateResult = await updatePassword(details)
            if (updateResult) {
              const data = {
                status: true,
                data: responseMessages.passwordUpdate
              }
              res.send(data)
            } else {
              const data = {
                status: false,
                data: responseMessages.passwordUpdateError
              }
              res.status(400)
              res.send(data)
            }
          })
        } else {
          const data = {
            status: false,
            data: responseMessages.incorrectPasswordError
          }
          res.status(400)
          res.send(data)
        }
      })
    } else {
      const data = {
        status: false,
        data: responseMessages.incorrectPasswordError
      }
      res.status(400)
      res.send(data)
    }
  } catch (e) {
    console.log(e)
  }
}

// for forgot password
const forgotPassword = async (req, res, next) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      const data = {
        status: false,
        errors: errors.array()
      }
      res.status(422)
      res.json(data)
      return
    }

    const emailId = req.body.emailId
    redis.resetPassword(emailId, async redistoken => {
      const valid = await isValidUser(emailId, redistoken)
      if (!valid) {
        const data = {
          status: true,
          data: responseMessages.forgotPasswordSuccess
        }
        res.status(200)
        res.json(data)
      } else {
        const user = {
          email: emailId,
          token: redistoken
        }
        forgetPasswordMail(user)
        const data = {
          status: true,
          data: responseMessages.forgotPasswordSuccess
        }
        res.status(200)
        res.json(data)
      }
    })
  } catch (e) {
    console.log(e)
  }
}



// forgot password reset

const passwordReset = async (req, res, next) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      const data = {
        status: false,
        errors: errors.array()
      }
      res.status(422)
      res.json(data)
      return
    }

    const newPassword = req.body.newPassword
    const confirmPassword = req.body.confirmPassword
    if (newPassword !== confirmPassword) {
      const data = {
        status: false,
        data: responseMessages.passwordMismatch
      }
      res.status(400)
      res.send(data)
    }
    const token = req.body.token
    if (!token) {
      const data = {
        status: false,
        data: responseMessages.invalidToken
      }
      res.status(400)
      res.send(data)
      return
    }
    redis.checkSession(token, datas => {
      bcrypt.hash(newPassword, 10, async function (err, hash) {
        if (err) {
          const data = {
            status: false,
            data: responseMessages.internalError
          }
          res.status(500)
          res.send(data)
          return
        }
        const details = {
          datas,
          hash
        }
        const values = await resetPassword(details)
        redis.deleteSession(token, val => {
          if (val) {
            const data = {
              status: true,
              data: responseMessages.passwordResetSuccess
            }
            res.status(200)
            res.json(data)
            return
          } else {
            const data = {
              status: false,
              data: responseMessages.invalidToken
            }
            res.status(400)
            res.send(data)
            return
          }

        })

      })
    })
  } catch (e) {
    console.log(e)
  }
}


// logout 
const logout = async (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization']
  if (token && token.startsWith('Bearer ')) {
    token = token.slice(7, token.length) // Remove Bearer from string
  }

  if (!token)
    return res.status(403).send({
      status: false,
      data: 'No token provided.'
    })
  redis.deleteSession(token, result => {
    if (result) {
      const data = {
        status: true,
        message: 'Logged out successfully'
      }
      res.status(200)
      res.json(data)

    } else {
      const data = {
        status: true,
        message: 'Logged out successfully'
      }
      res.status(200)
      res.json(data)
    }

  })

}



// get user details
const getUserDetails = async (req, res, next) => {

  try {
    const id = req.userId
    const userDetailsValues = await singleUserDetails(id)
    if (userDetailsValues) {
      const data = {
        status: true,
        data: userDetailsValues
      }
      res.status(200)
      res.json(data)
      return
    } else {
      const data = {
        status: false,
        data: responseMessages.invalidId
      }
      res.status(400)
      res.send(data)
      return
    }

  } catch (e) {
    const data = {
      status: false,
      data: responseMessages.invalidId
    }
    res.status(400)
    res.send(data)
    return
  }

}

async function getUser() {
  try {
    const userDetailsValues = await userDetails()
    return userDetailsValues
  } catch (error) {
    next(error)
  }
}

// validate token for mobile for reset password
const verifyOtp = async (req, res, next) => {
  const token = req.body.token
  if (!token) {
    const data = {
      status: false,
      message: responseMessages.invalidToken
    }
    res.status(400)
    res.send(data)
    return
  }
  redis.checkSession(token, datas => {
    if (datas) {
      const data = {
        status: true,
        message: "Token verified"
      }
      res.status(200)
      res.send(data)
      return
    } else {
      const data = {
        status: false,
        message: responseMessages.invalidToken
      }
      res.status(400)
      res.send(data)
      return
    }
  })
}


module.exports = {
  register,
  userAuthentication,
  getUserDetails,
  forgotPassword,
  passwordReset,
  passwordUpdate,
  profileUpdation,
  logout,
  verifyOtp,
  getUser,
  listUsers
}