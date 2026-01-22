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
    const status = searchParams.get("status") || "active";
    const parent = searchParams.get("parent");

    const query: Record<string, unknown> = {};
    if (status) query.status = status;
    if (parent === "root") {
      query.parent = null;
    } else if (parent) {
      query.parent = parent;
    }

    const categories = await Category.find(query)
      .sort({ sortOrder: 1, name: 1 })
      .lean()
      .exec();

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
    const { name, slug, parent, icon, sortOrder, status } = body;

    if (!name) {
      return NextResponse.json(
        { message: "Name is required" },
        { status: 400 }
      );
    }

    const finalSlug = slug ? slugify(slug) : slugify(name);

    const existing = await Category.findOne({ slug: finalSlug });
    if (existing) {
      return NextResponse.json(
        { message: "Category slug already exists" },
        { status: 409 }
      );
    }

    const category = await Category.create({
      name,
      slug: finalSlug,
      parent: parent || null,
      icon,
      sortOrder: typeof sortOrder === "number" ? sortOrder : 0,
      status: status || "active",
    });

    return NextResponse.json(
      { message: "Category created", category },
      { status: 201 }
    );
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
