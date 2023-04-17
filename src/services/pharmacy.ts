import { Application, Request, Response } from 'express'
import PharmacyServicesModel from '../models/pharmacyServices.model'

// Instantiate PharmacyServicesModel class
const pharmacyServicesModel = new PharmacyServicesModel()

// Verifying pharmacy for login
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

// Update pharmacy's name, email, and/or phone number
const updateProfile = async (req: Request, res: Response) => {
  try {
    const result = await pharmacyServicesModel.updateProfile(
      req.params.id as string,
      req.body.name,
      req.body.email,
      req.body.phoneNumber,
      req.body.address
    )

    res.json(result)
  } catch (error) {
    res.status(500)
    res.json(error)
  }
}

// Update pharmacy's password
const updatePassword = async (req: Request, res: Response) => {
  try {
    const result = await pharmacyServicesModel.updatePassword(
      req.params.id as string,
      req.body.password as string
    )
    res.json(result)
  } catch (error) {
    res.status(500)
    res.json(error)
  }
}

const getpharmacies = async (req: Request, res: Response) => {
  try {
    const result = await pharmacyServicesModel.getpharmacies(req.body.products)
    res.json(result)
  } catch (error) {
    res.status(500)
    res.json(error)
  }
}

const pharmacyServices_routes = (app: Application) => {
  app.post('/pharmacies/verify', verify)
  app.patch('/pharmacies/:id/profile', updateProfile)
  app.patch('/pharmacies/:id/password', updatePassword)
  app.post('/pharmacies/available', getpharmacies)
}

export default pharmacyServices_routes
