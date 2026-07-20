import env from '../config/env.js';
import User from '../models/user.model.js'
import { asyncHandler } from '../utilities/asyncHandler.utility.js';
import { genrateToken } from '../utilities/cookie.utility.js';
import { errorHandler } from '../utilities/errorHandler.utility.js';
import bcrypt from "bcryptjs";

// Reusable cookie options — ensures secure flags are consistent across all endpoints
const getCookieOptions = () => {
    const isProduction = env.NODE_ENV === "production";
    return {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
        path: '/',
        maxAge: env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000, // days → milliseconds
    };
};

// Log at startup so you can verify the flags in Render logs
console.log(`[Auth] NODE_ENV=${env.NODE_ENV}, cookie secure=${env.NODE_ENV === "production"}, sameSite=${env.NODE_ENV === "production" ? "none" : "lax"}`);

export const getCurrentUser = asyncHandler(async (req, res, next) => {

    const user = await User.findById(req.user._id).select("-password");
    res.set({
        "Cache-Control": "no-store, no-cache, must-revalidate, private",
        Pragma: "no-cache",
        Expires: "0",
    });
    res.status(200).json({
        success: true,
        user
    });
});


export const register = asyncHandler(async (req, res, next) => {
    const { name, phoneNum, email, password, confirmPassword } = req.body;
    // console.log(req.body);

    if (!name || !phoneNum || !email || !password || !confirmPassword) {
        return next(new errorHandler("All fields are required", 400));
    }

    if (password !== confirmPassword) {
        return next(new errorHandler("password not matched", 400));
    }

    //checking for unique username
    const user = await User.findOne({ email });
    if (user) {
        return next(new errorHandler("User already exist", 400));
    }

    const hashedPassword = await bcrypt.hash(password, 10);//10 rounds of hashing


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
        .cookie("token", token, getCookieOptions())
        .json({
            success: true,
            message: "User created successfully",
            responseData: {
                newUser,
                token
            }
        });
});

export const login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return next(new errorHandler("please enter valid username or password", 400));
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        return next(new errorHandler("please enter valid username or password", 400));
    }

    const token = genrateToken(user?._id);

    res.status(200)
        .cookie("token", token, getCookieOptions())
        .json({
            success: true,
            responseData: {
                user,
                token
            }
        })
});

export const logout = asyncHandler(async (req, res, next) => {
    res
        .status(200)
        .cookie("token", "", {
            ...getCookieOptions(),
            maxAge: 0, // Override maxAge to expire immediately
        })
        .json({
            success: true,
            message: "logout successful!"
        })
})

