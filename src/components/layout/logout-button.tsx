"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { logoutAction } from "@/src/lib/actions";
import { LogOut } from "lucide-react";

export function LogoutButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      await logoutAction();
      router.push("/login");
      router.refresh();
    });
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isPending}
      className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50"
      aria-label="Sign out"
      title="Sign out"
    >
      <LogOut className="h-4 w-4" />
    </button>
  );
}
