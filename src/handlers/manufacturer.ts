import { Application, Request, Response } from 'express'
import Manufacturer from '../types/manufacturer.type'
import ManufacturerModel from '../models/manufacturer.model'

// Instantiate UserModel class
const manufacturerModel = new ManufacturerModel()

// Get all manufacturers
const index = async (req: Request, res: Response) => {
  try {
    const manufacturers = await manufacturerModel.index()
    res.json(manufacturers)
  } catch (error) {
    res.status(500)
    res.json(error)
  }
}

// Get a manufacturer by id
const show = async (req: Request, res: Response) => {
  try {
    const manufacturer = await manufacturerModel.show(req.params.id as string)
    res.json(manufacturer)
  } catch (error) {
    res.status(500)
    res.json(error)
  }
}

// Create a manufacturer
const create = async (req: Request, res: Response) => {
  const manufacturerObj: Manufacturer = {
    name: req.body.name,
    password: req.body.password,
    email: req.body.email
  }

  try {
    const manufacturer = await manufacturerModel.create(manufacturerObj)
    res.json(manufacturer)
  } catch (error) {
    res.status(500)
    res.json(error)
  }
}

// Update a manufacturer
const update = async (req: Request, res: Response) => {
  const manufacturerObj: Manufacturer = {
    name: req.body.name,
    password: req.body.password,
    email: req.body.email
  }

  try {
    const manufacturer = await manufacturerModel.update(req.params.id as string, manufacturerObj)
    res.json(manufacturer)
  } catch (error) {
    res.status(500)
    res.json(error)
  }
}

// Delete a manufacturer
const deletedManufacturer = async (req: Request, res: Response) => {
  try {
    const manufacturer = await manufacturerModel.delete(req.params.id as string)
    res.json(manufacturer)
  } catch (error) {
    res.status(500)
    res.json(error)
  }
}

// Get manufacturer by email
const showByEmail = async (req: Request, res: Response) => {
  try {
    const manufacturer = await manufacturerModel.showByEmail(req.body.email)
    if (!manufacturer) res.send(false)
    res.json(manufacturer)
  } catch (error) {
    res.status(500)
    res.json(error)
  }
}

const manufacturerRoutes = (app: Application) => {
  app.get('/manufacturers', index)
  app.get('/manufacturers/:id', show)
  app.post('/manufacturers', create)
  app.patch('/manufacturers/:id', update)
  app.delete('/manufacturers/:id', deletedManufacturer)
  app.post('/manufacturers/email', showByEmail)
}

export default manufacturerRoutes
