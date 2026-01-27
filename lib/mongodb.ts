import mongoose from "mongoose";

// We don't validate at module level to avoid build failures during static analysis.
// Next.js static generation can evaluate modules without loading env vars.

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) return cached.conn;

  // Get and validate MONGODB_URI only when we actually try to connect
  const MONGODB_URI = process.env.MONGODB_URI?.trim();

  if (!MONGODB_URI) {
    // Don't throw — allow the app to run without MongoDB configured.
    // This project uses Postgres in the separate backend; skip Mongo when not set.
    console.warn(
      "❌ MONGODB_URI is not set. Skipping MongoDB connection (this is intentional if you only use Postgres)."
    );
    return null;
  }

  // Validate connection string format
  if (
    !MONGODB_URI.startsWith("mongodb://") &&
    !MONGODB_URI.startsWith("mongodb+srv://")
  ) {
    throw new Error(
      `❌ Invalid MONGODB_URI format. Connection string must start with "mongodb://" or "mongodb+srv://". Current value: ${MONGODB_URI.substring(
        0,
        20
      )}...`
    );
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        dbName: process.env.MONGODB_DB,
      })
      .then((mongoose) => {
        console.log("✅ MongoDB Connected");
        return mongoose;
      })
      .catch((error) => {
        // Clear the promise on error so we can retry
        cached.promise = null;
        console.error("❌ MongoDB connection error:", error.message);
        throw new Error(
          `MongoDB connection failed: ${error.message}. Please check your MONGODB_URI environment variable.`
        );
      });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    // Clear connection on error
    cached.conn = null;
    throw error;
  }
}
