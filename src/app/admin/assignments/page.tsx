import { Header } from "@/src/components/layout/header";
import { PageWrapper } from "@/src/components/layout/page-wrapper";
import { AssignmentsList } from "@/src/components/assignments/assignments-list";
import { Button } from "@/src/components/ui/button";
import { mockAssignments, mockCourses } from "@/src/data/mock-data";
import { Plus } from "lucide-react";

export default function AdminAssignmentsPage() {
  const courseNameById = Object.fromEntries(
    mockCourses.map((c) => [c.id, c.title])
  );

  return (
    <>
      <Header title="Assignments" userName="Alice Uwimana" />
      <PageWrapper>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              {mockAssignments.length} assignments
            </p>
            <Button size="sm">
              <Plus className="h-4 w-4" />
              New Assignment
            </Button>
          </div>
          <AssignmentsList
            assignments={mockAssignments}
            courseNameById={courseNameById}
          />
        </div>
      </PageWrapper>
    </>
  );
}
