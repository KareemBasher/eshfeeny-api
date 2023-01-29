import { connectToDb, getDb } from '../database/db'
import Product from '../types/product.type'
import { Db, ObjectId } from 'mongodb'

let db: Db

connectToDb((error) => {
  if (!error) {
    db = getDb()
  } else {
    console.log(`Failed to connect to database from the product model, ${error}`)
  }
})

class ProductModel {
  async index(): Promise<Product[]> {
    try {
      const result = (await db.collection('products').find().toArray()) as unknown as Product[]
      return result
    } catch (error) {
      throw new Error(`Unable to show product, ${error}`)
    }
  }

  async show(id: string): Promise<Product> {
    try {
      const result = (await db
        .collection('products')
        .findOne({ _id: new ObjectId(id) })) as unknown as Product
      return result
    } catch (error) {
      throw new Error(`Unable to show product, ${error}`)
    }
  }

  async create(product: Product): Promise<Product> {
    try {
      const result = (await db.collection('products').insertOne(product)) as unknown as Product
      return result
    } catch (error) {
      throw new Error(`Unable to show product, ${error}`)
    }
  }
}

export default ProductModel
