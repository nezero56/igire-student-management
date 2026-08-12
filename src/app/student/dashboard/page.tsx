import { Header } from "@/src/components/layout/header";
import { PageWrapper } from "@/src/components/layout/page-wrapper";
import { StatCard } from "@/src/components/dashboard/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { mockStudents, mockAttendance, mockSubmissions, mockPerformance, mockCourses } from "@/src/data/mock-data";
import { CalendarCheck, ClipboardList, BarChart2, BookOpen } from "lucide-react";
import { formatRate } from "@/src/lib/utils";

const me = mockStudents.find((s) => s.id === "s1")!;
const myAttendance = mockAttendance.filter((r) => r.studentId === "s1");
const presentCount = myAttendance.filter((r) => r.status === "present").length;
const attendanceRate = myAttendance.length
  ? (presentCount / myAttendance.length) * 100
  : 0;
const mySubmissions = mockSubmissions.filter((sub) => sub.studentId === "s1");
const myPerf = mockPerformance.find((p) => p.studentId === "s1");
const myCourse = mockCourses.find((c) => c.id === "c1");

export default function StudentDashboardPage() {
  return (
    <>
      <Header title="Dashboard" userName={me.name} />
      <PageWrapper>
        <div className="flex flex-col gap-6">
          {/* Welcome banner */}
          <div className="rounded-xl bg-indigo-600 px-6 py-5 text-white">
            <p className="text-sm font-medium opacity-75">Welcome back 👋</p>
            <h2 className="mt-1 text-xl font-bold">{me.name}</h2>
            <p className="mt-0.5 text-sm opacity-75">
              {me.program} · {me.cohort}
            </p>
          </div>

          {/* Stats */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Attendance Rate"
              value={formatRate(attendanceRate)}
              icon={CalendarCheck}
              color="green"
            />
            <StatCard
              title="Assignments Done"
              value={`${mySubmissions.length}`}
              icon={ClipboardList}
              color="yellow"
            />
            <StatCard
              title="Current Grade"
              value={myPerf?.grade ?? "N/A"}
              icon={BarChart2}
              color="indigo"
            />
            <StatCard
              title="Active Course"
              value={myCourse?.title ? "1" : "0"}
              icon={BookOpen}
              color="blue"
            />
          </div>

          {/* Current course snapshot */}
          {myCourse && (
            <Card className="max-w-md">
              <CardHeader>
                <CardTitle>Current Course</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2">
                  <p className="text-sm font-semibold text-gray-900">{myCourse.title}</p>
                  <p className="text-xs text-gray-500">{myCourse.description}</p>
                  <Badge label={myCourse.status} variant="success" />
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </PageWrapper>
    </>
  );
}
