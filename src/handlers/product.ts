import { Application, Request, Response } from 'express'
import ProductModel from '../models/product.model'
import Product from '../types/product.type'

const productModel = new ProductModel()

const index = async (req: Request, res: Response) => {
  try {
    const product = await productModel.index()
    res.json(product)
  } catch (error) {
    res.status(500)
    res.json(error)
  }
}

const show = async (req: Request, res: Response) => {
  try {
    const product = await productModel.show(req.params.id as string)
    res.json(product)
  } catch (error) {
    res.status(500)
    res.json(error)
  }
}

const create = async (req: Request, res: Response) => {
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
    category: req.body.category,
    usage: req.body.usage,
    warning: req.body.warning
  }

  try {
    const product = await productModel.create(productObj)
    res.json(product)
  } catch (error) {
    res.status(500)
    res.json(error)
  }
}

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
    category: req.body.category,
    usage: req.body.usage,
    warning: req.body.warning
  }

  try {
    const product = await productModel.update(productObj, req.params.id as string)
    res.json(product)
  } catch (error) {
    res.status(500)
    res.json(error)
  }
}

// Deleting a product
const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await productModel.delete(req.params.id as string)
    res.json(product)
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
}

export default product_routes
