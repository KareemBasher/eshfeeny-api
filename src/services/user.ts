import { Application, Request, Response } from 'express'
import UserServicesModel from '../models/userSerices.model'
import { ObjectId } from 'mongodb'

// Instantiate UserModel class
const userServicesModel = new UserServicesModel()

// Verifying user for login
const verify = async (req: Request, res: Response) => {
  try {
    const result = await userServicesModel.verifyLogin(req.body.password as string, req.body.email)
    res.json(result)
  } catch (error) {
    res.status(500)
    res.json(error)
  }
}

// Adding an address for a user
const addAddress = async (req: Request, res: Response) => {
  try {
    const result = await userServicesModel.addAddress(req.params.id as string, req.body.address)
    res.json(result)
  } catch (error) {
    res.status(500)
    res.json(error)
  }
}

// Adding a phone number for a user
const addPhoneNumber = async (req: Request, res: Response) => {
  try {
    const result = await userServicesModel.addPhoneNumber(
      req.params.id as string,
      req.body.phoneNumber
    )
    res.json(result)
  } catch (error) {
    res.status(500)
    res.json(error)
  }
}

// Adding an age for a user
const addAge = async (req: Request, res: Response) => {
  try {
    const result = await userServicesModel.addAge(req.params.id as string, req.body.age)
    res.json(result)
  } catch (error) {
    res.status(500)
    res.json(error)
  }
}

// Adding an gebder for a user
const addGender = async (req: Request, res: Response) => {
  try {
    const result = await userServicesModel.addGender(req.params.id as string, req.body.gender)
    res.json(result)
  } catch (error) {
    res.status(500)
    res.json(error)
  }
}

// Getting all previous orders from a user
const getOrderHistory = async (req: Request, res: Response) => {
  try {
    const result = await userServicesModel.getOrderHistory(req.params.id as string)
    res.json(result)
  } catch (error) {
    res.status(500)
    res.json(error)
  }
}

// Updating order history for a user using their ID
const addOrderHistory = async (req: Request, res: Response) => {
  const orderHistory = {
    _id: new ObjectId(),
    products: req.body.products,
    total: req.body.total
  }
  try {
    const result = await userServicesModel.updateOrderHistory(req.params.id as string, orderHistory)
    res.json(result)
  } catch (error) {
    res.status(500)
    res.json(error)
  }
}

// Removing order history for a user using their ID
const removeOrderHistory = async (req: Request, res: Response) => {
  try {
    const result = await userServicesModel.removeOrderHistory(
      req.params.id as string,
      req.params.orderHistoryId as string
    )
    res.json(result)
  } catch (error) {
    res.status(500)
    res.json(error)
  }
}

// Getting all favorites from a user
const getFavorites = async (req: Request, res: Response) => {
  try {
    const result = await userServicesModel.getFavorites(req.params.id as string)
    res.json(result)
  } catch (error) {
    res.status(500)
    res.json(error)
  }
}

// Updating order history for a user using their ID
const addFavoriteProduct = async (req: Request, res: Response) => {
  try {
    const result = await userServicesModel.updateFavorites(
      req.params.id as string,
      req.body.productId
    )
    res.json(result)
  } catch (error) {
    res.status(500)
    res.json(error)
  }
}

// Removing order history for a user using their ID
const removeFavoriteProduct = async (req: Request, res: Response) => {
  try {
    const result = await userServicesModel.removeFavorites(
      req.params.id as string,
      req.params.productId as string
    )
    res.json(result)
  } catch (error) {
    res.status(500)
    res.json(error)
  }
}

// UserServices routes
const userServices_routes = (app: Application) => {
  app.post('/users/verify', verify)
  app.patch('/users/:id/address', addAddress)
  app.patch('/users/:id/phone', addPhoneNumber)
  app.patch('/users/:id/age', addAge)
  app.patch('/users/:id/gender', addGender)
  app.get('/users/:id/orderHistory', getOrderHistory)
  app.patch('/users/:id/orderHistory', addOrderHistory)
  app.delete('/users/:id/orderHistory/:orderHistoryId', removeOrderHistory)
  app.get('/users/:id/favorites', getFavorites)
  app.patch('/users/:id/favorites', addFavoriteProduct)
  app.delete('/users/:id/favorites/:productId', removeFavoriteProduct)
}

export default userServices_routes
