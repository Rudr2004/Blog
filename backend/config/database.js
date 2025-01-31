import mongoose from "mongoose";

async function db() {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI, {
      bufferCommands: false,
      serverSelectionTimeoutMS: 9000,
    });

    if (connect) {
      console.log("Connected to DB");
    }
  } catch (error) {
    console.log("Error in DB", error);
  }
}

export default db;
