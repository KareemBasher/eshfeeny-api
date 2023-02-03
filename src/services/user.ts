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

// userServices routes
const userServices_routes = (app: Application) => {
  app.post('/users/verify', verify)
  app.patch('/users/:id/address', addAddress)
  app.patch('/users/:id/phone', addPhoneNumber)
  app.patch('/users/:id/age', addAge)
  app.patch('/users/:id/gender', addGender)
}

export default userServices_routes
