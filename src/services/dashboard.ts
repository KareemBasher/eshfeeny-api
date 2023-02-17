import { Application, Request, Response } from 'express'
import sgMail from '@sendgrid/mail'
import config from '../config'

// Configure SendGrid
sgMail.setApiKey(config.sendgridKey as string)

// Function to generate random code
const code = () => Math.random().toString(36).substring(2, 10)

const sendEmail = (req: Request, res: Response) => {
  const verificationCode = code()

  const msg = {
    to: req.params.to as string,
    from: config.sendgridEmail as string,
    subject: 'تغيير كلمة المرور',
    test: 'test message from sendgrid',
    html: `<strong>كود التحقق: ${verificationCode}</strong>`
  }

  try {
    sgMail.send(msg)
    res.send({ code: verificationCode })
  } catch (error) {
    res.status(500)
    res.json(`Unable to send email, ${error}`)
  }
}

const dashboard_routes = (app: Application) => {
  app.get('/email/:to', sendEmail)
}

export default dashboard_routes
