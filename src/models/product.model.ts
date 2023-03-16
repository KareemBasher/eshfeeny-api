import { connectToDb, getDb } from '../database/db'
import Product from '../types/product.type'
import { Db, ObjectId } from 'mongodb'

// Database connection variable
let db: Db

// connecting to database
connectToDb((error) => {
  if (!error) {
    db = getDb()
  } else {
    console.log(`Failed to connect to database from the product model, ${error}`)
  }
})

// Product class
class ProductModel {
  // Showing all products
  async index(): Promise<Product[]> {
    try {
      const result = (await db.collection('products').find().toArray()) as unknown as Product[]
      return result
    } catch (error) {
      throw new Error(`Unable to show products, ${error}`)
    }
  }

  // Showing a single product using its ID
  async show(id: string): Promise<Product> {
    try {
      const result = (await db
        .collection('products')
        .findOne({ _id: new ObjectId(id) })) as unknown as Product
      return result
    } catch (error) {
      throw new Error(`Unable to show product with id ${id}, ${error}`)
    }
  }

  // Adding a product
  async create(product: Product): Promise<Product> {
    try {
      const result = (await db.collection('products').insertOne(product)) as unknown as Product
      return result
    } catch (error) {
      throw new Error(`Unable to create product, ${error}`)
    }
  }

  // Updating a single product using its ID
  async update(product: Product, id: string): Promise<Product> {
    try {
      const result = (await db.collection('products').updateOne(
        { _id: new ObjectId(id) },
        {
          $set: {
            nameAr: product.nameAr,
            nameEn: product.nameEn,
            description: product.description,
            price: product.price,
            volume: product.volume,
            amount: product.amount,
            useCases: product.useCases,
            activeIngredient: product.activeIngredient,
            sideEffects: product.sideEffects,
            type: product.type,
            category: product.category,
            usage: product.usage,
            warning: product.warning,
            brand: product.brand
          }
        }
      )) as unknown as Product

      return result
    } catch (error) {
      throw new Error(`Unable to update product with id ${id}, ${error}`)
    }
  }

  // Deleting a product Using its ID
  async delete(id: string): Promise<Product> {
    try {
      const result = (await db
        .collection('products')
        .deleteOne({ _id: new ObjectId(id) })) as unknown as Product

      return result
    } catch (error) {
      throw new Error(`Unable to delete product with id ${id}, ${error}`)
    }
  }

  async getMany(ids: string[]): Promise<Product[]> {
    try {
      const result = (await db
        .collection('products')
        .find({ _id: { $in: ids.map((id) => new ObjectId(id)) } })
        .toArray()) as unknown as Product[]

      return result
    } catch (error) {
      throw new Error(`Unable to get products with ids ${ids}, ${error}`)
    }
  }
}

export default ProductModel
