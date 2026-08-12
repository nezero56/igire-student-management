import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { formatDate } from "@/src/lib/utils";
import { CalendarDays, ClipboardList } from "lucide-react";
import type { Assignment } from "@/src/types";

interface AssignmentsListProps {
  assignments: Assignment[];
  courseNameById?: Record<string, string>;
  onView?: (assignment: Assignment) => void;
}

export function AssignmentsList({
  assignments,
  courseNameById = {},
  onView,
}: AssignmentsListProps) {
  if (assignments.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-gray-200 bg-white p-12 text-center">
        <ClipboardList className="mx-auto h-10 w-10 text-gray-300" />
        <p className="mt-2 text-sm text-gray-500">No assignments yet.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {assignments.map((assignment) => (
        <Card key={assignment.id} className="flex flex-col">
          <CardContent className="flex flex-1 flex-col gap-3 pt-6">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-sm font-semibold text-gray-900 leading-snug">
                {assignment.title}
              </h3>
              <Badge label={`${assignment.maxScore} pts`} variant="secondary" />
            </div>

            <p className="text-xs text-gray-500 line-clamp-2">
              {assignment.description}
            </p>

            <div className="mt-auto flex flex-col gap-1 text-xs text-gray-500">
              <span className="font-medium text-gray-700">
                {courseNameById[assignment.courseId] ?? assignment.courseId}
              </span>
              <span className="flex items-center gap-1">
                <CalendarDays className="h-3.5 w-3.5" />
                Due {formatDate(assignment.dueDate)}
              </span>
            </div>

            {onView && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onView(assignment)}
                className="mt-2 w-full"
              >
                View Details
              </Button>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
