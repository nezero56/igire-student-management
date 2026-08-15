"use client";

/**
 * LOGIN PAGE — Igire Rwanda Student Management System
 *
 * Frontend-only authentication using mock accounts.
 * When a real backend is connected, replace `loginAction` with an HTTP POST
 * to /api/auth/login and handle JWT/session tokens returned from the server.
 *
 * Client-server flow (future):
 *   Browser → POST /api/auth/login → Backend → JWT → Cookie → Protected route
 */

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { z } from "zod";
import { loginAction } from "@/src/lib/actions";
import { GraduationCap, Eye, EyeOff, Loader2 } from "lucide-react";
import { cn } from "@/src/lib/utils";

// ─── Validation schema ────────────────────────────────────────────────────────

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required.")
    .email("Please enter a valid email."),
  password: z
    .string()
    .min(1, "Password is required.")
    .min(6, "Password must be at least 6 characters."),
  rememberMe: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

// ─── Demo accounts hint ───────────────────────────────────────────────────────

const DEMO_HINTS = [
  { role: "Admin",   email: "admin@igirerwanda.org",   password: "Admin123!"   },
  { role: "Trainer", email: "trainer@igirerwanda.org", password: "Trainer123!" },
  { role: "Student", email: "student@igirerwanda.org", password: "Student123!" },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [showForgot, setShowForgot] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { rememberMe: false },
  });

  // Destructure password registration to control `type` independently.
  // If we spread {...register("password")} directly, React Hook Form
  // injects type="text" internally which overrides our showPassword toggle.
  const { ref: passwordRef, name: passwordName, onChange: passwordOnChange, onBlur: passwordOnBlur } =
    register("password");

  const onSubmit = (data: LoginFormData) => {
    setServerError(null);
    startTransition(async () => {
      const result = await loginAction(data.email, data.password);
      if ("error" in result) {
        setServerError(result.error);
        return;
      }
      // Client-side navigation after successful auth cookie is set
      router.push(result.redirectTo);
      router.refresh(); // ensure server components re-read the session cookie
    });
  };

  // ─── Forgot password view ──────────────────────────────────────────────────

  if (showForgot) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex flex-col items-center gap-2 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600">
              <GraduationCap className="h-7 w-7 text-white" />
            </span>
            <h1 className="text-2xl font-bold text-gray-900">Reset Password</h1>
            <p className="text-sm text-gray-500">
              Enter your email and we will send you a reset link.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">
                  Email address
                </label>
                <input
                  type="email"
                  defaultValue={getValues("email")}
                  placeholder="you@igirerwanda.org"
                  className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              {/* NOTE: This button is a frontend placeholder.
                  Real password reset requires a backend endpoint:
                  POST /api/auth/forgot-password → email link → /reset-password?token=... */}
              <button
                type="button"
                className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={() => {
                  alert("Password reset email sent! (demo — no backend connected yet)");
                  setShowForgot(false);
                }}
              >
                Send Reset Link
              </button>

              <button
                type="button"
                onClick={() => setShowForgot(false)}
                className="text-center text-sm text-indigo-600 hover:underline"
              >
                ← Back to Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ─── Main login view ───────────────────────────────────────────────────────

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm">

        {/* Logo + title */}
        <div className="mb-8 flex flex-col items-center gap-2 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600">
            <GraduationCap className="h-7 w-7 text-white" />
          </span>
          <h1 className="text-2xl font-bold text-gray-900">Igire Rwanda</h1>
          <p className="text-sm text-gray-500">Student Management System</p>
        </div>

        {/* Login form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm"
        >
          {/* Server-side error banner */}
          {serverError && (
            <div
              role="alert"
              className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              {serverError}
            </div>
          )}

          {/* Email field */}
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@igirerwanda.org"
              autoComplete="email"
              aria-invalid={!!errors.email}
              className={cn(
                "block w-full rounded-lg border bg-white px-3 py-2 text-sm text-gray-900",
                "placeholder:text-gray-400",
                "focus:outline-none focus:ring-1",
                errors.email
                  ? "border-red-400 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              )}
              {...register("email")}
            />
            {errors.email && (
              <p className="text-xs text-red-600" role="alert">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password field with show/hide toggle */}
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              {/*
               * We destructure register("password") above and pass ref, name,
               * onChange, onBlur separately. This lets us control `type`
               * independently — spreading {...register("password")} directly
               * can override the dynamic type with a static value.
               */}
              <input
                id="password"
                name={passwordName}
                ref={passwordRef}
                onChange={passwordOnChange}
                onBlur={passwordOnBlur}
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                autoComplete="current-password"
                aria-invalid={!!errors.password}
                className={cn(
                  "block w-full rounded-lg border bg-white px-3 py-2 pr-10 text-sm text-gray-900",
                  "placeholder:text-gray-400",
                  "focus:outline-none focus:ring-1",
                  errors.password
                    ? "border-red-400 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                )}
              />

              {/* Eye toggle button */}
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 focus:outline-none"
                aria-label={showPassword ? "Hide password" : "Show password"}
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-red-600" role="alert">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Remember me + Forgot password */}
          <div className="flex items-center justify-between">
            <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-600">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                {...register("rememberMe")}
              />
              Remember me
            </label>
            <button
              type="button"
              onClick={() => setShowForgot(true)}
              className="text-sm font-medium text-indigo-600 hover:underline"
            >
              Forgot password?
            </button>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={isPending}
            className={cn(
              "mt-1 flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5",
              "bg-indigo-600 text-sm font-semibold text-white",
              "hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
              "disabled:cursor-not-allowed disabled:opacity-60 transition-colors"
            )}
          >
            {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
            {isPending ? "Signing in…" : "Sign in"}
          </button>
        </form>

        {/* Demo credentials — clearly labelled as demo */}
        <div className="mt-5 rounded-xl border border-gray-200 bg-white p-4">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-400">
            Demo Accounts
          </p>
          <div className="flex flex-col gap-2.5">
            {DEMO_HINTS.map(({ role, email, password }) => (
              <div key={email} className="flex items-center gap-2 text-xs">
                <span className="w-14 shrink-0 font-medium text-gray-700">{role}</span>
                <span className="flex-1 truncate text-gray-500">{email}</span>
                <span className="shrink-0 rounded bg-gray-100 px-1.5 py-0.5 font-mono text-gray-600">
                  {password}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-gray-400">
            * Demo only. No real backend connected yet.
          </p>
        </div>

      </div>
    </div>
  );
}
