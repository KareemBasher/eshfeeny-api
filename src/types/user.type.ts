import { ObjectId } from 'mongodb'
import OrderHistory from './order.type'

interface Alarm {
  name: string
  notes: string | null
  dose: number
  time: string[] | null
  repetition: string | null
}

type User = {
  id?: ObjectId
  name: string
  email: string
  password: string
  gender?: string
  address?: string | null
  age?: number | null
  phoneNumber?: string | null
  alarms?: Alarm[] | null
  searchHistory?: string[] | null
  favorites?: ObjectId[] | null
  orderHistory?: OrderHistory[] | null
}

export default User
