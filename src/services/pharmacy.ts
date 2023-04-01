import { Application, Request, Response } from 'express'
import PharmacyServicesModel from '../models/pharmacyServices.model'
import { ObjectId } from 'mongodb'

// Instantiate UserModel class
const pharmacyServicesModel = new PharmacyServicesModel()

// Verifying user for login
const verify = async (req: Request, res: Response) => {
  try {
    const result = await pharmacyServicesModel.verifyLogin(
      req.body.password as string,
      req.body.email
    )

    res.json(result)
  } catch (error) {
    res.status(500)
    res.json(error)
  }
}

const pharmacyServices_routes = (app: Application) => {
  app.post('/pharmacies/verify', verify)
}

export default pharmacyServices_routes
