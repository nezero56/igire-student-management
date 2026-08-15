import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE, decodeSession } from "@/src/lib/auth";

const PROTECTED: { prefix: string; role: string }[] = [
  { prefix: "/admin",       role: "admin"   },
  { prefix: "/facilitator", role: "trainer" },
  { prefix: "/student",     role: "student" },
];

// Role → their home dashboard URL
const ROLE_HOME: Record<string, string> = {
  admin:   "/admin/dashboard",
  trainer: "/facilitator/dashboard",
  student: "/student/dashboard",
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const match = PROTECTED.find((p) => pathname.startsWith(p.prefix));
  if (!match) return NextResponse.next();

  const raw = request.cookies.get(SESSION_COOKIE)?.value;
  const session = raw ? decodeSession(raw) : null;

  if (!session) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (session.role !== match.role) {
    return NextResponse.redirect(new URL(ROLE_HOME[session.role] ?? "/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/facilitator/:path*", "/student/:path*"],
};
