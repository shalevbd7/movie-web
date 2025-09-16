import mongoose from "mongoose";
import { ENV_VARS } from "./envVars.js";
// Connect the application to the MongoDB database.
export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(ENV_VARS.MONGO_URI);
    console.log("mongoDb connected: " + conn.connection.host);
  } catch (error) {
    console.log("Error connection to mongoDB");
    process.exit(1);
  }
};
