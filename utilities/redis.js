const redis = require('ioredis')
const jwt = require('jsonwebtoken');
const privateKey = process.env.JWT_PRIVATE_KEY

module.exports = {
  loginSession(user, device, callBack) {
    const token = jwt.sign({ user: user }, privateKey)
    // const token = randomstring.generate(15);
    const client = new redis({
      port: process.env.REDIS_PORT,
      host: process.env.REDIS_HOST
    })
    var userDetails = user
    client.set(token, JSON.stringify(userDetails), (error, data) => {
      if (error) {
        global.logger.log('set error redis', error)
        callBack(false)
      } else {
        const expiryTime =
          device == 'M' ? process.env.REDIS_TTL_MOBILE : process.env.REDIS_TTL
        client.expire(token, expiryTime, (setExpError, setExpData) => {
          client.disconnect()
          if (setExpError) {
            callBack(false)
          } else {
            callBack(token)
          }
        })
      }
    })
  },


  resetPassword(user, callBack) {
    console.log(user)
    const token = jwt.sign({ user: user }, privateKey)
    const client = new redis({
      port: process.env.REDIS_PORT,
      host: process.env.REDIS_HOST
    })
    client.set(token, JSON.stringify(user), (error, data) => {
      console.log(error, data)
      if (error) {
        global.logger.log('set error redis', error)
        callBack(false)
      } else {
        client.expire(
          token,
          process.env.RESET_TOKEN_TIME,
          (setExpError, setExpData) => {
            client.disconnect()
            if (setExpError) {
              callBack(false)
            } else {
              console.log(token)
              callBack(token)
            }
          }
        )
      }
    })
  },
 

  checkSession(tokens, callBack) {
    const client = new redis({
      port: process.env.REDIS_PORT,
      host: process.env.REDIS_HOST
    })

    client.get(tokens, (error, data) => {
      console.log(tokens)
      if (error) {
        console.log(error)
        callBack(false)
      } else {
        console.log(data)
        callBack(JSON.parse(data))
      }
    })
  },
  deleteSession(tokens, callBack) {
    console.log(tokens)
    const client = new redis({
      port: process.env.REDIS_PORT,
      host: process.env.REDIS_HOST
    })

    client.del(tokens, (err, response) => {
      console.log(response, err)
      if (response == 1) {
        console.log('deleted successfully!')
        callBack(true)

      } else {
        console.log('cannot delete')
        callBack(false)
      }
    })
  }
}
