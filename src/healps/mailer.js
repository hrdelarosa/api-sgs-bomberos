import nodemailer from 'nodemailer'
import { EnvConfig } from '../config/env.config.js'

export const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: EnvConfig().gmail_email,
    pass: EnvConfig().email_pass,
  },
})
