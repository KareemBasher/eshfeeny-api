import { ObjectId } from 'mongodb'

type Product = {
  id?: ObjectId
  nameAr: string
  nameEn: string | null
  description: string
  price: number
  volume: string | null
  amount: string | null
  useCases: string[]
  activeIngredient: string[] | null
  sideEffects: string[]
  category: string[]
  usage: string[]
  warning: string[]
}

export default Product
