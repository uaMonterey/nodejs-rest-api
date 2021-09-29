const { User } = require('../../models')

const logout = async (req, res) => {
  await User.findOneAndUpdate(req.user._id, { token: null })
  res.status(200).json({ message: 'Success logout' })
}

module.exports = logout
