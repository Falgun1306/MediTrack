import jwt from "jsonwebtoken"
import env from "../config/env.js";

export const genrateToken = (tokenData) =>{
    return jwt.sign(
        {_id:tokenData}, 
        env.JWT_SECRETE, {
        expiresIn: env.JWT_EXPIRES,
    });
}
