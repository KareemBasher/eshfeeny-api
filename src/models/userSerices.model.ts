import { connectToDb, getDb } from '../database/db'
import User from '../types/user.type'
import OrderHistory from '../types/order.type'
import { Db, ObjectId } from 'mongodb'
import bcrypt from 'bcrypt'
import config from '../config'

// Function that gets passed a plain text passowrd and returns a hashed password using bcrypt
const comparePassword = (password: string, hashed: string) => {
  return bcrypt.compareSync(password + config.secret, hashed)
}

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

class UserServices {
  // Verifying the user email and password by comparing them to the ones in the database
  async verifyLogin(password: string, userEmail: string): Promise<boolean | User> {
    try {
      const result = (await db
        .collection('users')
        .findOne({ email: userEmail.toLowerCase() })) as unknown as User

      if (!result) return false
      return comparePassword(password, result.password)
    } catch (error) {
      throw new Error(`Could not retrieve user email ${error}`)
    }
  }

  // Adding an address to an existing user using their ID
  async addAddress(id: string, userAddress: string): Promise<User> {
    try {
      const result = (await db.collection('users').updateOne(
        { _id: new ObjectId(id) },
        {
          $set: {
            address: userAddress
          }
        }
      )) as unknown as User

      return result
    } catch (error) {
      throw new Error(`Could not add address for user with id ${id} ${error}`)
    }
  }

  // Adding a phone number to an existing user using their ID
  async addPhoneNumber(id: string, userPhoneNumber: string): Promise<User> {
    try {
      const result = (await db.collection('users').updateOne(
        { _id: new ObjectId(id) },
        {
          $set: {
            phoneNumber: userPhoneNumber
          }
        }
      )) as unknown as User

      return result
    } catch (error) {
      throw new Error(`Could not add phone number for user with id ${id} ${error}`)
    }
  }

  // Adding an age to an existing user using their ID
  async addAge(id: string, userAge: string): Promise<User> {
    try {
      const result = (await db.collection('users').updateOne(
        { _id: new ObjectId(id) },
        {
          $set: {
            age: userAge
          }
        }
      )) as unknown as User

      return result
    } catch (error) {
      throw new Error(`Could not add age for user with id ${id} ${error}`)
    }
  }

  // Adding an gender to an existing user using their ID
  async addGender(id: string, userGender: string): Promise<User> {
    try {
      const result = (await db.collection('users').updateOne(
        { _id: new ObjectId(id) },
        {
          $set: {
            gender: userGender.toLowerCase()
          }
        }
      )) as unknown as User

      return result
    } catch (error) {
      throw new Error(`Could not add gender for user with id ${id} ${error}`)
    }
  }

  // Getting all previous orders from a user
  async getOrderHistory(id: string): Promise<OrderHistory[]> {
    try {
      const result = (await db
        .collection('users')
        .find({ _id: new ObjectId(id) })
        .project({ orderHistory: 1 })
        .toArray()) as unknown as OrderHistory[]

      return result
    } catch (error) {
      throw new Error(`Could not get order history for user with id ${id} ${error}`)
    }
  }

  // Updating order history for a user using their ID
  async updateOrderHistory(id: string, userOrder: OrderHistory): Promise<User> {
    try {
      userOrder.products.forEach((product) => (product._id = new ObjectId(product._id)))
      const result = (await db.collection('users').updateOne(
        { _id: new ObjectId(id) },
        {
          $push: {
            orderHistory: userOrder
          }
        }
      )) as unknown as User

      return result
    } catch (error) {
      throw new Error(`Could not update order history for user with id ${id} ${error}`)
    }
  }

  // Removing order history item for a user using their ID
  async removeOrderHistory(id: string, orderHistoryId: string): Promise<User> {
    try {
      const result = (await db.collection('users').updateOne(
        { _id: new ObjectId(id) },
        {
          $pull: {
            orderHistory: {
              _id: new ObjectId(orderHistoryId)
            }
          }
        }
      )) as unknown as User

      return result
    } catch (error) {
      throw new Error(`Could not remove order from history for user with id ${id} ${error}`)
    }
  }

  // Getting all favorite products from a user
  async getFavorites(id: string): Promise<User[]> {
    try {
      const result = (await db
        .collection('users')
        .find({ _id: new ObjectId(id) })
        .project({ favorites: 1 })
        .toArray()) as unknown as User[]

      return result
    } catch (error) {
      throw new Error(`Could not get favorite products for user with id ${id} ${error}`)
    }
  }

  // Updating favorite products for a user using their ID
  async updateFavorites(id: string, productId: string): Promise<User> {
    try {
      const result = (await db.collection('users').updateOne(
        { _id: new ObjectId(id) },
        {
          $push: {
            favorites: new ObjectId(productId)
          }
        }
      )) as unknown as User

      return result
    } catch (error) {
      throw new Error(`Could not update favorite products for user with id ${id} ${error}`)
    }
  }

  // Removing favorite product for a user using their ID
  async removeFavorites(id: string, productId: string): Promise<User> {
    try {
      const result = (await db.collection('users').updateOne(
        { _id: new ObjectId(id) },
        {
          $pull: {
            favorites: new ObjectId(productId)
          }
        }
      )) as unknown as User

      return result
    } catch (error) {
      throw new Error(`Could not remove favorite product for user with id ${id} ${error}`)
    }
  }

  // Getting all search history items for a user using their ID
  async getSearchHistory(id: string): Promise<User> {
    try {
      const result = (await db
        .collection('users')
        .find({ _id: new ObjectId(id) })
        .project({ searchHistory: 1 })
        .toArray()) as unknown as User

      return result
    } catch (error) {
      throw new Error(`Could not search history for user with id ${id} ${error}`)
    }
  }

  // Updating search history for a user
  async updateSearchHistory(id: string, query: string): Promise<User> {
    try {
      const result = (await db.collection('users').updateOne(
        { _id: new ObjectId(id) },
        {
          $push: {
            searchHistory: query
          }
        }
      )) as unknown as User

      return result
    } catch (error) {
      throw new Error(`Could not update search history for user with id ${id} ${error}`)
    }
  }

  // Removing search history item for a user using their ID
  async removeSearchHistory(id: string, query: string): Promise<User> {
    try {
      const result = (await db.collection('users').updateOne(
        { _id: new ObjectId(id) },
        {
          $pull: {
            searchHistory: query
          }
        }
      )) as unknown as User

      return result
    } catch (error) {
      throw new Error(`Could not remove search history item for user with id ${id} ${error}`)
    }
  }
}

export default UserServices
