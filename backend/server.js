import express from "express";
import dotenv from "dotenv";

/** import all routes */
import authRoutes from "../backend/routes/authRoutes.js";

const app = express();

/** middlewares */
app.use(express.json());

app.use("/api/auth", authRoutes);

app.listen(8080, () => {
    console.log("Server is running on port 8080")
});