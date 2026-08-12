"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/src/lib/utils";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  ClipboardList,
  FileText,
  BarChart2,
  GraduationCap,
  CalendarCheck,
  LogOut,
} from "lucide-react";
import type { Role } from "@/src/types";

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const adminNav: NavItem[] = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Students", href: "/admin/students", icon: Users },
  { label: "Training", href: "/admin/training", icon: BookOpen },
  { label: "Attendance", href: "/admin/attendance", icon: CalendarCheck },
  { label: "Assignments", href: "/admin/assignments", icon: ClipboardList },
  { label: "Performance", href: "/admin/performance", icon: BarChart2 },
  { label: "Reports", href: "/admin/reports", icon: FileText },
];

const trainerNav: NavItem[] = [
  { label: "Dashboard", href: "/trainer/dashboard", icon: LayoutDashboard },
  { label: "Students", href: "/trainer/students", icon: Users },
  { label: "Attendance", href: "/trainer/attendance", icon: CalendarCheck },
  { label: "Assignments", href: "/trainer/assignments", icon: ClipboardList },
  { label: "Performance", href: "/trainer/performance", icon: BarChart2 },
];

const studentNav: NavItem[] = [
  { label: "Dashboard", href: "/student/dashboard", icon: LayoutDashboard },
  { label: "Profile", href: "/student/profile", icon: Users },
  { label: "Courses", href: "/student/courses", icon: GraduationCap },
  { label: "Attendance", href: "/student/attendance", icon: CalendarCheck },
  { label: "Assignments", href: "/student/assignments", icon: ClipboardList },
  { label: "Performance", href: "/student/performance", icon: BarChart2 },
];

const navByRole: Record<Role, NavItem[]> = {
  admin: adminNav,
  trainer: trainerNav,
  student: studentNav,
};

interface SidebarProps {
  role: Role;
  userName: string;
}

export function Sidebar({ role, userName }: SidebarProps) {
  const pathname = usePathname();
  const navItems = navByRole[role];

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-gray-200 bg-white">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 border-b border-gray-200 px-6">
        <span className="text-2xl font-bold text-indigo-600">Igire</span>
        <span className="text-sm text-gray-500 capitalize">{role}</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-0.5 px-3">
          {navItems.map(({ label, href, icon: Icon }) => {
            const active = pathname.startsWith(href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    active
                      ? "bg-indigo-50 text-indigo-700"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User / Logout */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-900">{userName}</span>
            <span className="text-xs text-gray-500 capitalize">{role}</span>
          </div>
          <Link
            href="/login"
            className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
            aria-label="Sign out"
          >
            <LogOut className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </aside>
  );
}
