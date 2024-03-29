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

// Get all favorite products for a pharmacy using their IDs
const getFavoriteProductsPharmacy = async (req: Request, res: Response) => {
  try {
    const products = await productServicesModel.getFavoriteProductsPharmacy(
      req.params.pharmacyId as string
    )
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

// Get all products from a user's cart (ids and quantity)
const checkCart = async (req: Request, res: Response) => {
  try {
    const user = await productServicesModel.checkCart(
      req.params.userId as string,
      req.params.productId as string
    )
    res.json(user)
  } catch (error) {
    res.status(500)
    res.json(error)
  }
}

// Get cart items from pharmacy (ids and quantity)
const checkCartPharmacy = async (req: Request, res: Response) => {
  try {
    const user = await productServicesModel.checkCartPharmacy(
      req.params.pharmacyId as string,
      req.params.productId as string
    )
    res.json(user)
  } catch (error) {
    res.status(500)
    res.json(error)
  }
}

// Showing all products from a certain brand
const getBrand = async (req: Request, res: Response) => {
  try {
    const product = await productServicesModel.getBrand(req.params.brand as string)
    res.json(product)
  } catch (error) {
    res.status(500)
    res.json(error)
  }
}

// Get all the brands from certain brands
const getBrands = async (req: Request, res: Response) => {
  try {
    const brands = await productServicesModel.getBrands(req.body.brands as string[])
    res.json(brands)
  } catch (error) {
    res.json(error)
    res.status(500)
  }
}

// Get all the brands and their counts for a certain category
const getBrandCounts = async (req: Request, res: Response) => {
  try {
    const brands = await productServicesModel.getBrandCounts(
      req.params.category_type as string,
      req.params.value as string
    )
    res.json(brands)
  } catch (error) {
    res.status(500)
    res.json(error)
  }
}

// Get pharmacy products
const getPharmacyProducts = async (req: Request, res: Response) => {
  try {
    const products = await productServicesModel.getPharmacyProducts(req.params.pharmacyId as string)
    res.json(products)
  } catch (error) {
    res.status(500)
    res.json(error)
  }
}

// Get pharmacy products by type
const getPharmacyProductsByType = async (req: Request, res: Response) => {
  try {
    console.log(req.params.pharmacyId, req.params.type)
    const products = await productServicesModel.getPharmacyProductsType(
      req.params.pharmacyId as string,
      req.params.type as string
    )
    res.json(products)
  } catch (error) {
    res.status(500)
    res.json(error)
  }
}

// Get pharmacy products by category
const getPharmacyProductsByCategory = async (req: Request, res: Response) => {
  try {
    const products = await productServicesModel.getPharmacyProductsCategory(
      req.params.pharmacyId as string,
      req.body.categories as string[]
    )
    res.json(products)
  } catch (error) {
    res.status(500)
    res.json(error)
  }
}

// Get manufacturer products
const getManufacturerProducts = async (req: Request, res: Response) => {
  try {
    const products = await productServicesModel.getManufacturerProducts(
      req.params.manufacturerId as string
    )
    res.json(products)
  } catch (error) {
    res.status(500)
    res.json(error)
  }
}

// Get manufacturer products by type
const getManufacturerProductsByType = async (req: Request, res: Response) => {
  try {
    const products = await productServicesModel.getManufacturerProductsType(
      req.params.manufacturerId as string,
      req.params.type as string
    )
    res.json(products)
  } catch (error) {
    res.status(500)
    res.json(error)
  }
}

// Get manufacturer products by category
const getManufacturerProductsByCategory = async (req: Request, res: Response) => {
  try {
    const products = await productServicesModel.getManufacturerProductsCategory(
      req.params.manufacturerId as string,
      req.body.categories as string[]
    )
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
  app.get('/products/pharmacy/:pharmacyId/favorites', getFavoriteProductsPharmacy)
  app.get('/products/alternatives/:activeIngredient', getAlternative)
  app.get('/products/type/:type', getType)
  app.get('/products/user/:userId/cart/:productId', checkCart)
  app.get('/products/pharmacy/:pharmacyId/cart/:productId', checkCartPharmacy)
  app.get('/products/brand/:brand', getBrand)
  app.post('/products/brand/collective/brands', getBrands)
  app.get('/products/brandCounts/:category_type/:value', getBrandCounts)
  app.get('/products/pharmacy/:pharmacyId', getPharmacyProducts)
  app.get('/products/pharmacy/:pharmacyId/type/:type', getPharmacyProductsByType)
  app.patch('/products/pharmacy/:pharmacyId/category', getPharmacyProductsByCategory)
  app.get('/products/manufacturer/:manufacturerId', getManufacturerProducts)
  app.get('/products/manufacturer/:manufacturerId/type/:type', getManufacturerProductsByType)
  app.patch('/products/manufacturer/:manufacturerId/category', getManufacturerProductsByCategory)
}

export default productServices_routes
