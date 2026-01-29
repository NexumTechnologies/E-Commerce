import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Category } from "@/models/Category";
import { getAuthUserFromRequest, requireAdmin } from "@/lib/auth";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const authUser = await getAuthUserFromRequest();
    try { requireAdmin(authUser); } catch { return NextResponse.json({ message: "Only admin can update categories" }, { status: 403 }); }

    const body = await req.json();
    const { name } = body;

    const id = params.id;
    const category = await Category.findById(id);
    if (!category) return NextResponse.json({ message: "Category not found" }, { status: 404 });

    category.name = name || category.name;
    await category.save();

    return NextResponse.json({ message: "Category updated", category });
  } catch (err: unknown) {
    console.error("PUT /api/categories/[id] error", err);
    return NextResponse.json({ message: "Server error", error: err instanceof Error ? err.message : "Unknown" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const authUser = await getAuthUserFromRequest();
    try { requireAdmin(authUser); } catch { return NextResponse.json({ message: "Only admin can delete categories" }, { status: 403 }); }

    const id = params.id;
    const category = await Category.findById(id);
    if (!category) return NextResponse.json({ message: "Category not found" }, { status: 404 });

    await category.remove();
    return NextResponse.json({ message: "Category deleted" });
  } catch (err: unknown) {
    console.error("DELETE /api/categories/[id] error", err);
    return NextResponse.json({ message: "Server error", error: err instanceof Error ? err.message : "Unknown" }, { status: 500 });
  }
}

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const id = params.id;
    const category = await Category.findById(id).lean().exec();
    if (!category) return NextResponse.json({ message: "Category not found" }, { status: 404 });
    return NextResponse.json({ category });
  } catch (err: unknown) {
    console.error("GET /api/categories/[id] error", err);
    return NextResponse.json({ message: "Server error", error: err instanceof Error ? err.message : "Unknown" }, { status: 500 });
  }
}
