import mongoose from 'mongoose';
import { MONGODB_URI } from '../config/database.config.js';

async function connectToDatabase() {
  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000
    });

    console.log("Success MongoDB");
    const db = mongoose.connection.db;

  } catch (error) {
    console.error("Error to connect MongoDB:", error);
  }
}

export { connectToDatabase };


