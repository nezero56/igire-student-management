import { Header } from "@/src/components/layout/header";
import { PageWrapper } from "@/src/components/layout/page-wrapper";
import { mockPerformance, mockStudents, mockCourses } from "@/src/data/mock-data";
import { gradeColor, formatRate } from "@/src/lib/utils";
import { Avatar } from "@/src/components/ui/avatar";

const myStudentIds = new Set(
  mockStudents.filter((s) => s.trainerId === "t1").map((s) => s.id)
);
const myPerformance = mockPerformance.filter((r) => myStudentIds.has(r.studentId));
const studentById = Object.fromEntries(mockStudents.map((s) => [s.id, s]));
const courseById = Object.fromEntries(mockCourses.map((c) => [c.id, c]));

export default function FacilitatorPerformancePage() {
  return (
    <>
      <Header title="Performance" userName="Jean Paul Nkurunziza" />
      <PageWrapper>
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {["Participant", "Course", "Avg Score", "Attendance", "Assignments", "Grade"].map((h) => (
                  <th key={h} className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {myPerformance.map((record) => {
                const student = studentById[record.studentId];
                const course = courseById[record.courseId];
                return (
                  <tr key={`${record.studentId}-${record.courseId}`} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar name={student?.name ?? record.studentId} size="sm" />
                        <span className="text-sm font-medium text-gray-900">
                          {student?.name ?? record.studentId}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">{course?.title ?? record.courseId}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">{record.averageScore}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{formatRate(record.attendanceRate)}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{record.assignmentsCompleted}/{record.assignmentsTotal}</td>
                    <td className="px-6 py-4">
                      <span className={`text-sm font-bold ${gradeColor(record.grade)}`}>{record.grade}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </PageWrapper>
    </>
  );
}
