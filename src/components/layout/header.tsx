import { Bell } from "lucide-react";
import { Avatar } from "@/src/components/ui/avatar";

interface HeaderProps {
  title: string;
  userName: string;
}

export function Header({ title, userName }: HeaderProps) {
  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
      <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
      <div className="flex items-center gap-3">
        <button
          className="relative rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
        </button>
        <Avatar name={userName} size="sm" />
      </div>
    </header>
  );
}
