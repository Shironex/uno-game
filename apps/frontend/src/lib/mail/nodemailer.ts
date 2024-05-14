import { env } from '@/env.mjs'
import { EMAIL_SENDER } from '@/lib/constants'
import { createTransport, type TransportOptions } from 'nodemailer'

const smtpConfig = {
  host: env.SMTP_HOST,
  port: parseInt(env.SMTP_PORT),
  // auth: {
  //   user: env.SMTP_USER,
  //   pass: env.SMTP_PASSWORD,
  // },
}

const transporter = createTransport(smtpConfig as TransportOptions)

transporter.verify((error) => {
  if (error) {
    console.error('Error connecting to transporter:', error)
  } else {
    console.log('Transporter connection is successful')
  }
})

export type MessageInfo = {
  to: string
  subject: string
  body: string
}

export const sendMail = async (message: MessageInfo) => {
  if (process.env.cypress_test) return

  const { to, subject, body } = message

  const mailOptions = {
    from: EMAIL_SENDER,
    to,
    subject,
    html: body,
  }

  return transporter.sendMail(mailOptions)
}
