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

// Getting all pharmacies that have the products requested
const getPharmacies = async (req: Request, res: Response) => {
  try {
    const result = await pharmacyServicesModel.getPharmacies(req.body.products)
    res.json(result)
  } catch (error) {
    res.status(500)
    res.json(error)
  }
}

// Getting all favorites from a pharmacy
const getFavorites = async (req: Request, res: Response) => {
  try {
    const result = await pharmacyServicesModel.getFavorites(req.params.id as string)
    res.json(result)
  } catch (error) {
    res.status(500)
    res.json(error)
  }
}

// Updating favorite product for a pharmacy using their ID
const addFavoriteProduct = async (req: Request, res: Response) => {
  try {
    const result = await pharmacyServicesModel.updateFavorites(
      req.params.id as string,
      req.body.productId
    )
    res.json(result)
  } catch (error) {
    res.status(500)
    res.json(error)
  }
}

// Removing favorite product for a pharmacy using their ID
const removeFavoriteProduct = async (req: Request, res: Response) => {
  try {
    const result = await pharmacyServicesModel.removeFavorites(
      req.params.id as string,
      req.params.productId as string
    )
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
  app.post('/pharmacies/available', getPharmacies)
  app.get('/pharmacies/:id/favorites', getFavorites)
  app.patch('/pharmacies/:id/favorites', addFavoriteProduct)
  app.delete('/pharmacies/:id/favorites/:productId', removeFavoriteProduct)
}

export default pharmacyServices_routes
