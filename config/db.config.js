import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      "mongodb+srv://wpsadi:1jwKgH2nXvyyVnp2@maindb.ust6caj.mongodb.net/playerschema",
      { writeConcern: { w: "majority" } },
    );
  } catch (error) {
    console.log("MONGODB connection FAILED ", error);
    process.exit(1);
  }
};

export default connectDB;
