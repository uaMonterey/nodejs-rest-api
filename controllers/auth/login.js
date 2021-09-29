const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { BadRequest, Unauthorized } = require('http-errors')
const { User } = require('../../models/user')

const login = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (!user) {
    throw new BadRequest('Wrong email')
  }

  const hashPassword = user.password
  const compareResult = bcrypt.compareSync(password, hashPassword)

  if (!compareResult) {
    throw new BadRequest('Wrong password')
  }

  if (!user.isVerified) {
    throw new Unauthorized('User has not verified')
  }

  const payload = { id: user._id }
  const { SECRET_KEY } = process.env

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '2h' })
  await User.findByIdAndUpdate(user._id, { token })
  return res.status(200).json({
    status: 'Success login',
    data: {
      email,
      token,
    },
  })
}
module.exports = login
