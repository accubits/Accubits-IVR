const redis = require('ioredis')

function verifyUserToken(req, res, next) {
  let token = req.headers['x-access-token'] || req.headers['authorization']
  if (token && token.startsWith('Bearer ')) {
    token = token.slice(7, token.length) // Remove Bearer from string
  }

  if (!token)
    return res.status(403).send({
      status: false,
      data: 'No token provided.'
    })

  const client = new redis({
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST
  })

  client.get(token, (error, data) => {
    if (error) {
      console.log(error)
      return res.status(401).send({
        status: false,
        data: 'Failed to authenticate token.'
      })
    } else {
      let userData = JSON.parse(data)
      if (!userData) {
        return res.status(401).send({
          status: false,
          data: 'Invalid token.'
        })
      }
      let device = userData.device
      if (device == 'M') {
        let expiryTime =
          device == 'M' ? process.env.REDIS_TTL_MOBILE : process.env.REDIS_TTL
        client.expire(token, expiryTime)
      }
      client.disconnect()

      req.userId = userData.id
      next()
    }
  })
}


module.exports = {verifyUserToken}
