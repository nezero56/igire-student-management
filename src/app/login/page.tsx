"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "@/src/lib/validations";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { GraduationCap } from "lucide-react";
import { useRouter } from "next/navigation";

// Demo credentials per role — replace with real auth later
const DEMO_ACCOUNTS: Record<string, { role: string; redirect: string }> = {
  "alice@igire.rw": { role: "Admin", redirect: "/admin/dashboard" },
  "jp@igire.rw": { role: "Trainer", redirect: "/trainer/dashboard" },
  "eric@igire.rw": { role: "Student", redirect: "/student/dashboard" },
};

export default function LoginPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    await new Promise((r) => setTimeout(r, 600)); // simulate network
    const account = DEMO_ACCOUNTS[data.email];
    if (!account) {
      setError("email", { message: "No account found with this email" });
      return;
    }
    router.push(account.redirect);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="mb-8 flex flex-col items-center gap-2 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600">
            <GraduationCap className="h-7 w-7 text-white" />
          </span>
          <h1 className="text-2xl font-bold text-gray-900">Igire</h1>
          <p className="text-sm text-gray-500">Sign in to your account</p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm"
        >
          <Input
            id="email"
            label="Email address"
            type="email"
            placeholder="you@igire.rw"
            autoComplete="email"
            error={errors.email?.message}
            {...register("email")}
          />
          <Input
            id="password"
            label="Password"
            type="password"
            placeholder="••••••••"
            autoComplete="current-password"
            error={errors.password?.message}
            {...register("password")}
          />

          <Button type="submit" isLoading={isSubmitting} className="mt-2 w-full">
            Sign in
          </Button>
        </form>

        {/* Demo hint */}
        <p className="mt-4 text-center text-xs text-gray-400">
          Demo: alice@igire.rw · jp@igire.rw · eric@igire.rw (any password)
        </p>
      </div>
    </div>
  );
}
