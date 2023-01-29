import { MongoClient, Db } from 'mongodb'
import config from '../config'

let dbConnection: Db

export const connectToDb = async (cb: (error?: null | unknown) => void) => {
  try {
    const client = await MongoClient.connect(config.dbString as string)
    dbConnection = client.db()
    return cb()
  } catch (error) {
    console.log(`Could not connect to DB, ${error}`)
    return cb(error)
  }
}

export const getDb = () => dbConnection
