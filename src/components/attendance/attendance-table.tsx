import { Badge } from "@/src/components/ui/badge";
import { formatDate } from "@/src/lib/utils";
import type { AttendanceRecord } from "@/src/types";

interface AttendanceTableProps {
  records: AttendanceRecord[];
  studentNameById?: Record<string, string>;
  courseNameById?: Record<string, string>;
}

const statusVariant = {
  present: "success",
  absent: "danger",
  late: "warning",
} as const;

export function AttendanceTable({
  records,
  studentNameById = {},
  courseNameById = {},
}: AttendanceTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
              Student
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
              Course
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
              Notes
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 bg-white">
          {records.map((record) => (
            <tr key={record.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 text-sm font-medium text-gray-900">
                {studentNameById[record.studentId] ?? record.studentId}
              </td>
              <td className="px-6 py-4 text-sm text-gray-700">
                {courseNameById[record.courseId] ?? record.courseId}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                {formatDate(record.date)}
              </td>
              <td className="px-6 py-4">
                <Badge
                  label={record.status}
                  variant={statusVariant[record.status]}
                />
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                {record.notes ?? "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
