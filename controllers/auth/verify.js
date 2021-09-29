const { BadRequest } = require('http-errors')
const { User } = require('../../models')

const verify = async (req, res, _next) => {
  const { token } = req.params
  const user = await User.findOne({ verifyToken: token })
  if (user) {
    await User.findOneAndUpdate({ _id: user._id }, { isVerified: true, verifyToken: null })
    return res.status(200).json({
      status: 'success',
      code: 200,
      message: 'User is verified',
    })
  }
  throw new BadRequest("Verification token isn't valid")
}

module.exports = verify
