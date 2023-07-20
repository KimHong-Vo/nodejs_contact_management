import express from 'express'
import { registerUser, loginUser, getUserInfo } from '../controllers/user-controller.ts'
import tokenValidator from '../middleware/tokenValidator.ts'

const userRoute = express.Router()

userRoute.route('/register').post(registerUser)
userRoute.route('/login').get(loginUser)
userRoute.get('/info', tokenValidator, getUserInfo)

export default userRoute