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

// get all products from an order history for a user
const getOrderHistoryProducts = async (req: Request, res: Response) => {
  try {
    const products = await productServicesModel.getOrderHistoryProducts(
      req.params.userId as string,
      req.params.orderHistoryId
    )
    res.json(products)
  } catch (error) {
    res.status(500)
    res.json(error)
  }
}

// Get all favorite products for a user using their IDs
const getFavoriteProducts = async (req: Request, res: Response) => {
  try {
    const products = await productServicesModel.getFavoriteProducts(req.params.userId as string)
    res.json(products)
  } catch (error) {
    res.status(500)
    res.json(error)
  }
}

// Product services routes
const productServices_routes = (app: Application) => {
  app.get('/products/category/:category', getCategory)
  app.get('/products/search/:query', search)
  app.get('/products/user/:userId/orderHistory/:orderHistoryId', getOrderHistoryProducts)
  app.get('/products/user/:userId/favorites', getFavoriteProducts)
}

export default productServices_routes
