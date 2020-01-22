var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var User = require('../models/user')

// Save the user in the session
const serializeUser = () => {
  'use strict'
  passport.serializeUser(function(user, done) {
    done(null, user.id)
  })
}

/**
 * Get the user from MySQL DB
 */

const deserializeUser = () => {
  'use strict'
  passport.deserializeUser(function(id, done) {
    User.findById(id, {
      attributes: ['id', 'emailId', 'firstName', 'lastName']
    })
      .then(function(user) {
        done(null, user)
      })
      .catch(function(err) {
        done(err, false)
      })
  })
}

/**
 * Configure the strategy passport should use
 */
const configureStrategy = () => {
  'use strict'
  passport.use(
    new LocalStrategy(function(username, password, done) {
      User.findOne({
        where: {
          emailId: username,
          isActive:1,
          isDeleted:0,
        },
        attributes: ['id', 'password', 'emailId', 'firstName', 'lastName']
      }).then(function(user) {
        if (!user) {
          return done(null, false, {
            errMsg: "User doesn't exist"
          })
        }

        if (!user.validatePassword(password)) {
          return done(null, false, {
            errMsg: 'Password does not match'
          })
        }

        return done(null, user)
      })
    })
  )
}

module.exports = {
  serializeUser,
  deserializeUser,
  configureStrategy
}
