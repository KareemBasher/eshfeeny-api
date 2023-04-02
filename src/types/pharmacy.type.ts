import { ObjectId } from 'mongodb'

interface Orders {
  productId: ObjectId
  manufacturerId: string
  quantity: number
}

type Pharmacy = {
  _id?: ObjectId
  name: string
  email: string
  password: string
  phoneNumber?: string
  orders?: Orders[]
  products?: ObjectId[]
}

export default Pharmacy
