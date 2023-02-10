import { Application, Request, Response } from 'express'
import UserModel from '../models/users.model'
import User from '../types/user.type'

// Instantiate UserModel class
const userModel = new UserModel()

// Showing all users
const index = async (req: Request, res: Response) => {
  try {
    const user = await userModel.index()
    res.json(user)
  } catch (error) {
    res.status(500)
    res.json(error)
  }
}

// Show a user using its ID
const show = async (req: Request, res: Response) => {
  try {
    const user = await userModel.show(req.params.id as string)
    res.json(user)
  } catch (error) {
    res.status(500)
    res.json(error)
  }
}

// Add a user
const create = async (req: Request, res: Response) => {
  const userObj: User = {
    name: req.body.name,
    password: req.body.password,
    email: req.body.email,
    type: req.body.type
  }

  try {
    const user = await userModel.create(userObj)
    res.json(user)
  } catch (error) {
    res.status(500)
    res.json(error)
  }
}

// Updating a user using its ID
const update = async (req: Request, res: Response) => {
  const userObj: User = {
    name: req.body.name,
    password: req.body.password,
    email: req.body.email,
    type: req.body.type
  }

  try {
    const user = await userModel.update(userObj, req.params.id as string)
    res.json(user)
  } catch (error) {
    res.status(500)
    res.json(error)
  }
}

// Delete a user using its ID
const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await userModel.delete(req.params.id as string)
    res.json(user)
  } catch (error) {
    res.status(500)
    res.json(error)
  }
}

// User routes
const user_routes = (app: Application) => {
  app.get('/users', index)
  app.get('/users/:id', show)
  app.post('/users', create)
  app.patch('/users/:id', update)
  app.delete('/users/:id', deleteUser)
}

export default user_routes
