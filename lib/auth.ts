import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

// We don't validate at module level to avoid build failures during static analysis.
function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }
  return secret;
}

export interface AuthUser {
  id: string;
  role: "buyer" | "seller" | "admin";
}

export async function getTokenFromCookies(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;
  return token || null;
}

export function verifyAuthToken(token: string): AuthUser | null {
  try {
    const secret = getJwtSecret();
    const decoded = jwt.verify(token, secret) as AuthUser;
    return {
      id: decoded.id,
      role: decoded.role,
    };
  } catch {
    return null;
  }
}

// Helper for route handlers: returns AuthUser or null
export async function getAuthUserFromRequest(): Promise<AuthUser | null> {
  const token = await getTokenFromCookies();
  if (!token) return null;
  return verifyAuthToken(token);
}

// Optional helper to enforce seller-only access inside route handlers
export function requireSeller(user: AuthUser | null) {
  if (!user || user.role !== "seller") {
    throw new Error("Not authorized as seller");
  }
}

export function requireAdmin(user: AuthUser | null) {
  if (!user || user.role !== "admin") {
    throw new Error("Not authorized as admin");
  }
}

export function requireBuyer(user: AuthUser | null) {
  if (!user || user.role !== "buyer") {
    throw new Error("Not authorized as buyer");
  }
}
