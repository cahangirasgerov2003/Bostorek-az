import mongoose from "mongoose";

import dotenv from "dotenv";

dotenv.config();
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connection created with Mongodb !");
  } catch (error) {
    console.log("Connection failed with Mongodb !", error);
    throw error;
  }
};

export default connectDb;
