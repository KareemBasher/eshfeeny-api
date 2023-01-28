import { Request, Response, NextFunction } from 'express'
import config from '../config'
import jwt from 'jsonwebtoken'

// Middleware for verifying tokens
const validateTokenMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.get('Authorization') as string
    const token = authHeader.split(' ')[1]
    jwt.verify(token, config.signiture as string)

    next()
  } catch (error) {
    res.status(401)
    throw new Error(`Failed to validate token, ${error}`)
  }
}

export default validateTokenMiddleware
