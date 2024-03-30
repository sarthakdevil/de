import mongoose from "mongoose";

// Connect to the MongoDB database
mongoose.connect('http://127.0.0.1/cardschema', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.error("Error connecting to MongoDB:", error);
});

// Define the schema
const cardSchema = new mongoose.Schema({
    card_number: Number,
    question_Url: String,
    points: Number,
    instruction: String,
    answer: String
});

// Define the model
const Card = mongoose.model("Card", cardSchema);

export default Card;
