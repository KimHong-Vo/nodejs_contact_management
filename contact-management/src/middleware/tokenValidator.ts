import jwt, { decode } from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import { ACCESSTOKEN_SECRET } from '../constants.ts'

const tokenValidator = asyncHandler(async(req, res, next) => {
    
    const reqAuth = req.headers.authorization
    if(reqAuth && reqAuth.startsWith('Bearer')){
        const token = reqAuth.split(' ')[1]
        jwt.verify(token, ACCESSTOKEN_SECRET, (err, decode) => {
            if(err) {
                res.status(401)
                throw new Error('User is not authorize')
            } else {
                req.body.user = decode
                next()
            }
        })
        if(!token){
            res.status(401)
                throw new Error('User is not authorize')
        }
    }
})

export default tokenValidator