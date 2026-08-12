"use client";

import { useState } from "react";
import { Header } from "@/src/components/layout/header";
import { PageWrapper } from "@/src/components/layout/page-wrapper";
import { StudentsTable } from "@/src/components/students/students-table";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { mockStudents } from "@/src/data/mock-data";
import { UserPlus, Search } from "lucide-react";
import type { Student } from "@/src/types";

export default function AdminStudentsPage() {
  const [search, setSearch] = useState("");

  const filtered = mockStudents.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase()) ||
      s.program.toLowerCase().includes(search.toLowerCase())
  );

  const handleEdit = (student: Student) => {
    // TODO: open edit modal
    console.log("edit", student);
  };

  const handleView = (student: Student) => {
    // TODO: navigate or open detail panel
    console.log("view", student);
  };

  return (
    <>
      <Header title="Students" userName="Alice Uwimana" />
      <PageWrapper>
        <div className="flex flex-col gap-4">
          {/* Toolbar */}
          <div className="flex items-center justify-between gap-4">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search students…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="block w-full rounded-lg border border-gray-300 bg-white py-2 pl-9 pr-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
            <Button size="sm">
              <UserPlus className="h-4 w-4" />
              Add Student
            </Button>
          </div>

          <StudentsTable
            students={filtered}
            onEdit={handleEdit}
            onView={handleView}
          />

          <p className="text-xs text-gray-400">
            Showing {filtered.length} of {mockStudents.length} students
          </p>
        </div>
      </PageWrapper>
    </>
  );
}
