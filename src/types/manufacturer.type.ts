import { ObjectId } from 'mongodb'

interface Order {
  _id?: ObjectId
  pharmacyId: ObjectId
  product: ObjectId
  quantity: number
  createdOn: string
}

type Manufacturer = {
  _id?: ObjectId
  name: string
  email: string
  password: string
  products: { _id: ObjectId; quantity: number }[]
  orders?: Order[]
  delayedOrders?: Order[]
  phoneNumber?: string
  address?: string
}

export default Manufacturer
