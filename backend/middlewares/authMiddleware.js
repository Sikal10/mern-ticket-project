import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import {errorResponse} from "../helpers/errorResponse.js";
import {verifyAccessToken} from "../helpers/token.js";

/** This 'protect' middleware decodes the token */
export const protect = asyncHandler(async (req, res, next) => {
    let accessToken;

    const authHeaders = req.headers.authorization;

    /** Get token from header */
    if (authHeaders && authHeaders.startsWith("Bearer")) {
        accessToken = authHeaders.split(" ")[1];
    }

    if (!accessToken) return next(errorResponse(401, "You're not authenticated."));

    /** if the token exists, verify the token */
    try {
        const decodedToken = await verifyAccessToken(accessToken);
        req.user = await User.findById(decodedToken.id).select("-password");
        next()

    } catch (err) {
        return next(errorResponse(403, "Token is not valid!"))
    }
});