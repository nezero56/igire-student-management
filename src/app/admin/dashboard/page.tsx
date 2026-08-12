import { Header } from "@/src/components/layout/header";
import { PageWrapper } from "@/src/components/layout/page-wrapper";
import { StatCard } from "@/src/components/dashboard/stat-card";
import { RecentActivity } from "@/src/components/dashboard/recent-activity";
import { mockDashboardStats, mockAttendance, mockStudents } from "@/src/data/mock-data";
import { Users, BookOpen, CalendarCheck, ClipboardList, TrendingUp, UserCheck } from "lucide-react";

const recentActivity = mockAttendance.slice(0, 5).map((r) => {
  const student = mockStudents.find((s) => s.id === r.studentId);
  return {
    id: r.id,
    studentName: student?.name ?? r.studentId,
    action: `Attendance marked`,
    date: r.date,
    status: r.status,
  };
});

export default function AdminDashboardPage() {
  const stats = mockDashboardStats;

  return (
    <>
      <Header title="Dashboard" userName="Alice Uwimana" />
      <PageWrapper>
        <div className="flex flex-col gap-6">
          {/* Stats grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <StatCard
              title="Total Students"
              value={stats.totalStudents}
              icon={Users}
              color="indigo"
              trend={{ value: 12, label: "this month" }}
            />
            <StatCard
              title="Active Students"
              value={stats.activeStudents}
              icon={UserCheck}
              color="green"
            />
            <StatCard
              title="Total Trainers"
              value={stats.totalTrainers}
              icon={TrendingUp}
              color="blue"
            />
            <StatCard
              title="Total Courses"
              value={stats.totalCourses}
              icon={BookOpen}
              color="yellow"
            />
            <StatCard
              title="Attendance Rate"
              value={`${stats.attendanceRate}%`}
              icon={CalendarCheck}
              color="green"
            />
            <StatCard
              title="Pending Assignments"
              value={stats.pendingAssignments}
              icon={ClipboardList}
              color="red"
            />
          </div>

          {/* Recent activity */}
          <div className="max-w-2xl">
            <RecentActivity items={recentActivity as Parameters<typeof RecentActivity>[0]["items"]} />
          </div>
        </div>
      </PageWrapper>
    </>
  );
}
