import { Application, Request, Response } from 'express'
import insuranceCompaniesModel from '../models/insuranceCompanies.model'

const insuranceCompanies = new insuranceCompaniesModel()

// Get all companies
const getCompanies = async (req: Request, res: Response) => {
  try {
    const result = await insuranceCompanies.getInsuranceCompanies()
    res.json(result)
  } catch (error) {
    res.status(500)
    res.json(error)
  }
}

// Get a single company by ID
const getCompanyByID = async (req: Request, res: Response) => {
  try {
    const result = await insuranceCompanies.getInsuranceCompany(req.params.id as unknown as string)
    res.json(result)
  } catch (error) {
    res.status(500)
    res.json(error)
  }
}

const insuranceCompanies_routes = (app: Application) => {
  app.get('/insuranceCompanies', getCompanies)
  app.get('/insuranceCompanies/:id', getCompanyByID)
}

export default insuranceCompanies_routes
