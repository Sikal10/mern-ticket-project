import express from "express";
import {getAllUsers, getCurrentUser} from "../controllers/userControllers.js";
import {protect, authorize} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, authorize, getAllUsers);
router.route("/profile").get(protect, getCurrentUser);

export default router;