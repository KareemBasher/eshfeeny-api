import express, { Application } from 'express'
import morgan from 'morgan'
import config from './config'
import product_routes from './handlers/product'
import bp from 'body-parser'
import cors from 'cors'
import user_routes from './handlers/user'
import userServices_routes from './services/user'
import productServices_routes from './services/product'
import dashboard_routes from './services/dashboard'
import insuranceCompanies_routes from './handlers/insuranceCompany'
import pharmacyRoutes from './handlers/pharmacy'
import pharmacyServices_routes from './services/pharmacy'

const PORT = config.port
// create an instance server
const app: Application = express()
// HTTP request logger middleware
app.use(morgan('short'))
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
app.use(cors({ origin: '*' }))

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`)
})

app.get('/', (req, res) => {
  res.send('Hello, World!')
})

product_routes(app)
productServices_routes(app)
user_routes(app)
userServices_routes(app)
dashboard_routes(app)
insuranceCompanies_routes(app)
pharmacyRoutes(app)
pharmacyServices_routes(app)

export default app
