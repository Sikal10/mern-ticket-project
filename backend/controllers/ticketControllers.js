import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import Ticket from "../models/Ticket.js";
import {errorResponse} from "../helpers/errorResponse.js";

/** @desc  create a ticket
 *  @route /api/tickets POST
 *  @access private
 * */
export const createTicket = asyncHandler(async (req, res, next) => {
    const {product, description} = req.body;
    if (!product || !description) return errorResponse(400, "Please add a product and description");

    const user = await User.findById(req.user);
    if (!user) return errorResponse(401, "User not found");

    const ticket = await Ticket.create({product, description, user: req.user._id, status: "new"});

    return res.status(201).json({success: true, ticket});

});

/** @desc  get user tickets
 *  @route /api/tickets get
 *  @access private
 * */
export const getTickets = asyncHandler(async (req, res, next) => {
    /** Get user using the ID in the JWT */
    const user = await User.findById(req.user);
    if (!user) return errorResponse(401, "User not found");

    const tickets = await Ticket.find({user: req.user});

    res.status(201).json({success: true, tickets})
});

/** @desc  get user tickets
 *  @route /api/tickets/:id get
 *  @access private
 * */
export const getTicket = asyncHandler(async (req, res, next) => {
    /** Get user using the ID in the JWT */
    const user = await User.findById(req.user);
    if (!user) return errorResponse(401, "User not found");

    const ticket = await Ticket.findById(req.params.id);

    /** check if there is a ticket with the id in the params */
    if (!ticket) return errorResponse(404, "Ticket not found");

    /** check if the logged-in user is trying to get a ticket they created */
    /**
     * toString() converts it to a readable string instead of mongoose new ObjectId...
     * */

    if (ticket.user.toString() !== req.user._id.toString()) return errorResponse(404, "Not authorized");

    res.status(201).json({success: true, ticket})
});

/** @desc  update user ticket
 *  @route /api/tickets/:id PUT
 *  @access private
 * */
export const updateTicket = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user);

    if (!user) return errorResponse(401, "User not found");

    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) return errorResponse(404, "Ticket not found");

    /** check if the logged-in user is trying to edit a ticket they created */
    if (ticket.user.toString() !== req.user._id.toString()) return errorResponse(404, "Not authorized");

    const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    });

    res.status(201).json({success: true, updatedTicket});
});

/** @desc  delete user ticket
 *  @route /api/tickets/:id DELETE
 *  @access private
 * */
export const deleteTicket = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user);

    if (!user) return errorResponse(401, "User not found");

    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) return errorResponse(404, "Ticket not found");

    /** check if the logged-in user is trying to delete a ticket they created */
    if (ticket.user.toString() !== req.user._id.toString()) return errorResponse(404, "Not authorized");

    await ticket.remove();

    res.status(201).json({success: true, message: "Ticket deleted successfully"})
});
