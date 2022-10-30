import mongoose from "mongoose";
import { questionSchema } from "./question.js";

const attemptSchema = new mongoose.Schema({
    questions: [questionSchema],
    startedAt: {
        type: Date,
        required: true
    },
    score: {
        type: Number,
        required: true,
        default: 0
    },
    usersAnswer: [{
        questionId: {
            type:  mongoose.Schema.Types.ObjectId,
            require: true,
            ref: 'Question'
        },
        userSelectedAnswerIndex: {
            type: Number,
            require: true,
            default: 0
        }
    }],
    correctAnswer: [questionSchema],
    scoreText: {
        type: String,
        required: false
    },
    completed: {
        type: Boolean,
        required: true
    }
}, {
    timestamps: true
})

const Attempt = mongoose.model("Attempt", attemptSchema)

export default Attempt