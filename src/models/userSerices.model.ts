import { connectToDb, getDb } from '../database/db'
import User from '../types/user.type'
import OrderHistory from '../types/order.type'
import { Db, ObjectId } from 'mongodb'
import bcrypt from 'bcrypt'
import config from '../config'
import Product from '../types/product.type'

// Interface for user alarms
interface Alarm {
  _id?: ObjectId
  name: string
  notes?: string | null
  dose: number | null
  alarmTime: string[] | number[] | null
  repetition: string
  startDate?: string | null
  endDate?: string | null
  days?: string | null
}

interface InsuranceCard {
  name: string
  number: string
  nameOnCard: string
  imageURL: string
}

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

class UserServices {
  // Verifying the user email and password by comparing them to the ones in the database
  async verifyLogin(password: string, userEmail: string): Promise<User | boolean> {
    try {
      const result = (await db
        .collection('users')
        .findOne({ email: userEmail.toLowerCase() })) as unknown as User

      if (!result) return false
      if (comparePassword(password, result.password)) return result
      return false
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

  // Getting all alarms for a user using their ID
  async getAlarms(id: string): Promise<User> {
    try {
      const result = await db.collection('users').findOne({ _id: new ObjectId(id) })

      return result?.alarms
    } catch (error) {
      throw new Error(`Could not get alarms for user with id ${id} ${error}`)
    }
  }

  // Adding an alarm for a user
  async addAlarm(id: string, alarm: Alarm): Promise<User> {
    try {
      const result = (await db.collection('users').updateOne(
        { _id: new ObjectId(id) },
        {
          $push: {
            alarms: alarm
          }
        }
      )) as unknown as User

      return result
    } catch (error) {
      throw new Error(`Could not add alarm for user with id ${id} ${error}`)
    }
  }

  // Edit an alarm for a user
  async editAlarm(id: string, alarmId: string, alarm: Alarm): Promise<User> {
    try {
      const result = (await db.collection('users').updateOne(
        { _id: new ObjectId(id), 'alarms._id': new ObjectId(alarmId) },
        {
          $set: {
            'alarms.$': alarm
          }
        }
      )) as unknown as User

      return result
    } catch (error) {
      throw new Error(`Could not edit alarm with id ${alarmId} for user with id ${id} ${error}`)
    }
  }

  // Removing an alarm for a user using their ID
  async removeAlarm(id: string, alarmId: string): Promise<User> {
    try {
      const result = (await db.collection('users').updateOne(
        { _id: new ObjectId(id) },
        {
          $pull: {
            alarms: {
              _id: new ObjectId(alarmId)
            }
          }
        }
      )) as unknown as User

      return result
    } catch (error) {
      throw new Error(`Could not remove order from history for user with id ${id} ${error}`)
    }
  }

  // Getting all cart items from a user
  async getCartItems(id: string): Promise<User[]> {
    try {
      const result = (
        await db
          .collection('users')
          .find({ _id: new ObjectId(id) })
          .project({ cart: 1, _id: 0 })
          .toArray()
      )[0] as unknown as User[]

      return result
    } catch (error) {
      throw new Error(`Could not get cart items for user with id ${id} ${error}`)
    }
  }

  // Updating cart items for a user using their ID
  async updateCartItems(id: string, productId: string): Promise<User> {
    // Getting the item from the products collection
    let product: Product

    try {
      product = (await db
        .collection('products')
        .findOne({ _id: new ObjectId(productId) })) as unknown as Product
    } catch (error) {
      throw new Error(`Could not get product with id ${productId} ${error}`)
    }
    const cartIem = {
      product: product,
      quantity: 1
    }

    try {
      const result = (await db.collection('users').updateOne(
        { _id: new ObjectId(id) },
        {
          $push: {
            cart: cartIem
          }
        }
      )) as unknown as User

      return result
    } catch (error) {
      throw new Error(`Could not update cart items for user with id ${id} ${error}`)
    }
  }

  // Increment cart items quantity for a user using their ID
  async incrementCartItem(id: string, productId: string): Promise<User> {
    try {
      const result = (await db.collection('users').updateOne(
        { _id: new ObjectId(id), 'cart.product._id': new ObjectId(productId) },
        {
          $inc: {
            'cart.$.quantity': 1
          }
        }
      )) as unknown as User

      return result
    } catch (error) {
      throw new Error(`Could not increment cart items for user with id ${id} ${error}`)
    }
  }

  // Decrement cart items quantity for a user using their ID
  async decrementCartItem(id: string, productId: string): Promise<User> {
    try {
      const result = (await db.collection('users').updateOne(
        { _id: new ObjectId(id), 'cart.product._id': new ObjectId(productId) },
        {
          $inc: {
            'cart.$.quantity': -1
          }
        }
      )) as unknown as User

      return result
    } catch (error) {
      throw new Error(`Could not decrement cart items for user with id ${id} ${error}`)
    }
  }

  // Removing cart items for a user using their ID
  async removeCartItem(id: string, productId: string): Promise<User> {
    try {
      const result = (await db.collection('users').updateOne(
        { _id: new ObjectId(id) },
        {
          $pull: {
            cart: {
              'product._id': new ObjectId(productId)
            }
          }
        }
      )) as unknown as User

      return result
    } catch (error) {
      throw new Error(`Could not remove favorite product for user with id ${id} ${error}`)
    }
  }

  // Update user's name, email, and/or phone number
  async updateProfile(
    id: string,
    name: string,
    email: string,
    phone: string,
    gender: string
  ): Promise<User> {
    try {
      const result = (await db.collection('users').updateOne(
        { _id: new ObjectId(id) },
        {
          $set: {
            name: name,
            email: email,
            phoneNumber: phone,
            gender: gender
          }
        }
      )) as unknown as User

      return result
    } catch (error) {
      throw new Error(`Could not update profile for user with id ${id} ${error}`)
    }
  }

  // Compare and update user's password
  async compareAndUpdate(
    id: string,
    newPassword: string,
    oldPassword: string
  ): Promise<User | string> {
    try {
      const user = (await db
        .collection('users')
        .findOne({ _id: new ObjectId(id) })) as unknown as User

      const oldPasswordDb = user.password

      const isMatch = comparePassword(oldPassword, oldPasswordDb)

      if (!isMatch) {
        return 'Password mismatch'
      } else {
        const result = (await db.collection('users').updateOne(
          { _id: new ObjectId(id) },
          {
            $set: {
              password: hashPassowrd(newPassword)
            }
          }
        )) as unknown as User
        return result
      }
    } catch (error) {
      throw new Error(`Could not update password for user with id ${id} ${error}`)
    }
  }

  // Update user's password
  async updatePassword(id: string, password: string): Promise<User> {
    try {
      const result = (await db.collection('users').updateOne(
        { _id: new ObjectId(id) },
        {
          $set: {
            password: hashPassowrd(password)
          }
        }
      )) as unknown as User

      return result
    } catch (error) {
      throw new Error(`Could not update password for user with id ${id} ${error}`)
    }
  }

  // Add insurance card for a user
  async addInsuranceCard(id: string, insuranceCard: InsuranceCard): Promise<User> {
    try {
      const result = (await db.collection('users').updateOne(
        { _id: new ObjectId(id) },
        {
          $push: {
            insuranceCards: insuranceCard
          }
        }
      )) as unknown as User

      return result
    } catch (error) {
      throw new Error(`Could not add insurance card for user with id ${id} ${error}`)
    }
  }

  // Get insurance cards for a user
  async getInsuranceCards(id: string): Promise<InsuranceCard[]> {
    try {
      const result = (
        await db
          .collection('users')
          .find({ _id: new ObjectId(id) })
          .project({ insuranceCards: 1, _id: 0 })
          .toArray()
      )[0] as unknown as User

      if (result.insuranceCards) {
        return result.insuranceCards
      } else {
        return []
      }
    } catch (error) {
      throw new Error(`Could not get insurance cards for user with id ${id} ${error}`)
    }
  }
}

export default UserServices
