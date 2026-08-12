import { Sidebar } from "@/src/components/layout/sidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar role="admin" userName="Alice Uwimana" />
      <div className="flex flex-1 flex-col overflow-hidden">{children}</div>
    </div>
  );
}
