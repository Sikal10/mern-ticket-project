import express from "express";
import {getTickets, createTicket, getTicket, deleteTicket, updateTicket} from "../controllers/ticketControllers.js";
import {protect} from "../middlewares/authMiddleware.js";

import noteRouter from "./noteRoutes.js";

const router = express.Router();

/** Re-route into note router since the route needed is api/tickets/:tickedId/notes */
router.use("/:id/notes", noteRouter);

router.route("/").get(protect, getTickets).post(protect, createTicket);
router.route("/:id").get(protect, getTicket).put(protect, updateTicket).delete(protect, deleteTicket);

export default router;