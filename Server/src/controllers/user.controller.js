import env from '../config/env.js';
import User from '../Models/user.model.js';
import { asyncHandler } from '../utilities/asyncHandler.utility.js';
import { genrateToken } from '../utilities/cookie.utility.js';
import { errorHandler } from '../utilities/errorHandler.utility.js';
import bcrypt from "bcryptjs";

export const getCurrentUser = asyncHandler(async (req, res, next) => {

   const user = await User.findById(req.user._id).select("-password");

   res.status(200).json({
      success: true,
      user
   });
});


export const register = asyncHandler(async(req, res, next)=>{    
    const {name, phoneNum, email, password, confirmPassword} = req.body;
    // console.log(req.body);
    
    if(!name || !phoneNum || !email || !password || !confirmPassword){
        return next(new errorHandler("All fields are required", 400));
    }

    if(password !== confirmPassword){
        return next(new errorHandler("password not matched", 400));
    }

    //checking for unique username
    const user = await User.findOne({email});
    if(user){
        return next(new errorHandler("User already exist", 400));
    }

    const hashedPassword = await bcrypt.hash(password,10);//10 rounds of hashing


    //creating user on mongoDB
    const newUser = await User.create({
        name,
        phoneNum,
        email,
        password: hashedPassword,
        confirmPassword: hashedPassword
    });

    //now we creating auth cookies for the security and flexibility(stayed log in for perticular time)
    const token = genrateToken(newUser._id);

    res
    .status(201)
    .cookie("token", token,{// sending the token to decode
        httpOnly: true, //The cookie cannot be accessed from JavaScript (document.cookie).Protects against XSS (Cross-Site Scripting) attacks. Always true for auth cookies like JWTs.
        sameSite: "lax",//Controls when the cookie is sent in cross-site requests.
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRES * 60 * 60 * 24 * 1000),
        secure: false,
    })
    .json({
        success: true,
        message: "User created successfully",
        responseData:{
            newUser, 
            token
        }
    });
});

export const login = asyncHandler(async(req, res, next)=>{
    const {email, password} = req.body;

    const user = await User.findOne({email});
    if(!user){
        return next(new errorHandler("please enter valid username or password", 400));
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if(!isValidPassword){
        return next(new errorHandler("please enter valid username or password", 400));
    }

    const token = genrateToken(user?._id);     

    res.status(200)
    .cookie("token", token,{
        httpOnly: true,
        secure: true,
        sameSite: "none",
        expires: new Date(Date.now() + env.COOKIE_EXPIRES * 60 * 60 * 24 * 1000),
        
    })
    .json({
        success: true,
        responseData: {
            user,
            token
        }
    })
});

export const logout = asyncHandler(async(req, res, next)=>{
    res
    .status(200)
    .cookie("token", "",{
        expires: new Date(Date.now()),
        httpOnly: true,
    })
    .json({
        success: true,
        message: "logout successful!"
    })
})
