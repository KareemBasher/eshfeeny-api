import * as dotenv from 'dotenv'

dotenv.config()

const { PORT, BCRYPT_SECRET, SALT, SIGNITURE } = process.env

export default {
  port: PORT,
  secret: BCRYPT_SECRET,
  salt: SALT,
  signiture: SIGNITURE
}
