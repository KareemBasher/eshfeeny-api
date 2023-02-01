import { connectToDb, getDb } from '../database/db'
import Product from '../types/product.type'
import { Db } from 'mongodb'

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

// Product servicecs class
class ProductServicesModel {
  // Show all products from a certain category
  async getCategory(category: string): Promise<Product> {
    try {
      const result = (await db
        .collection('products')
        .find({ category: category })
        .toArray()) as unknown as Product
      return result
    } catch (error) {
      throw new Error(`Unable to find products from category ${category}, ${error}`)
    }
  }
}

export default ProductServicesModel
