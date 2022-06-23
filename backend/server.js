import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/db.js";
import {errorHandler} from "./middlewares/errorMiddleware.js";
import path from "path";

/** import all routes */
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import ticketRoutes from "./routes/ticketRoutes.js";

dotenv.config();
connectDB();

const app = express();

app.get("/", (req, res) => {
    res.status(200).json({message: "Welcome to the Ticket Support API"})
});

/** middlewares */
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tickets", ticketRoutes);

const __dirname = path.resolve()

/** serve frontend */
if (process.env.NODE_ENV === "production") {
    /** set build folder as static */
    app.use(express.static(path.join(__dirname, "../frontend/build")));

    app.get("*", (req, res) => res.sendFile(__dirname, "../", "client", "build", "index.html"))
} else {
    app.get("/", (req, res) => {
        res.status(200).json({message: "Welcome to the Ticket Support API"})
    });
}

app.use(errorHandler);

app.listen(8080, () => {
    console.log("Server is running on port 8080")
});