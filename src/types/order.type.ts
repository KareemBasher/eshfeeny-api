import { ObjectId } from 'mongodb'

interface OrderProduct {
  id: ObjectId
  quantity: number
}

type OrderHistory = {
  _id: ObjectId
  products: OrderProduct[]
  total: number
}

export default OrderHistory
