import mongoose from "mongoose";

const FeedbackSchema = new mongoose.Schema({
    text: {
        type: String,
    },
    src: {
        type: Array,
    },
    userEmail: {
        type: String,
        require: true,
    },
    createAt: {
        type: Date,
        default: () => Date.now() - 3 * 60 * 60 * 1000,
        required: true
    }
})

const Feedback = mongoose.model('feedback', FeedbackSchema)

export default Feedback