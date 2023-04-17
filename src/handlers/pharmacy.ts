import { Application, Request, Response } from 'express'
import Pharmacy from '../types/pharmacy.type'
import PharmacyModel from '../models/pharmacy.model'

// Instantiate UserModel class
const pharmacyModel = new PharmacyModel()

// Get all pharmacies
const index = async (req: Request, res: Response) => {
  try {
    const pharmacies = await pharmacyModel.index()
    res.json(pharmacies)
  } catch (error) {
    res.status(500)
    res.json(error)
  }
}

// Get a pharmacy by id
const show = async (req: Request, res: Response) => {
  try {
    const pharmacy = await pharmacyModel.show(req.params.id as string)
    res.json(pharmacy)
  } catch (error) {
    res.status(500)
    res.json(error)
  }
}

// Create a pharmacy
const create = async (req: Request, res: Response) => {
  const pharmacyObj: Pharmacy = {
    name: req.body.name,
    password: req.body.password,
    email: req.body.email,
    cart: [],
    favorites: []
  }

  try {
    const pharmacy = await pharmacyModel.create(pharmacyObj)
    res.json(pharmacy)
  } catch (error) {
    res.status(500)
    res.json(error)
  }
}

// Update a pharmacy
const update = async (req: Request, res: Response) => {
  const pharmacyObj: Pharmacy = {
    name: req.body.name,
    password: req.body.password,
    email: req.body.email
  }

  try {
    const pharmacy = await pharmacyModel.update(req.params.id as string, pharmacyObj)
    res.json(pharmacy)
  } catch (error) {
    res.status(500)
    res.json(error)
  }
}

// Delete a pharmacy
const deletedPharmacy = async (req: Request, res: Response) => {
  try {
    const pharmacy = await pharmacyModel.delete(req.params.id as string)
    res.json(pharmacy)
  } catch (error) {
    res.status(500)
    res.json(error)
  }
}

// Get pharmacy by email
const showByEmail = async (req: Request, res: Response) => {
  try {
    const pharmacy = await pharmacyModel.showByEmail(req.body.email)
    if (!pharmacy) res.send(false)
    res.json(pharmacy)
  } catch (error) {
    res.status(500)
    res.json(error)
  }
}

const pharmacyRoutes = (app: Application) => {
  app.get('/pharmacies', index)
  app.get('/pharmacies/:id', show)
  app.post('/pharmacies', create)
  app.patch('/pharmacies/:id', update)
  app.delete('/pharmacies/:id', deletedPharmacy)
  app.post('/pharmacies/email', showByEmail)
}

export default pharmacyRoutes
