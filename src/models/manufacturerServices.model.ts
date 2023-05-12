import { connectToDb, getDb } from '../database/db'
import Manufacturer from '../types/manufacturer.type'
import { Db, ObjectId } from 'mongodb'
import bcrypt from 'bcrypt'
import config from '../config'

// Database connection variable
let db: Db

// connecting to database
connectToDb((error) => {
  if (!error) {
    db = getDb()
  } else {
    console.log(`Failed to connect to database from the manufacturer model, ${error}`)
  }
})

// Function that gets passed a plain text passowrd and returns a hashed password using bcrypt
const hashPassowrd = (password: string) => {
  const salt = parseInt(config.salt as string)
  return bcrypt.hashSync(password + config.secret, salt)
}

// Function that gets passed a plain text passowrd and returns a hashed password using bcrypt
const comparePassword = (password: string, hashed: string) => {
  return bcrypt.compareSync(password + config.secret, hashed)
}

class ManufaturerServicesModel {
  // Verifying the manufacturer email and password by comparing them to the ones in the database
  async verifyLogin(password: string, email: string): Promise<Manufacturer | boolean> {
    try {
      const result = (await db
        .collection('manufacturers')
        .findOne({ email: email.toLowerCase() })) as unknown as Manufacturer

      if (!result) return false
      if (comparePassword(password, result.password)) return result
      return false
    } catch (error) {
      throw new Error(`Could not retrieve manufacturer email ${error}`)
    }
  }

  // Update manufacturer's name, email, and/or phone number
  async updateProfile(
    id: string,
    name: string,
    email: string,
    phone: string,
    address: string
  ): Promise<Manufacturer> {
    try {
      const result = (await db.collection('manufacturers').updateOne(
        { _id: new ObjectId(id) },
        {
          $set: {
            name: name,
            email: email,
            phoneNumber: phone,
            address: address
          }
        }
      )) as unknown as Manufacturer

      return result
    } catch (error) {
      throw new Error(`Could not update profile for manufacturer with id ${id} ${error}`)
    }
  }

  // Update manufacturer's password
  async updatePassword(id: string, password: string): Promise<Manufacturer> {
    try {
      const result = (await db.collection('manufacturers').updateOne(
        { _id: new ObjectId(id) },
        {
          $set: {
            password: hashPassowrd(password)
          }
        }
      )) as unknown as Manufacturer

      return result
    } catch (error) {
      throw new Error(`Could not update password for manufacturer with id ${id} ${error}`)
    }
  }

  // Add a product to a manufacturer
  async addProduct(
    id: string,
    product: { _id: ObjectId; quantity: number }
  ): Promise<Manufacturer> {
    try {
      const result = (await db.collection('manufacturers').updateOne(
        { _id: new ObjectId(id) },
        {
          $push: {
            products: product
          }
        }
      )) as unknown as Manufacturer

      return result
    } catch (error) {
      throw new Error(`Could not add product to manufacturer with id ${id} ${error}`)
    }
  }

  // Check if a manufacturer already has a certain product
  async checkProduct(id: string, productId: string): Promise<boolean> {
    try {
      const result = (await db.collection('manufacturers').findOne({
        _id: new ObjectId(id),
        'products._id': new ObjectId(productId)
      })) as unknown as Manufacturer

      if (result) return true
      else return false
    } catch (error) {
      throw new Error(`Could not check product for manufacturer with id ${id} ${error}`)
    }
  }

  // Get all orders
  async getOrders(id: string): Promise<Manufacturer> {
    try {
      const result = (
        await db
          .collection('manufacturers')
          .find({ _id: new ObjectId(id) })
          .project({ orders: 1, _id: 0 })
          .toArray()
      )[0] as unknown as Manufacturer

      return result
    } catch (error) {
      throw new Error(`Could not get orders for manufacturer with id ${id} ${error}`)
    }
  }

  // get all delayed orders
  async getDelayedOrders(id: string): Promise<Manufacturer> {
    try {
      const result = (
        await db
          .collection('manufacturers')
          .find({ _id: new ObjectId(id) })
          .project({ delayedOrders: 1, _id: 0 })
          .toArray()
      )[0] as unknown as Manufacturer

      return result
    } catch (error) {
      throw new Error(`Could not get orders for manufacturer with id ${id} ${error}`)
    }
  }
}

export default ManufaturerServicesModel
