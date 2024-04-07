import mongoose from "mongoose";
import bcrypt  from 'bcryptjs';
import connectDB from "../config/db.config.js";
connectDB()
// Define the schema
const cardSchema = new mongoose.Schema({
    card_number: {
        type: Number,
        required: [true, 'this is required value'],
    },
    points: Number,
    question_array,
    instruction: String,
    noofquestions: Number,
});
// Define the model
const Card = mongoose.model("Card", cardSchema);

export default Card;
