import mongoose from 'mongoose';

const {Schema} = mongoose;

const Note = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    ticket: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Ticket"
    },
    note: {
        type: String,
        required: [true, "Please add a note"]
    },
    isStaff: {
        type: Boolean,
        default: false
    },
    staffId: {
        type: String,

    }
}, {timestamps: true});

export default mongoose.model("Note", Note);