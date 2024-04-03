import mongoose from 'mongoose';

// Function to establish database connection
const connectDB = async () => {
    try {
        // Connect to the MongoDB database
        await mongoose.connect('mongodb://127.0.0.1/playerschema');
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

export default connectDB;
