import * as dotenv from 'dotenv'

dotenv.config()

const { PORT, BCRYPT_SECRET, SALT, SIGNITURE, MONGODB_STRING, SENDGRID_API, SENDGRID_EMAIL } =
  process.env

export default {
  port: PORT,
  secret: BCRYPT_SECRET,
  salt: SALT,
  signiture: SIGNITURE,
  dbString: MONGODB_STRING,
  sendgridKey: SENDGRID_API,
  sendgridEmail: SENDGRID_EMAIL
}
