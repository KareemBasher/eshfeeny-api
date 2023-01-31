import { ObjectId } from 'mongodb'

type User = {
  id?: ObjectId
  name: string
  email: string
  password: string
  address?: string | null
  age?: number | null
  phoneNumber?: string | null
}

export default User
