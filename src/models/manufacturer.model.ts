import { connectToDb, getDb } from '../database/db'
import Manufacturer from '../types/manufacturer.type'
import { Db, ObjectId } from 'mongodb'
import bcrypt from 'bcrypt'
import config from '../config'

// Database connection variable
let db: Db

// Function that gets passed a plain text passowrd and returns a hashed password using bcrypt
const hashPassowrd = (password: string) => {
  const salt = parseInt(config.salt as string)
  return bcrypt.hashSync(password + config.secret, salt)
}

// connecting to database
connectToDb((error) => {
  if (!error) {
    db = getDb()
  } else {
    console.log(`Failed to connect to database from the manufacturer model, ${error}`)
  }
})

class ManufacturerModel {
  // Get all manufacturers
  async index(): Promise<Manufacturer[]> {
    try {
      const manufacturers = (await db
        .collection('manufacturers')
        .find()
        .toArray()) as unknown as Manufacturer[]
      return manufacturers
    } catch (error) {
      console.log(`Failed to get manufacturers, ${error}`)
      return []
    }
  }

  // Get a manufacturer by id
  async show(id: string): Promise<Manufacturer> {
    try {
      const manufacturer = (
        await db
          .collection('manufacturers')
          .find({ _id: new ObjectId(id) })
          .project({ password: 0 })
          .toArray()
      )[0] as unknown as Manufacturer
      return manufacturer
    } catch (error) {
      console.log(`Failed to get manufacturer, ${error}`)
      return {} as Manufacturer
    }
  }

  // Create a manufacturer
  async create(manufacturer: Manufacturer): Promise<Manufacturer | string> {
    const passwordHashedObj = {
      name: manufacturer.name.toLowerCase(),
      password: hashPassowrd(manufacturer.password),
      email: manufacturer.email.toLowerCase(),
      orders: [],
      delayedOrders: [],
      products: []
    }

    interface CreateRespone {
      acknowledged: boolean
      insertedId: ObjectId
    }

    try {
      const oldUser = await db
        .collection('manufacturers')
        .findOne({ email: manufacturer.email.toLowerCase() })

      if (oldUser) {
        return 'manufacturer already exists'
      }

      const result = (await db
        .collection('manufacturers')
        .insertOne(passwordHashedObj)) as unknown as CreateRespone

      const newManufacturer = (
        await db
          .collection('manufacturers')
          .find({ _id: new ObjectId(result.insertedId) })
          .project({ password: 0 })
          .toArray()
      )[0] as unknown as Manufacturer

      return newManufacturer
    } catch (error) {
      console.log(`Failed to create manufacturer, ${error}`)
      return {} as Manufacturer
    }
  }

  // Update a manufacturer
  async update(id: string, manufacturer: Manufacturer): Promise<Manufacturer> {
    try {
      const updatedManufacturer = (await db.collection('manufacturers').updateOne(
        { _id: new ObjectId(id) },
        {
          $set: {
            name: manufacturer.name,
            email: manufacturer.email.toLowerCase(),
            password: hashPassowrd(manufacturer.password)
          }
        }
      )) as unknown as Manufacturer
      return updatedManufacturer
    } catch (error) {
      console.log(`Failed to update manufacturer, ${error}`)
      return {} as Manufacturer
    }
  }

  // Delete a manufacturer
  async delete(id: string): Promise<Manufacturer> {
    try {
      const deletedManufacturer = (await db
        .collection('manufacturers')
        .deleteOne({ _id: new ObjectId(id) })) as unknown as Manufacturer
      return deletedManufacturer
    } catch (error) {
      console.log(`Failed to delete manufacturer, ${error}`)
      return {} as Manufacturer
    }
  }

  // Get a manufacturer by email
  async showByEmail(email: string): Promise<Manufacturer> {
    try {
      const manufacturer = (
        await db
          .collection('manufacturers')
          .find({ email: email })
          .project({ password: 0 })
          .toArray()
      )[0] as unknown as Manufacturer
      return manufacturer
    } catch (error) {
      console.log(`Failed to get manufacturer by email, ${error}`)
      return {} as Manufacturer
    }
  }
}

export default ManufacturerModel
