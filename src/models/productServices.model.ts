import { connectToDb, getDb } from '../database/db'
import Product from '../types/product.type'
import { Db, ObjectId } from 'mongodb'
import User from '../types/user.type'
import OrderHistory from '../types/order.type'

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
  async getCategory(category: string): Promise<Product[]> {
    try {
      const result = (await db
        .collection('products')
        .find({ category: category })
        .toArray()) as unknown as Product[]
      return result
    } catch (error) {
      throw new Error(`Unable to find products from category ${category}, ${error}`)
    }
  }

  // Search for products using the name in Arabic or English, description, and the use cases
  async search(query: string): Promise<Product[]> {
    try {
      const result = (await db
        .collection('products')
        .aggregate([
          {
            $search: {
              compound: {
                should: [
                  {
                    autocomplete: {
                      query: query,
                      path: 'nameEn'
                    }
                  },
                  {
                    autocomplete: {
                      query: query,
                      path: 'description'
                    }
                  },
                  {
                    autocomplete: {
                      query: query,
                      path: 'nameAr'
                    }
                  },
                  {
                    autocomplete: {
                      query: query,
                      path: 'useCases'
                    }
                  }
                ]
              }
            }
          }
        ])
        .toArray()) as unknown as Product[]
      return result
    } catch (error) {
      throw new Error(`Unable to find products containing ${query}, ${error}`)
    }
  }

  // Get all products in users order history
  async getOrderHistoryProducts(userId: string, orderHistoryId: string): Promise<ObjectId[]> {
    // Getting all product IDs from user collection
    const productIds: ObjectId[] = []

    try {
      const result = (await db
        .collection('users')
        .findOne({ _id: new ObjectId(userId) })) as unknown as User

      const order = result.orderHistory?.filter((order) =>
        order._id.equals(new ObjectId(orderHistoryId))
      )[0] as unknown as OrderHistory

      order.products.forEach((product) => productIds.push(product._id))

      return productIds
    } catch (error) {
      console.log(error)
      throw new Error(
        `Unable to find products from order history array for user ${userId}, ${error}`
      )
    }
  }

  // Get all favorite products for a user using their IDs
  async getFavoriteProducts(userId: string): Promise<Product[]> {
    // Getting all favorite products IDs
    let user: User
    try {
      user = (await db
        .collection('users')
        .findOne({ _id: new ObjectId(userId) })) as unknown as User
    } catch (error) {
      throw new Error(`Unable to find product ids from favorites for user ${userId}, ${error}`)
    }

    try {
      console.log(user?.favorites)
      const result = (
        await db.collection('products').find({ _id: { $in: user?.favorites } })
      ).toArray() as unknown as Product[]
      return result
    } catch (error) {
      throw new Error(`Unable to find products from favorites for user ${userId}, ${error}`)
    }
  }
}

export default ProductServicesModel
