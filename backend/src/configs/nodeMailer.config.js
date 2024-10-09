import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

const transporter = nodemailer.createTransport({
  secure: true,
  host: 'smtp.gmail.com',
  port: 465,
  auth: {
    user: process.env.NODE_MAILER_USER,
    pass: process.env.NODE_MAILER_PASS,
  }
})

async function sendMail(to, subject, html) {
  try {
    const response = await transporter.sendMail({
      from: process.env.NODE_MAILER_USER,
      to,
      subject,
      html,
    })
    console.log("Email Send:", response.messageId);
  } catch (error) {
    console.log("Error sending email:", error);
  }
}

export { sendMail }