import { Header } from "@/src/components/layout/header";
import { PageWrapper } from "@/src/components/layout/page-wrapper";
import { AttendanceTable } from "@/src/components/attendance/attendance-table";
import { StatCard } from "@/src/components/dashboard/stat-card";
import { mockAttendance, mockCourses } from "@/src/data/mock-data";
import { CalendarCheck, CalendarX, Clock } from "lucide-react";

const myAttendance = mockAttendance.filter((r) => r.studentId === "s1");
const courseNameById = Object.fromEntries(mockCourses.map((c) => [c.id, c.title]));

const present = myAttendance.filter((r) => r.status === "present").length;
const absent = myAttendance.filter((r) => r.status === "absent").length;
const late = myAttendance.filter((r) => r.status === "late").length;
const rate = myAttendance.length
  ? Math.round((present / myAttendance.length) * 100)
  : 0;

export default function StudentAttendancePage() {
  return (
    <>
      <Header title="My Attendance" userName="Eric Manzi" />
      <PageWrapper>
        <div className="flex flex-col gap-6">
          {/* Summary */}
          <div className="grid gap-4 sm:grid-cols-3">
            <StatCard
              title="Present"
              value={`${present} (${rate}%)`}
              icon={CalendarCheck}
              color="green"
            />
            <StatCard title="Absent" value={absent} icon={CalendarX} color="red" />
            <StatCard title="Late" value={late} icon={Clock} color="yellow" />
          </div>

          <AttendanceTable
            records={myAttendance}
            courseNameById={courseNameById}
          />
        </div>
      </PageWrapper>
    </>
  );
}
