import asyncHandler from 'express-async-handler'
import User from '../dataModel.js'
import generateToken from '../utils.js'



// registering a user

    const registerUser = asyncHandler(async(req, res)=>{
        const {userName, email, password}= req.body
        const userExists = await User.findOne({userName, email})

        if(userExists){
            res.status(400)
            throw new Error('User already exists')
        }

        const user = await User.create({
            userName, email, password
        })
        if(user){
            res.status(201).json({
                _id:user._id,
                userName:user.userName,
                email:user.email,
                token:generateToken(user._id)
            })
        }else{
            res.status(400)
            throw new Error('invalid user information')
        }
    })

   const getAllUsers = asyncHandler(async(req, res)=>{
        const users = await User.find({})
        res.json(users)
    })

    const loginUser = asyncHandler(async(req, res)=>{
        const {email, password} = req.body
        const user = await User.findOne({email})

        if(user && (password===user.password)){
            res.json({
                _id: user._id,
                userName:user.userName,
                email:user.email,
                token:generateToken(user._id)
            })
        }else{
            res.status(401)
            throw new Error('invalid email or password')
        }
    })


export { registerUser, getAllUsers, loginUser}