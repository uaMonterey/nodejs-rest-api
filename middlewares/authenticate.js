const jwt = require('jsonwebtoken')
const { Unauthorized } = require('http-errors')
const { User } = require('../models')

require('dotenv').config()
const { SECRET_KEY } = process.env

const authenticate = async (req, _res, next) => {
  try {
    const [bearer, token] = req.headers.authorization.split(' ')
    if (bearer !== 'Bearer') {
      throw new Unauthorized()
    }
    jwt.verify(token, SECRET_KEY)

    const user = await User.findOne({ token })
    if (!user) {
      throw new Unauthorized()
    }
    req.user = user
    next()
  } catch (error) {
    throw new Unauthorized(error.message)
  }
}

module.exports = authenticate
