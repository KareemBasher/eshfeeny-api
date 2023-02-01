import { Application, Request, Response } from 'express'
import ProductServicesModel from '../models/productServices.model'

// Instantiate ProductModel class
const productServicesModel = new ProductServicesModel()

// Showing all products from a certain category
const getCategory = async (req: Request, res: Response) => {
  try {
    const product = await productServicesModel.getCategory(req.params.category as string)
    res.json(product)
  } catch (error) {
    res.status(500)
    res.json(error)
  }
}

// Searching for products
const search = async (req: Request, res: Response) => {
  try {
    const product = await productServicesModel.search(req.params.query as string)
    res.json(product)
  } catch (error) {
    res.status(500)
    res.json(error)
  }
}

// Product services routes
const productServices_routes = (app: Application) => {
  app.get('/products/category/:category', getCategory)
  app.get('/products/search/:query', search)
}

export default productServices_routes
