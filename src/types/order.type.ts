import { ObjectId } from 'mongodb'

interface OrderProduct {
  _id: ObjectId
  quantity: number
}

type OrderHistory = {
  _id: ObjectId
  products: OrderProduct[]
  total: number
}

export default OrderHistory
