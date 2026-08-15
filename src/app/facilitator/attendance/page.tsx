import { Header } from "@/src/components/layout/header";
import { PageWrapper } from "@/src/components/layout/page-wrapper";
import { AttendanceTable } from "@/src/components/attendance/attendance-table";
import { Button } from "@/src/components/ui/button";
import { mockAttendance, mockStudents, mockCourses } from "@/src/data/mock-data";
import { Plus } from "lucide-react";

const myStudentIds = new Set(
  mockStudents.filter((s) => s.trainerId === "t1").map((s) => s.id)
);
const myAttendance = mockAttendance.filter((r) => myStudentIds.has(r.studentId));
const studentNameById = Object.fromEntries(mockStudents.map((s) => [s.id, s.name]));
const courseNameById = Object.fromEntries(mockCourses.map((c) => [c.id, c.title]));

export default function FacilitatorAttendancePage() {
  return (
    <>
      <Header title="Attendance" userName="Jean Paul Nkurunziza" />
      <PageWrapper>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">{myAttendance.length} records</p>
            <Button size="sm">
              <Plus className="h-4 w-4" />
              Mark Attendance
            </Button>
          </div>
          <AttendanceTable
            records={myAttendance}
            studentNameById={studentNameById}
            courseNameById={courseNameById}
          />
        </div>
      </PageWrapper>
    </>
  );
}
