import asyncHandler from 'express-async-handler';
import User from '../models/user.model.js';

const register = asyncHandler(async(req, res) => {
    const {username, email, phone, password, role} = req.body;

    const userExists = await User.findOne({email});
    if(userExists){
        throw new Error("User already exists")
    }

    const user = await User.create({username, email, phone, password, role});

    if(!user){
        res.status(400);
        throw new Error("Invalid User Data")
    }

    res.status(201).json({
        message: "user registerred successfully",
        user: {
            username: user.username,
            email: user.email,
            phone: user.phone,
            role: user.role
        }
    })
})

export {register}