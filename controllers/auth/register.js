const bcrypt = require('bcrypt')
const path = require('path')
const fs = require('fs/promises')
const { Conflict } = require('http-errors')
const { User } = require('../../models')
const { CreateSenderSendGrid, EmailService } = require('../../utils')

const usersDir = path.join(__dirname, '../../', 'public/avatars')

const register = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user) {
    throw new Conflict('Already register')
  }

  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
  const { id, name, avatarURL, verifyToken } = await User.create({ email, password: hashPassword })

  const idUser = id.toString()
  const avatarPath = path.join(usersDir, idUser)
  await fs.mkdir(avatarPath)

  try {
    const emailService = new EmailService(process.env.NODE_ENV, new CreateSenderSendGrid())
    await emailService.sendVerifyEmail(verifyToken, email, name)
  } catch (error) {
    console.log(error.message)
  }

  return res.status(201).json({
    status: 'Success',
    code: 201,
    message: 'Success register',
    data: { id, email, avatarURL, verifyToken },
  })
}

module.exports = register
