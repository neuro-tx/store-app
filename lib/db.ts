import "server-only";

import mongoose, { Mongoose } from "mongoose";

const MONGODB_URI = process.env.DATABASE_URL as string;

declare global {
  var MongooseCache: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

let cached = global.MongooseCache;

if (!cached) {
  cached = global.MongooseCache = { conn: null, promise: null };
}

async function dbConnect(): Promise<Mongoose> {
  if (!MONGODB_URI)
    throw new Error(
      "Please define the DATABASE_URL environment variable in .env file"
    );

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
  }

  try {
    cached.conn = await cached.promise;
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    cached.promise = null;
    console.error("❌ MongoDB connection error:", error);
    throw error;
  }

  return cached.conn;
}

export default dbConnect;
