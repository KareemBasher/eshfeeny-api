import { ObjectId } from 'mongodb'

interface Orders {
  productId: ObjectId
  manufacturerId: string
  quantity: number
}

interface Product {
  _id: string
}

interface GeoLocation {
  lat: number
  lng: number
}

interface cart {
  product: Product
  quantity: number
}

type Pharmacy = {
  _id?: ObjectId
  name: string
  email: string
  password: string
  phoneNumber?: string
  orders?: Orders[]
  products?: Product[]
  geoLocation?: GeoLocation
  address?: string
  cart?: cart[] | null
  favorites?: ObjectId[] | null
}

export default Pharmacy
