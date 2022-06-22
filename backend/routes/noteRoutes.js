import express from "express";
import {getTicketNotes, createTicketNote} from "../controllers/noteControllers.js";
import {protect} from "../middlewares/authMiddleware.js";

const router = express.Router({mergeParams: true});

router.route("/").get(protect, getTicketNotes).post(protect, createTicketNote);

export default router;