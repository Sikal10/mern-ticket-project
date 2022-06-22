import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import {errorResponse} from "../helpers/errorResponse.js";
import Ticket from "../models/Ticket.js";
import Note from "../models/Note.js";

/** @desc  get notes for a ticket
 *  @route /api/tickets/:tickedId GET
 *  @access private
 * */
export const getTicketNotes = asyncHandler(async (req, res, next) => {
    /** Get user using the ID in the JWT */
    const user = await User.findById(req.user);
    if (!user) return errorResponse(404, "User not found");

    const ticket = await Ticket.findById(req.params.id);

    /** check if the logged-in user is trying to get a ticket they created */
    /**
     * toString() converts it to a readable string instead of mongoose new ObjectId...
     * */

    if (ticket.user.toString() !== req.user._id.toString()) return errorResponse(401, "Not authorized");

    const notes = await Note.find({ticket: req.params.id});

    res.status(200).json({success: true, notes});
});

/** @desc  create notes for a ticket
 *  @route /api/tickets/:tickedId POST
 *  @access private
 * */
export const createTicketNote = asyncHandler(async (req, res, next) => {
    /** Get user using the ID in the JWT */
    const user = await User.findById(req.user);
    if (!user) return errorResponse(404, "User not found");

    const ticket = await Ticket.findById(req.params.id);

    /** make sure the user owns the ticket */
    /**
     * toString() converts it to a readable string instead of mongoose new ObjectId...
     * */

    if (ticket.user.toString() !== req.user._id.toString()) return errorResponse(401, "Not authorized");

    const note = await Note.create({
        note: req.body.note,
        isStaff: false,
        ticket: req.params.id,
        user: req.user._id
    });

    res.status(200).json({success: true, note});
});