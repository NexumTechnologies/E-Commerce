import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Category } from "@/models/Category";
import { getAuthUserFromRequest, requireAdmin, AuthUser } from "@/lib/auth";

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    // keep simple: find all categories (only name stored)
    const query: Record<string, unknown> = {};
    const categories = await Category.find(query).sort({ name: 1 }).lean().exec();

    return NextResponse.json({ categories });
  } catch (err: unknown) {
    console.error("GET /api/categories error", err);
    return NextResponse.json(
      {
        message: "Server error",
        error: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const authUser: AuthUser | null = await getAuthUserFromRequest();
    try {
      requireAdmin(authUser);
    } catch {
      return NextResponse.json(
        { message: "Only admin can create categories" },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { name } = body;

    if (!name) {
      return NextResponse.json({ message: "Name is required" }, { status: 400 });
    }

    const category = await Category.create({ name });
    return NextResponse.json({ message: "Category created", category }, { status: 201 });
  } catch (err: unknown) {
    console.error("POST /api/categories error", err);
    return NextResponse.json(
      {
        message: "Server error",
        error: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
