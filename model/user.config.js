import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import connectDB from '../config/db.config.js';

connectDB();
// Define the schema
const playerSchema = new mongoose.Schema({
    password: { type: String, required: true ,default:false }, // Assuming password is required
    email: {
        type: String,
        required: true,
        unique: true,
        match: [
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            'Please use a valid email'
        ]
    },
    fullname: String,
    points: { type: Number, default: 0 }, // Default points to 0
    cardcompleted:{type:Number,default:0},
    last_updated: { type: Date, default: Date.now },
    questionscompleted : {type:Number,default:0},
    totalquestionscompleted:{type:Number,default:0}
});

// Define a method to generate authentication token
playerSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
};

// Define the model
const Player = mongoose.model("Player", playerSchema);

export default Player;
