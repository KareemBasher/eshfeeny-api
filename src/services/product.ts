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

// Showing all products that have a certain active ingredient
const getAlternative = async (req: Request, res: Response) => {
  try {
    const product = await productServicesModel.getAlternative(req.params.activeIngredient as string)
    res.json(product)
  } catch (error) {
    res.status(500)
    res.json(error)
  }
}

// Showing all products from a certain type
const getType = async (req: Request, res: Response) => {
  try {
    const products = await productServicesModel.getType(req.params.type as string)
    res.json(products)
  } catch (error) {
    res.status(500)
    res.json(error)
  }
}

// Get all cart products for a user using their IDs
const getCartProducts = async (req: Request, res: Response) => {
  try {
    const products = await productServicesModel.getCartProducts(req.params.userId as string)
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
  app.get('/products/alternatives/:activeIngredient', getAlternative)
  app.get('/products/type/:type', getType)
  app.get('/products/user/:userId/cart', getCartProducts)
}

export default productServices_routes
