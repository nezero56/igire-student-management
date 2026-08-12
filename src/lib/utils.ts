import { type ClassValue, clsx } from "clsx";

/**
 * Merges Tailwind class names, resolving conflicts via clsx.
 * Keeps components clean — no string concatenation needed.
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/** Format a date string to a readable locale format */
export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-RW", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/** Calculate attendance rate as a percentage string */
export function formatRate(rate: number): string {
  return `${rate.toFixed(1)}%`;
}

/** Map a grade letter to a Tailwind color class */
export function gradeColor(grade: string): string {
  const map: Record<string, string> = {
    A: "text-green-600",
    B: "text-blue-600",
    C: "text-yellow-600",
    D: "text-orange-500",
    F: "text-red-600",
    "N/A": "text-gray-400",
  };
  return map[grade] ?? "text-gray-500";
}

/** Capitalize the first letter of a string */
export function capitalize(str: string): string {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/** Get initials from a full name (up to 2 letters) */
export function getInitials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}
