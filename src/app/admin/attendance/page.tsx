import { Header } from "@/src/components/layout/header";
import { PageWrapper } from "@/src/components/layout/page-wrapper";
import { AttendanceTable } from "@/src/components/attendance/attendance-table";
import { mockAttendance, mockStudents, mockCourses } from "@/src/data/mock-data";

export default function AdminAttendancePage() {
  const studentNameById = Object.fromEntries(
    mockStudents.map((s) => [s.id, s.name])
  );
  const courseNameById = Object.fromEntries(
    mockCourses.map((c) => [c.id, c.title])
  );

  return (
    <>
      <Header title="Attendance" userName="Alice Uwimana" />
      <PageWrapper>
        <div className="flex flex-col gap-4">
          <p className="text-sm text-gray-500">
            {mockAttendance.length} attendance records
          </p>
          <AttendanceTable
            records={mockAttendance}
            studentNameById={studentNameById}
            courseNameById={courseNameById}
          />
        </div>
      </PageWrapper>
    </>
  );
}
