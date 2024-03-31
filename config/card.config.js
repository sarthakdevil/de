import mongoose from "mongoose";
import bcrypt  from 'bcryptjs';
// Connect to the MongoDB database

// Define the schema
const cardSchema = new mongoose.Schema({
    card_number: {
        type: Number,
        required: [true, 'this is required value'],
    },
    question_Url: String,
    points: Number,
    instruction: String,
    answer: String
});
// Define the model
const Card = mongoose.model("Card", cardSchema);

export default Card;
