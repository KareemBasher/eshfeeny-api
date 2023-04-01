import { connectToDb, getDb } from '../database/db'
import Pharmacy from '../types/pharmacy.type'
import { Db, ObjectId } from 'mongodb'
import bcrypt from 'bcrypt'
import config from '../config'

// Function that gets passed a plain text passowrd and returns a hashed password using bcrypt
const hashPassowrd = (password: string) => {
  const salt = parseInt(config.salt as string)
  return bcrypt.hashSync(password + config.secret, salt)
}

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

class PharmacyServices {
  // Verifying the user email and password by comparing them to the ones in the database
  async verifyLogin(password: string, email: string): Promise<Pharmacy | boolean> {
    try {
      const result = (await db
        .collection('pharmacies')
        .findOne({ email: email.toLowerCase() })) as unknown as Pharmacy

      if (!result) return false
      if (comparePassword(password, result.password)) return result
      return false
    } catch (error) {
      throw new Error(`Could not retrieve user email ${error}`)
    }
  }
}

export default PharmacyServices