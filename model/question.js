import mongoose from "mongoose";

export const questionSchema = new mongoose.Schema({
    answers: [{ 
        type: String, 
        required: true 
    }],
    text: { 
        type: String, 
        required: true 
    },
    correctAnswer: { 
        type: Number, 
        required: true 
    }
})

const Question = mongoose.model("Question", questionSchema)

export default Question