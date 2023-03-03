import * as dotenv from 'dotenv'

dotenv.config()

const {
  PORT,
  BCRYPT_SECRET,
  SALT,
  SIGNITURE,
  MONGODB_STRING,
  SENDGRID_API,
  SENDGRID_EMAIL,
  SENDGRID_TEMPLATE_ID,
  IMGBB_API_KEY,
  MS_AZURE_CV_KEY,
  MS_AZURE_CV_URL
} = process.env

export default {
  port: PORT,
  secret: BCRYPT_SECRET,
  salt: SALT,
  signiture: SIGNITURE,
  dbString: MONGODB_STRING,
  sendgridKey: SENDGRID_API,
  sendgridEmail: SENDGRID_EMAIL,
  sendgridTemplate: SENDGRID_TEMPLATE_ID,
  imgbbKey: IMGBB_API_KEY,
  msAzureCVKey: MS_AZURE_CV_KEY,
  MSAzureCVURL: MS_AZURE_CV_URL
}
