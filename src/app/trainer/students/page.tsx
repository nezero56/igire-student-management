import { Header } from "@/src/components/layout/header";
import { PageWrapper } from "@/src/components/layout/page-wrapper";
import { StudentsTable } from "@/src/components/students/students-table";
import { mockStudents } from "@/src/data/mock-data";

const myStudents = mockStudents.filter((s) => s.trainerId === "t1");

export default function TrainerStudentsPage() {
  return (
    <>
      <Header title="My Students" userName="Jean Paul Nkurunziza" />
      <PageWrapper>
        <div className="flex flex-col gap-4">
          <p className="text-sm text-gray-500">{myStudents.length} students assigned to you</p>
          <StudentsTable students={myStudents} />
        </div>
      </PageWrapper>
    </>
  );
}
