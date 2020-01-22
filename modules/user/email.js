
const sgMail = require('@sendgrid/mail')

const from = process.env.SMTP_FROM_MAIL_ID

const signUpMail = to => {
  sgMail.setApiKey(process.env.SENDGRID_CODE)
  var mailOptions = {
    to: to,
    from: from,
    subject: 'Welcome!',
    html: ``

  }
  sgMail.send(mailOptions)


  return true
}

const forgetPasswordMail = to => {
  sgMail.setApiKey(process.env.SENDGRID_CODE)

  var mailOptions = {
    to: to.email,
    from: from,
    subject: 'Password Reset',
    html:
      ` `

  }
  sgMail.send(mailOptions)

  return true
}

const resetPwdMail = function resetPwdMail(name, to) {
  const smtpTransport = nodemailer.createTransport(poolConfig)

  var mailOptions = {
    to: to,
    from: from,
    subject: 'Your password has been changed',
    text:
      'Dear ' +
      name +
      ',\n\n' +
      'This is a confirmation that the password for your account has just been changed.\n'
  }

  smtpTransport.sendMail(mailOptions, function (err) {
    console.log(err)
  })

  return true
}

module.exports = {
  forgetPasswordMail,
  resetPwdMail,
  signUpMail,
}
