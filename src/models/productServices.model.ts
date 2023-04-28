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

// Interface for the result of getBrandCounts
interface getBrandCountsResult {
  _id: string
  count: number
}

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
                      path: 'category'
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
  async getOrderHistoryProducts(userId: string, orderHistoryId: string): Promise<Product[]> {
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
    } catch (error) {
      throw new Error(
        `Unable to find products from order history array for user ${userId}, ${error}`
      )
    }

    try {
      const result = (await db
        .collection('products')
        .find({ _id: { $in: productIds } })
        .toArray()) as unknown as Product[]

      return result
    } catch (error) {
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
      if (user.favorites) {
        const result = (await db
          .collection('products')
          .find({ _id: { $in: user?.favorites } })
          .toArray()) as unknown as Product[]
        return result
      } else {
        return []
      }
    } catch (error) {
      throw new Error(`Unable to find products from favorites for user ${userId}, ${error}`)
    }
  }

  // Show all products that have a certain active ingredient
  async getAlternative(id: string): Promise<Product[]> {
    try {
      const product = (await db
        .collection('products')
        .findOne({ _id: new ObjectId(id) })) as unknown as Product

      const result = (await db
        .collection('products')
        .find({ activeIngredient: product.activeIngredient, _id: { $ne: new ObjectId(id) } })
        .toArray()) as unknown as Product[]

      return result
    } catch (error) {
      throw new Error(`Unable to find alternative to ${id}, ${error}`)
    }
  }

  // Show all products from a certain type
  async getType(type: string): Promise<Product[]> {
    try {
      const result = (await db
        .collection('products')
        .find({ type: type })
        .toArray()) as unknown as Product[]
      return result
    } catch (error) {
      throw new Error(`Unable to find products from type ${type}, ${error}`)
    }
  }

  // Get cart items from user (ids and quantity)
  async checkCart(userId: string, productId: string): Promise<boolean | number> {
    try {
      const result = (await db.collection('users').findOne({
        _id: new ObjectId(userId)
      })) as unknown as User

      let quantity = 0

      if (result.cart) {
        result.cart?.forEach((item) => {
          const id = item.product._id ?? new ObjectId()
          if (id.equals(new ObjectId(productId))) {
            quantity = item.quantity
          }
        })
      }

      return quantity
    } catch (error) {
      console.log(error)
      throw new Error(`Unable to find products from cart for user ${userId}, ${error}`)
    }
  }

  // Show all products from a certain brand
  async getBrand(brand: string): Promise<Product[]> {
    try {
      const result = (await db
        .collection('products')
        .find({ brand: brand })
        .toArray()) as unknown as Product[]
      return result
    } catch (error) {
      throw new Error(`Unable to find products from brand ${brand}, ${error}`)
    }
  }

  // Get all the brands and their counts for a certain category
  async getBrandCounts(category_type: string, value: string): Promise<getBrandCountsResult[]> {
    try {
      const result = (await db
        .collection('products')
        .aggregate([
          {
            $match: {
              [category_type]: value,
              brand: { $not: { $size: 0 }, $nin: ['الادوية', 'الأدوية'] }
            }
          },
          { $unwind: '$brand' },
          {
            $group: {
              _id: '$brand',
              count: { $sum: 1 }
            }
          },
          {
            $match: {
              count: { $gte: 1 }
            }
          },
          { $sort: { count: -1 } },
          { $limit: 100 }
        ])
        .toArray()) as unknown as getBrandCountsResult[]

      return result
    } catch (error) {
      throw new Error(`Unable to find brands from ${category_type}, ${error}`)
    }
  }
}

export default ProductServicesModel
