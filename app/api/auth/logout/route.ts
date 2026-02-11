import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ message: "Logged out" });

  // Primary auth cookie for this Next.js app
  res.cookies.delete("auth_token");

  // Also clear common backend cookie name (safe no-op if not set)
  res.cookies.delete("token");

  return res;
}

// Optional: allow GET logout for simple links/manual testing
export async function GET() {
  return POST();
}
