import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { RFQ } from "@/models/RFQ";
import { getAuthUserFromRequest, requireBuyer, AuthUser } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const authUser: AuthUser | null = await getAuthUserFromRequest();
    try {
      requireBuyer(authUser);
    } catch {
      return NextResponse.json(
        { message: "Only buyers can create RFQs" },
        { status: 403 }
      );
    }

    if (!authUser) {
      return NextResponse.json(
        { message: "Authentication required" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { title, description, quantity, category, targetPrice, country } =
      body;

    if (!title || !description || typeof quantity !== "number") {
      return NextResponse.json(
        { message: "Title, description and numeric quantity are required" },
        { status: 400 }
      );
    }

    const rfq = await RFQ.create({
      buyer: authUser.id,
      title,
      description,
      quantity,
      category,
      targetPrice,
      country,
    });

    return NextResponse.json({ message: "RFQ created", rfq }, { status: 201 });
  } catch (err: unknown) {
    console.error("POST /api/rfq error", err);
    return NextResponse.json(
      {
        message: "Server error",
        error: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();

    const authUser: AuthUser | null = await getAuthUserFromRequest();
    try {
      requireBuyer(authUser);
    } catch {
      return NextResponse.json(
        { message: "Only buyers can view their RFQs" },
        { status: 403 }
      );
    }

    if (!authUser) {
      return NextResponse.json(
        { message: "Authentication required" },
        { status: 401 }
      );
    }

    const rfqs = await RFQ.find({ buyer: authUser.id })
      .sort({ createdAt: -1 })
      .lean()
      .exec();

    return NextResponse.json({ rfqs });
  } catch (err: unknown) {
    console.error("GET /api/rfq error", err);
    return NextResponse.json(
      {
        message: "Server error",
        error: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
