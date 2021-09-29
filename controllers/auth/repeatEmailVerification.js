const { Conflict, NotFound } = require('http-errors')
const { User } = require('../../models')
const { EmailService, CreateSenderNodemailer } = require('../../utils/')

const repeatEmailVerification = async (req, res, _next) => {
  const { email } = req.body

  const user = await User.findOne({ email })

  if (user) {
    const { name, email, isVerified, verifyToken } = user
    if (!isVerified) {
      const emailService = new EmailService(process.env.NODE_ENV, new CreateSenderNodemailer())
      await emailService.sendVerifyEmail(verifyToken, email, name)
      return res.status(200).json({
        status: 'success',
        code: 200,
        message: 'Resubmitted success!',
      })
    }
    throw new Conflict('Email has been verified')
  }
  throw new NotFound('User not found')
}

module.exports = repeatEmailVerification
