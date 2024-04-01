import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

// Connect to the MongoDB database
mongoose.connect('mongodb://127.0.0.1/playerschema').then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.error("Error connecting to MongoDB:", error);
});

// Define the schema
const playerSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    password: { type: String, unique: true },
    email: {
        type: String,
        required: [true, 'Please provide an Email'],
        match: [
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            'Please use a valid Email'
        ]
    },
    fullname: String,
    Schoolname: String,
    Graduation: Number, // Year of graduation
    points: Number,
    attempted: Number ,// Number of questions attempted by the user
    last_updated: {
        type:Date,
        last_updated:true
    } 
});

// Define a method to generate authentication token
playerSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, 'your-secret-key', { expiresIn: '1h' });
    return token;
};

// Define the model
const Player = mongoose.model("Player", playerSchema);

export default Player;
