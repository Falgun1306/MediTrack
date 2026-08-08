import { asyncHandler } from "../utilities/asyncHandler.utility.js";
import { errorHandler } from "../utilities/errorHandler.utility.js";
import jwt from 'jsonwebtoken'

export const isAuthenticated = asyncHandler(async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const tokenFromHeader = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

    const token = req.cookies?.token || tokenFromHeader;

    if (!token) {
        return next(new errorHandler("Session Expires", 401));
    }

    try {
        const tokenData = jwt.verify(token, process.env.JWT_SECRETE);
        req.user = tokenData;
        next();
    } catch (error) {
        return next(new errorHandler("Session Expires", 401));
    }
});