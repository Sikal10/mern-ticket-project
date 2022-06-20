import express from "express";
import {getTickets, createTicket, getTicket, deleteTicket, updateTicket} from "../controllers/ticketControllers.js";
import {protect} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, getTickets).post(protect, createTicket);
router.route("/:id").get(protect, getTicket).put(protect, updateTicket).delete(protect, deleteTicket);

export default router;