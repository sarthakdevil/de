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
    question_Url: String,
    points: Number,
    instruction: String,
    answer:{
        type: String,
        select: false // This field will not be returned by default
    }
});
// Define the model
const Card = mongoose.model("Card", cardSchema);

export default Card;
