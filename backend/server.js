import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/db.js";
import {errorHandler} from "./middlewares/errorMiddleware.js";

/** import all routes */
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";


dotenv.config();
connectDB();

const app = express();

/** middlewares */
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);


app.use(errorHandler);

app.listen(8080, () => {
    console.log("Server is running on port 8080")
});