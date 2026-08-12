import { Header } from "@/src/components/layout/header";
import { PageWrapper } from "@/src/components/layout/page-wrapper";
import { Badge } from "@/src/components/ui/badge";
import { Avatar } from "@/src/components/ui/avatar";
import { mockPerformance, mockStudents, mockCourses } from "@/src/data/mock-data";
import { gradeColor, formatRate } from "@/src/lib/utils";

export default function AdminPerformancePage() {
  const studentById = Object.fromEntries(mockStudents.map((s) => [s.id, s]));
  const courseById = Object.fromEntries(mockCourses.map((c) => [c.id, c]));

  return (
    <>
      <Header title="Performance" userName="Alice Uwimana" />
      <PageWrapper>
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {["Student", "Course", "Avg Score", "Attendance", "Assignments", "Grade"].map(
                  (h) => (
                    <th
                      key={h}
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {mockPerformance.map((record) => {
                const student = studentById[record.studentId];
                const course = courseById[record.courseId];
                return (
                  <tr
                    key={`${record.studentId}-${record.courseId}`}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar name={student?.name ?? record.studentId} size="sm" />
                        <span className="text-sm font-medium text-gray-900">
                          {student?.name ?? record.studentId}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {course?.title ?? record.courseId}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                      {record.averageScore}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {formatRate(record.attendanceRate)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {record.assignmentsCompleted}/{record.assignmentsTotal}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-sm font-bold ${gradeColor(record.grade)}`}
                      >
                        {record.grade}
                      </span>
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
