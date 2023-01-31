import { Application, Request, Response } from 'express'
import UserServicesModel from '../models/userSerices.model'

// Instantiate UserModel class
const userServicesModel = new UserServicesModel()

const verify = async (req: Request, res: Response) => {
  try {
    const result = await userServicesModel.verifyLogin(req.body.password as string, req.body.email)
    res.json(result)
  } catch (error) {
    res.status(500)
    res.json(error)
  }
}

const userServices_routes = (app: Application) => {
  app.post('/users/verify', verify)
}

export default userServices_routes
