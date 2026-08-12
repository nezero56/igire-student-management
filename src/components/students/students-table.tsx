import { Badge } from "@/src/components/ui/badge";
import { Avatar } from "@/src/components/ui/avatar";
import { Button } from "@/src/components/ui/button";
import { formatDate } from "@/src/lib/utils";
import type { Student } from "@/src/types";

interface StudentsTableProps {
  students: Student[];
  onEdit?: (student: Student) => void;
  onView?: (student: Student) => void;
}

const statusVariant = {
  active: "success",
  inactive: "warning",
  graduated: "info",
} as const;

export function StudentsTable({ students, onEdit, onView }: StudentsTableProps) {
  if (students.length === 0) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-12 text-center">
        <p className="text-sm text-gray-500">No students found.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
              Student
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
              Program
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
              Cohort
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
              Enrolled
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
              Status
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wide text-gray-500">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 bg-white">
          {students.map((student) => (
            <tr key={student.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <Avatar name={student.name} size="sm" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{student.name}</p>
                    <p className="text-xs text-gray-500">{student.email}</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-700">{student.program}</td>
              <td className="px-6 py-4 text-sm text-gray-700">{student.cohort}</td>
              <td className="px-6 py-4 text-sm text-gray-500">{formatDate(student.enrolledAt)}</td>
              <td className="px-6 py-4">
                <Badge
                  label={student.status}
                  variant={statusVariant[student.status]}
                />
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-2">
                  {onView && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onView(student)}
                    >
                      View
                    </Button>
                  )}
                  {onEdit && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit(student)}
                    >
                      Edit
                    </Button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
