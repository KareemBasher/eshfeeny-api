import { connectToDb, getDb } from '../database/db'
import Pharmacy from '../types/pharmacy.type'
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
    console.log(`Failed to connect to database from the product model, ${error}`)
  }
})

class PharmacyModel {
  // Get all pharmacies
  async index(): Promise<Pharmacy[]> {
    try {
      const pharmacies = (await db
        .collection('pharmacies')
        .find()
        .toArray()) as unknown as Pharmacy[]
      return pharmacies
    } catch (error) {
      console.log(`Failed to get pharmacies, ${error}`)
      return []
    }
  }

  // Get a pharmacy by id
  async show(id: string): Promise<Pharmacy> {
    try {
      const pharmacy = (
        await db
          .collection('pharmacies')
          .find({ _id: new ObjectId(id) })
          .project({ password: 0 })
          .toArray()
      )[0] as unknown as Pharmacy
      return pharmacy
    } catch (error) {
      console.log(`Failed to get pharmacy, ${error}`)
      return {} as Pharmacy
    }
  }

  // Create a pharmacy
  async create(pharmacy: Pharmacy): Promise<Pharmacy | string> {
    const passwordHashedObj = {
      name: pharmacy.name.toLowerCase(),
      password: hashPassowrd(pharmacy.password),
      email: pharmacy.email.toLowerCase(),
      cart: [],
      favorites: []
    }

    try {
      const oldUser = await db.collection('users').findOne({ email: pharmacy.email.toLowerCase() })

      if (oldUser) {
        return 'User already exists'
      }

      const newPharmacy = (await db
        .collection('pharmacies')
        .insertOne(passwordHashedObj)) as unknown as Pharmacy
      return newPharmacy
    } catch (error) {
      console.log(`Failed to create pharmacy, ${error}`)
      return {} as Pharmacy
    }
  }

  // Update a pharmacy
  async update(id: string, pharmacy: Pharmacy): Promise<Pharmacy> {
    try {
      const updatedPharmacy = (await db.collection('pharmacies').updateOne(
        { _id: new ObjectId(id) },
        {
          $set: {
            name: pharmacy.name,
            email: pharmacy.email.toLowerCase(),
            password: hashPassowrd(pharmacy.password)
          }
        }
      )) as unknown as Pharmacy
      return updatedPharmacy
    } catch (error) {
      console.log(`Failed to update pharmacy, ${error}`)
      return {} as Pharmacy
    }
  }

  // Delete a pharmacy
  async delete(id: string): Promise<Pharmacy> {
    try {
      const deletedPharmacy = (await db
        .collection('pharmacies')
        .deleteOne({ _id: new ObjectId(id) })) as unknown as Pharmacy
      return deletedPharmacy
    } catch (error) {
      console.log(`Failed to delete pharmacy, ${error}`)
      return {} as Pharmacy
    }
  }

  // Get a pharmacy by email
  async showByEmail(email: string): Promise<Pharmacy> {
    try {
      const pharmacy = (
        await db.collection('pharmacies').find({ email: email }).project({ password: 0 }).toArray()
      )[0] as unknown as Pharmacy
      return pharmacy
    } catch (error) {
      console.log(`Failed to get pharmacy by email, ${error}`)
      return {} as Pharmacy
    }
  }
}

export default PharmacyModel
