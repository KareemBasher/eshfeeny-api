import { Application, Request, Response } from 'express'
import UserServicesModel from '../models/userSerices.model'
import { ObjectId } from 'mongodb'

// Interface for user alarms
interface Alarm {
  _id?: ObjectId
  name: string
  notes?: string | null
  dose: number | null
  alarmTime: string[] | number[] | null
  repetition: string
  startDate?: string | null
  endDate?: string | null
  days?: string | null
}

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

// Updating favorite product for a user using their ID
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

// Removing favorite product for a user using their ID
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

// Getting all search history items for a user using their ID
const getSearchHistory = async (req: Request, res: Response) => {
  try {
    const result = await userServicesModel.getSearchHistory(req.params.id as string)
    res.json(result)
  } catch (error) {
    res.status(500)
    res.json(error)
  }
}

// Updating search history for a user
const updateSearchHistory = async (req: Request, res: Response) => {
  try {
    const result = await userServicesModel.updateSearchHistory(
      req.params.id as string,
      req.body.query as string
    )
    res.json(result)
  } catch (error) {
    res.status(500)
    res.json(error)
  }
}

// Removing search history item for a user using their ID
const removeSearchHistory = async (req: Request, res: Response) => {
  try {
    const result = await userServicesModel.removeSearchHistory(
      req.params.id as string,
      req.params.query as string
    )
    res.json(result)
  } catch (error) {
    res.status(500)
    res.json(error)
  }
}

// Getting all alarms for a user using their ID
const getAlarms = async (req: Request, res: Response) => {
  try {
    const result = await userServicesModel.getAlarms(req.params.id as string)
    res.json(result)
  } catch (error) {
    res.status(500)
    res.json(error)
  }
}

// Adding an alarm for a user
const addAlarm = async (req: Request, res: Response) => {
  const alarmObject: Alarm = {
    _id: new ObjectId(),
    name: req.body.name,
    notes: req.body.notes,
    dose: req.body.dose,
    repetition: req.body.repetition.toLowerCase(),
    alarmTime: req.body.alarmTime,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    days: req.body.days
  }

  try {
    const result = await userServicesModel.addAlarm(req.params.id as string, alarmObject)
    res.json(result)
  } catch (error) {
    res.status(500)
    res.json(error)
  }
}

// Edit an alarm for a user
const editAlarm = async (req: Request, res: Response) => {
  const alarmObject: Alarm = {
    _id: new ObjectId(req.params.alarmId as string),
    name: req.body.name,
    notes: req.body.notes,
    dose: req.body.dose,
    repetition: req.body.repetition.toLowerCase(),
    alarmTime: req.body.alarmTime,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    days: req.body.days
  }

  try {
    const result = await userServicesModel.editAlarm(
      req.params.id as string,
      req.params.alarmId as string,
      alarmObject
    )
    res.json(result)
  } catch (error) {
    res.status(500)
    res.json(error)
  }
}

// Getting all cart items from a user
const getCartItems = async (req: Request, res: Response) => {
  try {
    const result = await userServicesModel.getCartItems(req.params.id as string)
    res.json(result)
  } catch (error) {
    res.status(500)
    res.json(error)
  }
}

// Updating cart items for a user using their ID
const addCartItem = async (req: Request, res: Response) => {
  try {
    const result = await userServicesModel.updateCartItems(
      req.params.id as string,
      req.body.productId
    )
    res.json(result)
  } catch (error) {
    res.status(500)
    res.json(error)
  }
}

// Removing favorite product for a user using their ID
const removeCartItem = async (req: Request, res: Response) => {
  try {
    const result = await userServicesModel.removeCartItem(
      req.params.id as string,
      req.params.productId as string
    )
    res.json(result)
  } catch (error) {
    res.status(500)
    res.json(error)
  }
}

// Removing order history for a user using their ID
const removeAlarm = async (req: Request, res: Response) => {
  try {
    const result = await userServicesModel.removeAlarm(
      req.params.id as string,
      req.params.alarmId as string
    )
    res.json(result)
  } catch (error) {
    res.status(500)
    res.json(error)
  }
}

// Incrementing the quantity of a product in the cart for a user
const incrementCartItem = async (req: Request, res: Response) => {
  try {
    const result = await userServicesModel.incrementCartItem(
      req.params.id as string,
      req.params.productId as string
    )
    res.json(result)
  } catch (error) {
    res.status(500)
    res.json(error)
  }
}

// Decrementing the quantity of a product in the cart for a user
const decrementCartItem = async (req: Request, res: Response) => {
  try {
    const result = await userServicesModel.decrementCartItem(
      req.params.id as string,
      req.params.productId as string
    )
    res.json(result)
  } catch (error) {
    res.status(500)
    res.json(error)
  }
}

// Update user's name, email, and/or phone number
const updateProfile = async (req: Request, res: Response) => {
  try {
    const result = await userServicesModel.updateProfile(
      req.params.id as string,
      req.body.name,
      req.body.email,
      req.body.phoneNumber,
      req.body.gender
    )

    res.json(result)
  } catch (error) {
    res.status(500)
    res.json(error)
  }
}

// Compare and update user's password
const compareAndUpdate = async (req: Request, res: Response) => {
  try {
    const result = await userServicesModel.compareAndUpdate(
      req.params.id as string,
      req.body.newPassword,
      req.body.oldPassword
    )
    res.json(result)
  } catch (error) {
    res.status(500)
    res.json(error)
  }
}

// Update user's password
const updatePassword = async (req: Request, res: Response) => {
  try {
    const result = await userServicesModel.updatePassword(
      req.params.id as string,
      req.body.password
    )
    res.json(result)
  } catch (error) {
    res.status(500)
    res.json(error)
  }
}

// Add an insurance card for a user
const addInsuranceCard = async (req: Request, res: Response) => {
  try {
    const result = await userServicesModel.addInsuranceCard(
      req.params.id as string,
      req.body.insuranceCard
    )
    res.json(result)
  } catch (error) {
    res.status(500)
    res.json(error)
  }
}

// Get all insurance cards for a user
const getInsuranceCards = async (req: Request, res: Response) => {
  try {
    const result = await userServicesModel.getInsuranceCards(req.params.id as string)
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
  app.get('/users/:id/searchHistory', getSearchHistory)
  app.patch('/users/:id/searchHistory', updateSearchHistory)
  app.delete('/users/:id/searchHistory/:query', removeSearchHistory)
  app.get('/users/:id/alarms', getAlarms)
  app.patch('/users/:id/alarms', addAlarm)
  app.patch('/users/:id/alarms/:alarmId', editAlarm)
  app.delete('/users/:id/alarms/:alarmId', removeAlarm)
  app.get('/users/:id/cart', getCartItems)
  app.patch('/users/:id/cart', addCartItem)
  app.delete('/users/:id/cart/:productId', removeCartItem)
  app.patch('/users/:id/cart/:productId/1', incrementCartItem)
  app.patch('/users/:id/cart/:productId/-1', decrementCartItem)
  app.patch('/users/:id/profile', updateProfile)
  app.patch('/users/:id/password', updatePassword)
  app.patch('/users/:id/insuranceCards', addInsuranceCard)
  app.get('/users/:id/insuranceCards', getInsuranceCards)
  app.patch('/users/:id/compareAndUpdate', compareAndUpdate)
}

export default userServices_routes
