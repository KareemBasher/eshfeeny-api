import { connectToDb, getDb } from '../database/db'
import User from '../types/user.type'
import { Db, ObjectId } from 'mongodb'
import bcrypt from 'bcrypt'
import config from '../config'

// Function that gets passed a plain text passowrd and returns a hashed password using bcrypt
const hashPassowrd = (password: string) => {
  const salt = parseInt(config.salt as string)
  return bcrypt.hashSync(password + config.secret, salt)
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

// User class
class UserModel {
  // Showing all users
  async index(): Promise<User[]> {
    try {
      const result = (await db.collection('users').find().toArray()) as unknown as User[]
      return result
    } catch (error) {
      throw new Error(`Unable to show users, ${error}`)
    }
  }

  // Showing a single user using their ID
  async show(id: string): Promise<User> {
    try {
      const result = (
        await db
          .collection('users')
          .find({ _id: new ObjectId(id) })
          .project({
            password: 0
          })
          .toArray()
      )[0] as unknown as User
      return result
    } catch (error) {
      throw new Error(`Unable to show user with id ${id}, ${error}`)
    }
  }

  // Adding a user
  async create(user: User): Promise<User | string> {
    const passwordHashedUserObj = {
      name: user.name.toLowerCase(),
      password: hashPassowrd(user.password),
      email: user.email.toLowerCase(),
      cart: [],
      favorites: []
    }

    interface CreateRespone {
      acknowledged: boolean
      insertedId: ObjectId
    }

    try {
      const oldUser = await db.collection('users').findOne({ email: user.email.toLowerCase() })

      if (oldUser) {
        return 'User already exists'
      }

      const result = (await db
        .collection('users')
        .insertOne(passwordHashedUserObj)) as unknown as CreateRespone

      const newUser = (
        await db
          .collection('users')
          .find({ _id: new ObjectId(result.insertedId) })
          .project({ password: 0 })
          .toArray()
      )[0] as unknown as User

      return newUser
    } catch (error) {
      throw new Error(`Unable to create user, ${error}`)
    }
  }

  // Updating a single user using their ID
  async update(user: User, id: string): Promise<User> {
    try {
      const result = (await db.collection('users').updateOne(
        { _id: new ObjectId(id) },
        {
          $set: {
            name: user.name.toLowerCase(),
            email: user.email.toLowerCase(),
            password: hashPassowrd(user.password)
          }
        }
      )) as unknown as User

      return result
    } catch (error) {
      throw new Error(`Unable to update user with id ${id}, ${error}`)
    }
  }

  // Deleting a user using their ID
  async delete(id: string): Promise<User> {
    try {
      const result = (await db
        .collection('users')
        .deleteOne({ _id: new ObjectId(id) })) as unknown as User

      return result
    } catch (error) {
      throw new Error(`Unable to delete user with id ${id}, ${error}`)
    }
  }

  // Check if user exists using their email
  async checkUserEmail(email: string): Promise<User> {
    try {
      const result = (
        await db.collection('users').find({ email: email }).project({ password: 0 }).toArray()
      )[0] as unknown as User

      return result
    } catch (error) {
      throw new Error(`Could not check user email ${email} ${error}`)
    }
  }
}

export default UserModel
