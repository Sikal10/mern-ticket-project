import User from "../models/User.js";
import {comparePassword, hashPasswordHandler, validateUserData} from "../helpers/validate.js";
import asyncHandler from "express-async-handler";
import {errorResponse} from "../helpers/errorResponse.js";
import {generateAccessToken} from "../helpers/token.js";

/** @desc register a user
 *  @route /api/auth/register POST
 *  @access public
 * */
export const registerUser = asyncHandler(async (req, res, next) => {
    const {name, email, password} = req.body;

    /** check if the credentials are valid  */
    validateUserData(name, email, password, res);

    /** check if there is an existing user */
    const existingUser = await User.findOne({email});
    if (existingUser) return next(errorResponse(404, `user with email ${email} already exists`));

    /** hash the password before saving to database */
    const hashedPassword = await hashPasswordHandler(password);

    const user = await User.create({name, email, password: hashedPassword});
    res.status(201).json({success: true, user});
});

/** @desc login a user
 *  @route /api/auth/login POST
 *  @access public
 * */
export const loginUser = asyncHandler(async (req, res, next) => {
    const {email, password} = req.body;

    /**check if user already exists*/
    const user = await User.findOne({email});
    if (!user) return next(errorResponse(404, "user not found"));

    /**check if the password is correct*/
    const isPasswordCorrect = await comparePassword(password, user);
    if (!isPasswordCorrect) return next(errorResponse(400, "Invalid credentials"));

    res.status(200).json({success: true, user});
});