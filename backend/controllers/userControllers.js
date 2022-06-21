import asyncHandler from "express-async-handler";
import User from "../models/User.js";

/** @desc get user profile
 *  @route /api/user/profile GET
 *  @access private
 * */
export const getCurrentUser = asyncHandler(async (req, res, next) => {
    /**get authenticated user*/
    const user = await User.findById(req.user);

    return res.status(200).json({success: true, user});
});

/** @desc get all users
 *  @route /api/users GET
 *  @access private admin
 * */

export const getAllUsers = asyncHandler(async (req, res, next) => {
    const users = await User.find();

    return res.status(200).json({success: true, users});

});