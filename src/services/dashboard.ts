import { Application, Request, Response } from 'express'
import sgMail from '@sendgrid/mail'
import config from '../config'

// Configure SendGrid
sgMail.setApiKey(config.sendgridKey as string)

// Function to generate random code
const code = () => Math.floor(1000 + Math.random() * 9000).toString()

const sendEmail = (req: Request, res: Response) => {
  const verificationCode = code() as unknown as string

  const msg = {
    to: req.params.to as string,
    from: config.sendgridEmail as string,
    subject: 'تغيير كلمة المرور',
    test: 'test message from sendgrid',
    templateId: config.sendgridTemplate as string,
    dynamic_template_data: {
      one: verificationCode[0],
      two: verificationCode[1],
      three: verificationCode[2],
      four: verificationCode[3]
    }
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