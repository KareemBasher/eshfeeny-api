import { connectToDb, getDb } from '../database/db'
import InsuranceCompany from '../types/insurancecompany.type'
import { Db, ObjectId } from 'mongodb'

let db: Db

// connecting to database
connectToDb((error) => {
  if (!error) {
    db = getDb()
  } else {
    console.log(`Failed to connect to database from the product model, ${error}`)
  }
})

class InsuranceCompanyModel {
  async getInsuranceCompanies(): Promise<InsuranceCompany[]> {
    try {
      const insuranceCompanies = (await db
        .collection('insuranceCompanies')
        .find()
        .toArray()) as unknown as InsuranceCompany[]
      return insuranceCompanies
    } catch (error) {
      console.log(`Failed to get insurance companies, ${error}`)
      return []
    }
  }

  async getInsuranceCompany(id: string): Promise<InsuranceCompany> {
    try {
      const insuranceCompany = (await db
        .collection('insuranceCompanies')
        .findOne({ _id: new ObjectId(id) })) as unknown as InsuranceCompany
      return insuranceCompany
    } catch (error) {
      console.log(`Failed to get insurance company, ${error}`)
      return {} as InsuranceCompany
    }
  }
}

export default InsuranceCompanyModel
