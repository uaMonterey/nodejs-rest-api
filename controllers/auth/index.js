const register = require('./register')
const login = require('./login')
const logout = require('./logout')
const currentUser = require('./currentUser')
const updateAvatar = require('./updateAvatars')
const verify = require('./verify')
const repeatEmailVerification = require('./repeatEmailVerification')

module.exports = {
  register,
  login,
  logout,
  currentUser,
  updateAvatar,
  verify,
  repeatEmailVerification,
}
