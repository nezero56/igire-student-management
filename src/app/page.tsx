import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { GraduationCap } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-white px-4">
      <div className="flex flex-col items-center gap-6 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-600 shadow-lg">
          <GraduationCap className="h-9 w-9 text-white" />
        </span>

        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Igire Student Management
          </h1>
          <p className="max-w-md text-base text-gray-500">
            A unified platform for admins, trainers, and students to track
            learning, attendance, and performance.
          </p>
        </div>

        <Link href="/login">
          <Button size="lg">Get Started</Button>
        </Link>
      </div>
    </div>
  );
}
