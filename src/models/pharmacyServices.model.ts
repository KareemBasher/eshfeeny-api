import { connectToDb, getDb } from '../database/db'
import Pharmacy from '../types/pharmacy.type'
import { Db, ObjectId } from 'mongodb'
import bcrypt from 'bcrypt'
import config from '../config'
import Product from '../types/product.type'

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

  // Update pharmacy's name, email, and/or phone number
  async updateProfile(
    id: string,
    name: string,
    email: string,
    phone: string,
    address: string
  ): Promise<Pharmacy> {
    try {
      const result = (await db.collection('pharmacies').updateOne(
        { _id: new ObjectId(id) },
        {
          $set: {
            name: name,
            email: email,
            phoneNumber: phone,
            address: address
          }
        }
      )) as unknown as Pharmacy

      return result
    } catch (error) {
      throw new Error(`Could not update profile for pharmacy with id ${id} ${error}`)
    }
  }

  // Update pharmacy's password
  async updatePassword(id: string, password: string): Promise<Pharmacy> {
    try {
      const result = (await db.collection('pharmacies').updateOne(
        { _id: new ObjectId(id) },
        {
          $set: {
            password: hashPassowrd(password)
          }
        }
      )) as unknown as Pharmacy

      return result
    } catch (error) {
      throw new Error(`Could not update password for pharmacy with id ${id} ${error}`)
    }
  }

  // Get pharmacies that have a list of products
  async getPharmacies(products: string[]): Promise<Pharmacy[]> {
    try {
      const result = (await db
        .collection('pharmacies')
        .find({ 'products._id': { $all: products } })
        .project({ password: 0, products: 0 })
        .toArray()) as unknown as Pharmacy[]

      return result
    } catch (error) {
      throw new Error(`Could not retrieve pharmacies ${error}`)
    }
  }

  // Getting all favorite products from a pharmacy
  async getFavorites(id: string): Promise<Pharmacy[]> {
    try {
      const result = (await db
        .collection('pharmacies')
        .find({ _id: new ObjectId(id) })
        .project({ favorites: 1 })
        .toArray()) as unknown as Pharmacy[]

      return result
    } catch (error) {
      throw new Error(`Could not get favorite products for pharmacy with id ${id} ${error}`)
    }
  }

  // Updating favorite products for a pharmacy using their ID
  async updateFavorites(id: string, productId: string): Promise<Pharmacy> {
    try {
      const result = (await db.collection('pharmacies').updateOne(
        { _id: new ObjectId(id) },
        {
          $push: {
            favorites: new ObjectId(productId)
          }
        }
      )) as unknown as Pharmacy

      return result
    } catch (error) {
      throw new Error(`Could not update favorite products for pharmacy with id ${id} ${error}`)
    }
  }

  // Removing favorite product for a pharmacy using their ID
  async removeFavorites(id: string, productId: string): Promise<Pharmacy> {
    try {
      const result = (await db.collection('pharmacies').updateOne(
        { _id: new ObjectId(id) },
        {
          $pull: {
            favorites: new ObjectId(productId)
          }
        }
      )) as unknown as Pharmacy

      return result
    } catch (error) {
      throw new Error(`Could not remove favorite product for pharmacy with id ${id} ${error}`)
    }
  }

  // Getting all cart items from a pharmacy
  async getCartItems(id: string): Promise<Pharmacy[]> {
    try {
      const result = (
        await db
          .collection('pharmacies')
          .aggregate([
            {
              $match: {
                _id: new ObjectId(id)
              }
            },
            {
              $unwind: '$cart'
            },
            {
              $group: {
                _id: {
                  product: '$cart.product',
                  quantity: '$cart.quantity'
                },
                total: {
                  $sum: {
                    $multiply: ['$cart.quantity', '$cart.product.price']
                  }
                }
              }
            },
            {
              $group: {
                _id: null,
                cart: {
                  $push: {
                    product: '$_id.product',
                    quantity: '$_id.quantity'
                  }
                },
                total: {
                  $sum: '$total'
                }
              }
            },
            {
              $project: {
                _id: 0
              }
            }
          ])
          .toArray()
      )[0] as unknown as Pharmacy[]

      return result
    } catch (error) {
      throw new Error(`Could not get cart items for pharmacy with id ${id} ${error}`)
    }
  }

  // Updating cart items for a pharmacy using their ID
  async updateCartItems(id: string, productId: string): Promise<Pharmacy> {
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
      const result = (await db.collection('pharmacies').updateOne(
        { _id: new ObjectId(id) },
        {
          $push: {
            cart: cartIem
          }
        }
      )) as unknown as Pharmacy

      return result
    } catch (error) {
      throw new Error(`Could not update cart items for pharmacy with id ${id} ${error}`)
    }
  }

  // Increment cart items quantity for a pharmacy using their ID
  async incrementCartItem(id: string, productId: string): Promise<Pharmacy> {
    try {
      const result = (await db.collection('pharmacies').updateOne(
        { _id: new ObjectId(id), 'cart.product._id': new ObjectId(productId) },
        {
          $inc: {
            'cart.$.quantity': 1
          }
        }
      )) as unknown as Pharmacy

      return result
    } catch (error) {
      throw new Error(`Could not increment cart items for pharmacy with id ${id} ${error}`)
    }
  }

  // Decrement cart items quantity for a pharmacy using their ID
  async decrementCartItem(id: string, productId: string): Promise<Pharmacy> {
    try {
      const result = (await db.collection('pharmacies').updateOne(
        { _id: new ObjectId(id), 'cart.product._id': new ObjectId(productId) },
        {
          $inc: {
            'cart.$.quantity': -1
          }
        }
      )) as unknown as Pharmacy

      return result
    } catch (error) {
      throw new Error(`Could not decrement cart items for pharmacy with id ${id} ${error}`)
    }
  }

  // Removing cart items for a pharmacy using their ID
  async removeCartItem(id: string, productId: string): Promise<Pharmacy> {
    try {
      const result = (await db.collection('pharmacies').updateOne(
        { _id: new ObjectId(id) },
        {
          $pull: {
            cart: {
              'product._id': new ObjectId(productId)
            }
          }
        }
      )) as unknown as Pharmacy

      return result
    } catch (error) {
      throw new Error(`Could not remove favorite product for pharmacy with id ${id} ${error}`)
    }
  }

  // Add a product to a pharmacy
  async addProduct(id: string, product: { _id: ObjectId; quantity: number }): Promise<Pharmacy> {
    try {
      const result = (await db.collection('pharmacies').updateOne(
        { _id: new ObjectId(id) },
        {
          $push: {
            products: product
          }
        }
      )) as unknown as Pharmacy

      return result
    } catch (error) {
      throw new Error(`Could not add product to pharmacy with id ${id} ${error}`)
    }
  }

  // Get cart total price
  async getCartTotal(id: string): Promise<Pharmacy> {
    try {
      const result = (
        await db
          .collection('pharmacies')
          .aggregate([
            { $match: { _id: new ObjectId(id) } },
            { $unwind: '$cart' },
            {
              $group: {
                _id: '0',
                total: { $sum: { $multiply: ['$cart.quantity', '$cart.product.price'] } }
              }
            },
            {
              $project: {
                _id: 0,
                total: 1
              }
            }
          ])
          .toArray()
      )[0] as unknown as Pharmacy

      return result
    } catch (error) {
      throw new Error(`Could not get cart total for pharmacy with id ${id} ${error}`)
    }
  }
}

export default PharmacyServices
