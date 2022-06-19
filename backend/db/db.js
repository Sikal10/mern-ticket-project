import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI);
        console.log(`mongoDB connected ${connection.connection.host}`.blue.bold.underline);
    } catch (err) {
        console.log(`Error: ${err.message}`.red.bold.underline);
        process.exit(1);
    }

    mongoose.connection.on("disconnected", () => {
        console.log("mongoDB disconnected".red.underline.bold);
    })
}

export default connectDB;