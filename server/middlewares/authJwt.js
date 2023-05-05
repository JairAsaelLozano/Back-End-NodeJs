import jwt from 'jsonwebtoken'
import UserModel from '../models/users-model.js'

export const verifyToken = async (req, res, next) => {
  try {
    
    const token = req.headers["x-access-token"]
     
    if(!token) return res.json({message: "no token provider"})

    const decoded = jwt.verify(token, 'secretword')

    req.userId = decoded.id
 
    const user = await UserModel.findById(req.userId, {password: 0})
    if(!user) return res.json({message: 'no user found'})
    
    next()
    
  } catch (error) {
    return res.json({message: 'Unauthorized'})
  }
}

