import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const MONGO_URL = process.env.MONGO_URL;

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("connected to database");
  } catch (error) {
    console.log("Error connecting to mongodb: ", error.message);
  }
};

export default connectToMongoDB;
