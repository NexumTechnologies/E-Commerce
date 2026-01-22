import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";

export async function GET() {
  try {
    // Get connection info
    const connectionInfo = {
      timestamp: new Date().toISOString(),
      mongoUri: process.env.MONGODB_URI
        ? `${process.env.MONGODB_URI.substring(0, 30)}...` // Masked for security
        : "Not set",
      mongoDb: process.env.MONGODB_DB || "Not set",
      vercelRegion: process.env.VERCEL_REGION || "Unknown",
      nodeEnv: process.env.NODE_ENV || "Unknown",
    };

    // Try to connect
    await connectDB();

    return NextResponse.json({
      success: true,
      message: "✅ MongoDB Connected Successfully",
      connectionInfo,
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    const errorStack = error instanceof Error ? error.stack : undefined;

    return NextResponse.json(
      {
        success: false,
        message: "❌ MongoDB Connection Failed",
        error: errorMessage,
        connectionInfo: {
          timestamp: new Date().toISOString(),
          mongoUri: process.env.MONGODB_URI
            ? `${process.env.MONGODB_URI.substring(0, 30)}...`
            : "Not set",
          mongoDb: process.env.MONGODB_DB || "Not set",
          vercelRegion: process.env.VERCEL_REGION || "Unknown",
          nodeEnv: process.env.NODE_ENV || "Unknown",
        },
        // Include full error details in development
        ...(process.env.NODE_ENV === "development" && { stack: errorStack }),
      },
      { status: 500 }
    );
  }
}
