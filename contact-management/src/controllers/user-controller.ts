import asynHandler from 'express-async-handler'
import { User } from '../model/user.ts'
import crypto from 'crypto' //using for endcode decode - nodejs crypto for detail
import { Buffer } from 'buffer'
import { myCrypto, responseStatuses, ACCESSTOKEN_SECRET } from '../constants.ts'
import jwt from 'jsonwebtoken'

//desc Create a user
//route POST /api/user/register
//access public
export const registerUser = asynHandler(async (req: Request|any, res: Request|any) => {
    const {email, userName, password} = req.body
    if(!email || !userName || !password) {
        res.status(responseStatuses.VALIDATION_ERROR)
        throw new Error('User data is not valid')
    }else {
        let user: User|null = await User.findOne({where: {email}})
        if(user) {
            res.status(responseStatuses.VALIDATION_ERROR).json({message: "User already exist!"})
        }else {
            user = await User.create({userName, email, password: encryptPassword(password)})
            res.status(responseStatuses.OK).json({id: user.id, userName: user.userName})
        }
        
    }
})

//desc Login user by checking username password
//route GET /api/user/login
//access public
export const loginUser = asynHandler(async (req: Request|any, res: Response|any) => {
    
    const {email, password} = req.body 
    //check email password non null
    if(!email || !password) {
        res.status(responseStatuses.VALIDATION_ERROR)
        throw new Error('Missing user email or password')
    }

    //getting user by email
    let user: User|null = await User.findOne({where: {email}})
    
    //check correct password  
    if(user && decryptPassword(user.password) === password){
        const {sign} = jwt
        const token = sign({
            user: {
                email: user.email,
                userName: user.userName,
                id: user.id
            }
            },
            ACCESSTOKEN_SECRET,
            {expiresIn: '30m'}
        )
        return res.status(responseStatuses.OK).json({message: 'Login successfully', accessToken: token})
    }else {
        res.status(responseStatuses.UNAUTHORIZED)
        throw new Error('Password incorrect')
    }
    
})

//desc: Get user info
//route: get /api/user/:id
//access: private
export const getUserInfo = asynHandler(async (req, res)=>{
    res.status(200).json(req.body.user)
})

function encryptPassword(password: string){
    // the cipher function
	const cipher = crypto.createCipheriv(myCrypto.ALGORITHM, myCrypto.KEY, myCrypto.IV);

	// encrypt the message
	// input encoding
	// output encoding
	let encryptedData = cipher.update(password, "utf8", "hex") + cipher.final("hex")
	return Buffer.from(encryptedData).toString('hex') ;
}

function decryptPassword(encryptedPassword: string) {
    const decipher = crypto.createDecipheriv(myCrypto.ALGORITHM, myCrypto.KEY, myCrypto.IV)
    encryptedPassword = Buffer.from(encryptedPassword, 'hex').toString('utf-8')
    return decipher.update(encryptedPassword, "hex", "utf8") + decipher.final("utf8")
}