import { Application, Request, Response } from 'express'
import ManufacturerServicesModel from '../models/manufacturerServices.model'
import { ObjectId } from 'mongodb'

// Instantiate ManufacturerModel class
const manufacturerServicesModel = new ManufacturerServicesModel()

// Verifying manufacturer for login
const verify = async (req: Request, res: Response) => {
  try {
    const result = await manufacturerServicesModel.verifyLogin(
      req.body.password as string,
      req.body.email as string
    )

    res.json(result)
  } catch (error) {
    res.status(500)
    res.json(error)
  }
}

// Update manufacturer's name, email, and/or phone number
const updateProfile = async (req: Request, res: Response) => {
  try {
    const result = await manufacturerServicesModel.updateProfile(
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

// Update manufacturer's password
const updatePassword = async (req: Request, res: Response) => {
  try {
    const result = await manufacturerServicesModel.updatePassword(
      req.params.id as string,
      req.body.password as string
    )
    res.json(result)
  } catch (error) {
    res.status(500)
    res.json(error)
  }
}

// Add a product to a manufacturer's products
const addProduct = async (req: Request, res: Response) => {
  try {
    const product = {
      _id: new ObjectId(req.body.id),
      quantity: parseInt(req.body.quantity) as unknown as number
    }

    const result = await manufacturerServicesModel.addProduct(req.params.id as string, product)
    res.json(result)
  } catch (error) {
    res.status(500)
    res.json(error)
  }
}

// Check if a manufacturer already has a certain product
const checkProduct = async (req: Request, res: Response) => {
  try {
    const result = await manufacturerServicesModel.checkProduct(
      req.params.id as string,
      req.params.productId
    )
    res.json(result)
  } catch (error) {
    res.status(500)
    res.json(error)
  }
}

// Get all manufacturer orders
const getOrders = async (req: Request, res: Response) => {
  try {
    const result = await manufacturerServicesModel.getOrders(req.params.id as string)
    res.json(result)
  } catch (error) {
    res.status(500)
    res.json(error)
  }
}

// Get all delayed orders
const getDelayedOrders = async (req: Request, res: Response) => {
  try {
    const result = await manufacturerServicesModel.getDelayedOrders(req.params.id as string)
    res.json(result)
  } catch (error) {
    res.status(500)
    res.json(error)
  }
}

const manufacturerServices_routes = (app: Application) => {
  app.post('/manufacturers/verify', verify)
  app.patch('/manufacturers/:id/profile', updateProfile)
  app.patch('/manufacturers/:id/password', updatePassword)
  app.patch('/manufacturers/:id/addProduct', addProduct)
  app.get('/manufacturers/:id/checkProduct/:productId', checkProduct)
  app.get('/manufacturers/:id/orders', getOrders)
  app.get('/manufacturers/:id/delayedOrders', getDelayedOrders)
}

export default manufacturerServices_routes
