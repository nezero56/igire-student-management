import { Header } from "@/src/components/layout/header";
import { PageWrapper } from "@/src/components/layout/page-wrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { mockPerformance, mockCourses } from "@/src/data/mock-data";
import { gradeColor, formatRate } from "@/src/lib/utils";
import { BarChart2, CalendarCheck, ClipboardCheck } from "lucide-react";

const myPerformance = mockPerformance.filter((p) => p.studentId === "s1");
const courseById = Object.fromEntries(mockCourses.map((c) => [c.id, c]));

export default function StudentPerformancePage() {
  return (
    <>
      <Header title="My Performance" userName="Eric Manzi" />
      <PageWrapper>
        <div className="flex flex-col gap-6 max-w-2xl">
          {myPerformance.map((record) => {
            const course = courseById[record.courseId];
            return (
              <Card key={record.courseId}>
                <CardHeader>
                  <CardTitle>{course?.title ?? record.courseId}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                    {/* Grade */}
                    <div className="flex flex-col items-center gap-1 rounded-xl bg-gray-50 p-4">
                      <BarChart2 className="h-5 w-5 text-gray-400" />
                      <span
                        className={`text-3xl font-bold ${gradeColor(record.grade)}`}
                      >
                        {record.grade}
                      </span>
                      <span className="text-xs text-gray-500">Grade</span>
                    </div>
                    {/* Avg score */}
                    <div className="flex flex-col items-center gap-1 rounded-xl bg-gray-50 p-4">
                      <BarChart2 className="h-5 w-5 text-gray-400" />
                      <span className="text-3xl font-bold text-gray-900">
                        {record.averageScore}
                      </span>
                      <span className="text-xs text-gray-500">Avg Score</span>
                    </div>
                    {/* Attendance */}
                    <div className="flex flex-col items-center gap-1 rounded-xl bg-gray-50 p-4">
                      <CalendarCheck className="h-5 w-5 text-gray-400" />
                      <span className="text-3xl font-bold text-gray-900">
                        {formatRate(record.attendanceRate)}
                      </span>
                      <span className="text-xs text-gray-500">Attendance</span>
                    </div>
                    {/* Assignments */}
                    <div className="flex flex-col items-center gap-1 rounded-xl bg-gray-50 p-4">
                      <ClipboardCheck className="h-5 w-5 text-gray-400" />
                      <span className="text-3xl font-bold text-gray-900">
                        {record.assignmentsCompleted}/{record.assignmentsTotal}
                      </span>
                      <span className="text-xs text-gray-500">Tasks Done</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </PageWrapper>
    </>
  );
}
