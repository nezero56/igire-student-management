import { redirect } from "next/navigation";
import { getSession } from "@/src/lib/auth";
import { Sidebar } from "@/src/components/layout/sidebar";

export default async function FacilitatorLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();

  if (!session || session.role !== "trainer") {
    redirect("/login");
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar role="trainer" userName={session.name} />
      <div className="flex flex-1 flex-col overflow-hidden">{children}</div>
    </div>
  );
}
