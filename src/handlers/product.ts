import { Application, Request, Response } from 'express'
import ProductModel from '../models/product.model'
import Product from '../types/product.type'

// Instantiate ProductModel class
const productModel = new ProductModel()

// Showing all products
const index = async (req: Request, res: Response) => {
  try {
    const product = await productModel.index()
    res.json(product)
  } catch (error) {
    res.status(500)
    res.json(error)
  }
}

// Show a product using its ID
const show = async (req: Request, res: Response) => {
  try {
    const product = await productModel.show(req.params.id as string)
    res.json(product)
  } catch (error) {
    res.status(500)
    res.json(error)
  }
}

// Add a product
const create = async (req: Request, res: Response) => {
  try {
    const product = await productModel.create(req.body.product as Product)
    res.json(product)
  } catch (error) {
    res.status(500)
    res.json(error)
  }
}

// Updating a product using its ID
const update = async (req: Request, res: Response) => {
  const productObj: Product = {
    nameAr: req.body.nameAr,
    nameEn: req.body.nameEn,
    description: req.body.description,
    price: req.body.price,
    volume: req.body.volume,
    amount: req.body.amount,
    useCases: req.body.useCases,
    activeIngredient: req.body.activeIngredient,
    sideEffects: req.body.sideEffects,
    type: req.body.type,
    category: req.body.category,
    usage: req.body.usage,
    warning: req.body.warning,
    brand: req.body.brand,
    images: req.body.images,
    manufacturer: req.body.manufacturer
  }

  try {
    const product = await productModel.update(productObj, req.params.id as string)
    res.json(product)
  } catch (error) {
    res.status(500)
    res.json(error)
  }
}

// Delete a product using its ID
const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await productModel.delete(req.params.id as string)
    res.json(product)
  } catch (error) {
    res.status(500)
    res.json(error)
  }
}

const getMany = async (req: Request, res: Response) => {
  try {
    const ids = req.params.ids.split('&') as string[]
    const products = await productModel.getMany(ids)
    res.json(products)
  } catch (error) {
    res.status(500)
    res.json(error)
  }
}

// Product routes
const product_routes = (app: Application) => {
  app.get('/products', index)
  app.get('/products/:id', show)
  app.post('/products', create)
  app.patch('/products/:id', update)
  app.delete('/products/:id', deleteProduct)
  app.get('/products/getMany/:ids', getMany)
}

export default product_routes
