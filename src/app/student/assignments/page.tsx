import { Header } from "@/src/components/layout/header";
import { PageWrapper } from "@/src/components/layout/page-wrapper";
import { Card, CardContent } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { mockAssignments, mockSubmissions, mockCourses } from "@/src/data/mock-data";
import { formatDate } from "@/src/lib/utils";
import { CalendarDays, Star } from "lucide-react";

const courseNameById = Object.fromEntries(mockCourses.map((c) => [c.id, c.title]));
const mySubmissions = mockSubmissions.filter((sub) => sub.studentId === "s1");
const submissionByAssignmentId = Object.fromEntries(
  mySubmissions.map((sub) => [sub.assignmentId, sub])
);

const statusVariant = {
  pending: "default",
  submitted: "info",
  graded: "success",
} as const;

export default function StudentAssignmentsPage() {
  return (
    <>
      <Header title="My Assignments" userName="Eric Manzi" />
      <PageWrapper>
        <div className="flex flex-col gap-4">
          <p className="text-sm text-gray-500">{mockAssignments.length} assignments</p>
          <div className="grid gap-4 sm:grid-cols-2">
            {mockAssignments.map((assignment) => {
              const submission = submissionByAssignmentId[assignment.id];
              const status = submission?.status ?? "pending";
              return (
                <Card key={assignment.id}>
                  <CardContent className="flex flex-col gap-3 pt-6">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-sm font-semibold text-gray-900">
                        {assignment.title}
                      </h3>
                      <Badge
                        label={status}
                        variant={statusVariant[status as keyof typeof statusVariant]}
                      />
                    </div>
                    <p className="text-xs text-gray-500">{assignment.description}</p>
                    <div className="flex flex-col gap-1 text-xs text-gray-500">
                      <span>{courseNameById[assignment.courseId] ?? assignment.courseId}</span>
                      <span className="flex items-center gap-1">
                        <CalendarDays className="h-3.5 w-3.5" />
                        Due {formatDate(assignment.dueDate)}
                      </span>
                    </div>
                    {submission?.score !== undefined && (
                      <div className="flex items-center gap-1.5 text-sm font-semibold text-indigo-700">
                        <Star className="h-4 w-4" />
                        Score: {submission.score}/{assignment.maxScore}
                        {submission.feedback && (
                          <span className="ml-1 text-xs font-normal text-gray-500">
                            — {submission.feedback}
                          </span>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </PageWrapper>
    </>
  );
}
