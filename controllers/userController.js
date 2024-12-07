const users = require('../models/usermodel')
const jwt = require('jsonwebtoken')


// register
exports.registerController = async (req,res)=>{
    console.log("Inside registerController ");
    const {firstname,lastname,email,phonenumber,password} = req.body
    console.log(firstname,lastname,email,phonenumber,password);

    try{
        const existingUser = await users.findOne({email})
        if(existingUser){
            res.status(406).json("User already exists ....please login!!!")
        }else{
            const newUser = new users({
                firstname,lastname,email,phonenumber,password
            })
            await newUser.save()
            res.status(200).json(newUser)
        }

    }catch(err){
        res.status(401).json(err)
    }
    
    
}

// login
exports.loginController = async (req,res)=>{
    console.log("Inside loginController");
    const {email,password} = req.body
    console.log(email,password);
    try{
        const existingUser = await users.findOne({email,password})
        if(existingUser){
            //token generation
            const token = jwt.sign({userId:existingUser._id},process.env.JWTPASSWORD)
            res.status(200).json({
                user:existingUser,
                token
            })
        }else{
          res.status(404).json("Invalid e-mail / password!")
        }
    }catch(err){
        res.status(401).json(err)
    }
}


// get user projects
exports.getUsersController = async(req,res)=>{
    console.log("Inside getUsersController ")
    const userId = req.userId
    try{
        const allUsers = await users.find({userId}).select('-password')
        res.status(200).json(allUsers)
    }catch(err){
        res.status(401).json(err)
    }
}

// get one user projects
exports.getOneUserController = async(req,res)=>{
    console.log("Inside getOneUserController ")
    const {email,password} = req.body
    console.log(email,password);
   
    try{
        const existingUser = await users.find({email}).select('-password')
        res.status(200).json(existingUser)
    }catch(err){
        res.status(401).json(err)
    }
}