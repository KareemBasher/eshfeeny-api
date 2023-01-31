import express, { Application } from 'express'
import morgan from 'morgan'
import config from './config'
import product_routes from './handlers/product'
import bp from 'body-parser'
import user_routes from './handlers/user'
import userServices_routes from './services/user'

const PORT = config.port
// create an instance server
const app: Application = express()
// HTTP request logger middleware
app.use(morgan('short'))
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

app.listen(PORT, () => {
  console.log(`Server is starting at port:${PORT}`)
})

product_routes(app)
user_routes(app)
userServices_routes(app)

export default app
