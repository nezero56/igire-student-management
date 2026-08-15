import { Header } from "@/src/components/layout/header";
import { PageWrapper } from "@/src/components/layout/page-wrapper";
import { StatCard } from "@/src/components/dashboard/stat-card";
import { RecentActivity } from "@/src/components/dashboard/recent-activity";
import { mockStudents, mockAttendance, mockAssignments } from "@/src/data/mock-data";
import { Users, ClipboardList, CalendarCheck, BarChart2 } from "lucide-react";

const myStudents = mockStudents.filter((s) => s.trainerId === "t1");
const myAttendance = mockAttendance.filter((r) =>
  myStudents.some((s) => s.id === r.studentId)
);

const recentActivity = myAttendance.slice(0, 4).map((r) => {
  const student = myStudents.find((s) => s.id === r.studentId);
  return {
    id: r.id,
    studentName: student?.name ?? r.studentId,
    action: "Attendance recorded",
    date: r.date,
    status: r.status,
  };
});

export default function FacilitatorDashboardPage() {
  return (
    <>
      <Header title="Dashboard" userName="Jean Paul Nkurunziza" />
      <PageWrapper>
        <div className="flex flex-col gap-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard title="My Participants" value={myStudents.length} icon={Users} color="indigo" />
            <StatCard title="Assignments" value={mockAssignments.length} icon={ClipboardList} color="yellow" />
            <StatCard title="Attendance Records" value={myAttendance.length} icon={CalendarCheck} color="green" />
            <StatCard title="Avg Performance" value="82%" icon={BarChart2} color="blue" />
          </div>
          <div className="max-w-2xl">
            <RecentActivity
              items={recentActivity as Parameters<typeof RecentActivity>[0]["items"]}
            />
          </div>
        </div>
      </PageWrapper>
    </>
  );
}
