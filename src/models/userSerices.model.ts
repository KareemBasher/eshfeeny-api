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

  // Updating order history for a user using their ID
  async updateOrderHistory(id: string, userOrder: OrderHistory): Promise<User> {
    try {
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
      throw new Error(`Could not add gender for user with id ${id} ${error}`)
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
      throw new Error(`Could not add gender for user with id ${id} ${error}`)
    }
  }
}

export default UserServices
