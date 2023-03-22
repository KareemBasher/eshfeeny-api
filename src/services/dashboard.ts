import { Application, Request, Response } from 'express'
import sgMail from '@sendgrid/mail'
import config from '../config'
import axios from 'axios'
import ProductServicesModel from '../models/productServices.model'

// Configure SendGrid
sgMail.setApiKey(config.sendgridKey as string)

// Instantiate Product Services Model
const productServicesModel = new ProductServicesModel()

// Function to generate random code
const code = () => Math.floor(1000 + Math.random() * 9000).toString()

const createEmail = async (email: string) => {
  const verificationCode = code() as unknown as string

  const msg = {
    to: email,
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
    await sgMail.send(msg)
    return verificationCode
  } catch (error) {
    console.log(`Unable to send email, ${error}`)
  }
}

const sendEmail = async (req: Request, res: Response) => {
  try {
    const verificationCode = await createEmail(req.params.to)
    res.send({ code: verificationCode })
  } catch (error) {
    res.status(500)
    res.json(`Unable to send email, ${error}`)
  }
}

const imageSearch = async (req: Request, res: Response) => {
  try {
    const axiosConfig = {
      headers: {
        'Ocp-Apim-Subscription-Key': config.msAzureCVKey as string
      }
    }

    const data = {
      url: req.body.imageURL
    }

    const imageResult = await axios.post(config.MSAzureCVURL as string, data, axiosConfig)
    const imageContent = imageResult.data.readResult.content

    const searchResults = await productServicesModel.search(imageContent)

    res.send(searchResults)
  } catch (error) {
    res.status(500)
    res.json(`Unable to search for image, ${error}`)
  }
}

const dashboard_routes = (app: Application) => {
  app.get('/email/:to', sendEmail)
  app.post('/imageSearch', imageSearch)
}

export default dashboard_routes
