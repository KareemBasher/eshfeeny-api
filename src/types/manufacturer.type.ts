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
  orders?: Order[]
  delayedOrders?: Order[]
  phoneNumber?: string
}

export default Manufacturer
