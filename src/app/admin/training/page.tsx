import { Header } from "@/src/components/layout/header";
import { PageWrapper } from "@/src/components/layout/page-wrapper";
import { Badge } from "@/src/components/ui/badge";
import { Card, CardContent } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { mockCourses, mockTrainers } from "@/src/data/mock-data";
import { formatDate } from "@/src/lib/utils";
import { BookOpen, Plus } from "lucide-react";

const statusVariant = {
  upcoming: "info",
  ongoing: "success",
  completed: "default",
} as const;

export default function AdminTrainingPage() {
  const trainerById = Object.fromEntries(mockTrainers.map((t) => [t.id, t.name]));

  return (
    <>
      <Header title="Training" userName="Alice Uwimana" />
      <PageWrapper>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium text-gray-700">
              {mockCourses.length} courses
            </h2>
            <Button size="sm">
              <Plus className="h-4 w-4" />
              New Course
            </Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {mockCourses.map((course) => (
              <Card key={course.id} className="flex flex-col">
                <CardContent className="flex flex-1 flex-col gap-3 pt-6">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50">
                      <BookOpen className="h-5 w-5 text-indigo-600" />
                    </div>
                    <Badge
                      label={course.status}
                      variant={statusVariant[course.status]}
                    />
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">
                      {course.title}
                    </h3>
                    <p className="mt-1 text-xs text-gray-500 line-clamp-2">
                      {course.description}
                    </p>
                  </div>

                  <dl className="mt-auto grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-gray-500">
                    <dt>Trainer</dt>
                    <dd className="text-gray-700 font-medium truncate">
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
