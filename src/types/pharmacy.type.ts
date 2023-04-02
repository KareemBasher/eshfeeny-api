import { ObjectId } from 'mongodb'

interface Orders {
  productId: ObjectId
  manufacturerId: string
  quantity: number
}

interface Product {
  _id: string
}

type Pharmacy = {
  _id?: ObjectId
  name: string
  email: string
  password: string
  phoneNumber?: string
  orders?: Orders[]
  products?: Product[]
}

export default Pharmacy
