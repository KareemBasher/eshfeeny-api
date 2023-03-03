import { Application, Request, Response } from 'express'
import sgMail from '@sendgrid/mail'
import config from '../config'
import FormData from 'form-data'
import fs from 'fs'
import axios from 'axios'
import ProductServicesModel from '../models/productServices.model'

// Configure SendGrid
sgMail.setApiKey(config.sendgridKey as string)

// Instantiate Product Services Model
const productServicesModel = new ProductServicesModel()

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

interface ImgbbResponseObject {
  data: { url: string }
}

// Handling image uploads
const uploadImage = async (imagePath: string): Promise<string> => {
  const form = new FormData()
  form.append('key', config.imgbbKey as string)
  form.append('image', fs.createReadStream(imagePath))

  try {
    const result = await axios.post<ImgbbResponseObject>('https://api.imgbb.com/1/upload', form)

    return result.data.data.url
  } catch (error) {
    return `Failed to uploadd image, ${error}`
  }
}

// Getting the link for the uploaded image
const getUploadedImage = async (req: Request, res: Response) => {
  try {
    const result = await uploadImage(req.body.imagePath)
    res.send(result)
  } catch (error) {
    res.status(500)
    res.json(`Unable to upload image, ${error}`)
  }
}

const imageSearch = async (req: Request, res: Response) => {
  try {
    const imageURL = await uploadImage(req.body.imagePath)

    const axiosConfig = {
      headers: {
        'Ocp-Apim-Subscription-Key': config.msAzureCVKey as string
      }
    }

    const data = {
      url: imageURL
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
  app.post('/upload', getUploadedImage)
  app.post('/imageSearch', imageSearch)
}

export default dashboard_routes
