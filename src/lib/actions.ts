"use server";

import { cookies } from "next/headers";
import { ACCOUNTS, SESSION_COOKIE, encodeSession } from "@/src/lib/auth";

// Returns error string on failure, or redirect path on success.
// Navigation is handled client-side — we never call redirect() here
// because redirect() inside useTransition silently swallows the navigation.
export async function loginAction(
  email: string,
  password: string
): Promise<{ error: string } | { redirectTo: string }> {
  const account = ACCOUNTS[email.toLowerCase()];

  if (!account) {
    return { error: "No account found with this email." };
  }

  if (account.password !== password) {
    return { error: "Incorrect password." };
  }

  const { password: _pw, ...user } = account;

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, encodeSession(user), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8, // 8 hours
  });

  return { redirectTo: account.redirect };
}

export async function logoutAction(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}
