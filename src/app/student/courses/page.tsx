import { Header } from "@/src/components/layout/header";
import { PageWrapper } from "@/src/components/layout/page-wrapper";
import { Card, CardContent } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { mockCourses, mockTrainers } from "@/src/data/mock-data";
import { formatDate } from "@/src/lib/utils";
import { BookOpen } from "lucide-react";

// Student s1 is enrolled in c1
const myCourses = mockCourses.filter((c) => c.id === "c1");
const trainerById = Object.fromEntries(mockTrainers.map((t) => [t.id, t.name]));

const statusVariant = {
  upcoming: "info",
  ongoing: "success",
  completed: "default",
} as const;

export default function StudentCoursesPage() {
  return (
    <>
      <Header title="My Courses" userName="Eric Manzi" />
      <PageWrapper>
        <div className="flex flex-col gap-4">
          <p className="text-sm text-gray-500">{myCourses.length} enrolled course(s)</p>
          <div className="grid gap-4 sm:grid-cols-2">
            {myCourses.map((course) => (
              <Card key={course.id}>
                <CardContent className="flex flex-col gap-4 pt-6">
                  <div className="flex items-start gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50">
                      <BookOpen className="h-5 w-5 text-indigo-600" />
                    </span>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-sm font-semibold text-gray-900">{course.title}</h3>
                        <Badge
                          label={course.status}
                          variant={statusVariant[course.status]}
                        />
                      </div>
                      <p className="mt-1 text-xs text-gray-500">{course.description}</p>
                    </div>
                  </div>
                  <dl className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-gray-500">
                    <dt>Trainer</dt>
                    <dd className="text-gray-700 font-medium">
                      {trainerById[course.trainerId] ?? "—"}
                    </dd>
                    <dt>Duration</dt>
                    <dd className="text-gray-700">{course.duration}</dd>
                    <dt>Start</dt>
                    <dd className="text-gray-700">{formatDate(course.startDate)}</dd>
                    <dt>End</dt>
                    <dd className="text-gray-700">{formatDate(course.endDate)}</dd>
                  </dl>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </PageWrapper>
    </>
  );
}
