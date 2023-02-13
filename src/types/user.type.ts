import { ObjectId } from 'mongodb'
import OrderHistory from './order.type'

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

interface cart {
  _id?: ObjectId
  quantity: number
}

type User = {
  id?: ObjectId
  name: string
  email: string
  password: string
  type: string
  gender?: string
  address?: string | null
  age?: number | null
  phoneNumber?: string | null
  alarms?: Alarm[] | null
  searchHistory?: string[] | null
  favorites?: ObjectId[] | null
  orderHistory?: OrderHistory[] | null
  cart?: cart[] | null
}

export default User
