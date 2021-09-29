const Mailgen = require('mailgen')
require('dotenv').config()

class EmailService {
  constructor(env, sender) {
    this.sender = sender
    switch (env) {
      case 'developer':
        this.link = process.env.NGROK
        break
      case 'production':
        this.link = 'link for production'
        break
      default:
        this.link = process.env.NGROK
        break
    }
  }
  #createTemplateVerificationEmail(verifyToken, owner) {
    const mailGenerator = new Mailgen({
      theme: 'salted',
      product: {
        name: 'Monterey',
        link: this.link,
      },
    })
    const email = {
      body: {
        name: owner,
        intro: "Welcome to Monterey Developers Group! We're very excited to have you on board.",
        action: {
          instructions: 'To get started use our service, please click here:',
          button: {
            color: '#22BC66',
            text: 'Confirm your account',
            link: `${this.link}/api/v1/users/verify/${verifyToken}`,
          },
        },
        outro: "Need help, or have questions? Just reply to this email, we'd love to help.",
      },
    }
    return mailGenerator.generate(email)
  }
  async sendVerifyEmail(verifyToken, email, name) {
    const emailHtml = this.#createTemplateVerificationEmail(verifyToken, name)
    const msg = {
      to: email,
      subject: 'Verify your account',
      html: emailHtml,
    }

    const result = await this.sender.send(msg)
    console.log(result)
  }
}

module.exports = EmailService
