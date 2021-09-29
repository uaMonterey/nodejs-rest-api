const { User } = require('../../models')
const { Unauthorized } = require('http-errors')

const currentUser = async (req, res) => {
  const [bearer, token] = req.headers.authorization.split(' ')
  if (bearer !== 'Bearer') {
    throw new Unauthorized()
  }

  const { id, email, subscription, avatarURL, verifyToken, isVerified } = await User.findOne({ token })
  return res.status(200).json({
    status: 'success',
    code: 200,
    ContentType: 'application/json',
    ResponseBody: { id, email, subscription, avatarURL, verifyToken, isVerified },
  })
}
module.exports = currentUser
