import { connectToDb, getDb } from '../database/db'
import User from '../types/user.type'
import { Db } from 'mongodb'
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
}

export default UserServices
