import { cookies } from "next/headers";
import type { Role } from "@/src/types";

/**
 * SESSION / AUTH LAYER
 *
 * Currently using in-memory mock accounts with a base64-encoded cookie.
 * This is a frontend demo — NOT real secure authentication.
 *
 * Future backend integration:
 *   - Replace ACCOUNTS lookup with: POST /api/auth/login → JWT token
 *   - Store JWT in httpOnly cookie (same pattern as below)
 *   - Replace decodeSession with JWT verification (jsonwebtoken / jose)
 *   - getSession() becomes a JWT decode + expiry check
 *
 * Security note: base64 is NOT encryption. When backend is connected,
 * use signed JWT tokens to prevent session tampering.
 */

export interface SessionUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  redirect: string;
}

export const ACCOUNTS: Record<string, SessionUser & { password: string }> = {
  "admin@igirerwanda.org": {
    id: "u1",
    name: "Alice Uwimana",
    email: "admin@igirerwanda.org",
    password: "Admin123!",
    role: "admin",
    redirect: "/admin/dashboard",
  },
  "trainer@igirerwanda.org": {
    id: "u2",
    name: "Jean Paul Nkurunziza",
    email: "trainer@igirerwanda.org",
    password: "Trainer123!",
    role: "trainer",
    redirect: "/facilitator/dashboard",
  },
  "student@igirerwanda.org": {
    id: "u4",
    name: "Eric Manzi",
    email: "student@igirerwanda.org",
    password: "Student123!",
    role: "student",
    redirect: "/student/dashboard",
  },
};

export const SESSION_COOKIE = "igire_session";

/** Encode session as base64 JSON — demo only, not encrypted */
export function encodeSession(user: SessionUser): string {
  return Buffer.from(JSON.stringify(user)).toString("base64");
}

/** Decode session cookie — returns null if invalid */
export function decodeSession(value: string): SessionUser | null {
  try {
    return JSON.parse(Buffer.from(value, "base64").toString("utf8")) as SessionUser;
  } catch {
    return null;
  }
}

/** Read current session from cookies (server components only) */
export async function getSession(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const raw = cookieStore.get(SESSION_COOKIE)?.value;
  if (!raw) return null;
  return decodeSession(raw);
}
