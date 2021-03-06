import mongoose from 'mongoose';

const {Schema} = mongoose;

const Ticket = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    product: {
        type: String,
        required: [true, "Please select a product"],
        enum: ["iPhone", "iMac", "Macbook Pro", "iPad"]
    },
    description: {
        type: String,
        required: [true, "Please enter a description of the issue"]
    },
    status: {
        type: String,
        required: true,
        enum: ["new", "open", "closed"],
        default: "new"
    }
}, {timestamps: true});

export default mongoose.model("Ticket", Ticket);