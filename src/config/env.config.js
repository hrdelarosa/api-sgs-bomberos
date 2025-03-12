import '../lib/loadEnv.js'

const {
  JWT_SECRET: jwt_secret,
  GMAIL_EMAIL: gmail_email,
  EMIAL_PASS: email_pass,
  GOOGLE_CLIENT_ID: client_id,
  GOOGLE_CLIENT_SECRET: client_secret,
  GOOGLE_REFRESH_TOKEN: resfresh_token,
  APP_URL: app_url,
} = process.env

export const EnvConfig = () => ({
  jwt_secret,
  gmail_email,
  email_pass,
  client_id,
  client_secret,
  resfresh_token,
  app_url,
})
