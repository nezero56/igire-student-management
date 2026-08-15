"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { studentSchema, type StudentFormData } from "@/src/lib/validations";
import { Input } from "@/src/components/ui/input";
import { Select } from "@/src/components/ui/select";
import { Button } from "@/src/components/ui/button";
import { X } from "lucide-react";

interface RegisterStudentModalProps {
  onClose: () => void;
  onSubmit: (data: StudentFormData) => void;
}

const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];

const programOptions = [
  { value: "Web Development", label: "Web Development" },
  { value: "Data Science", label: "Data Science" },
  { value: "UI/UX Design", label: "UI/UX Design" },
  { value: "Cybersecurity", label: "Cybersecurity" },
  { value: "Mobile Development", label: "Mobile Development" },
];

const statusOptions = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "graduated", label: "Graduated" },
];

export function RegisterStudentModal({ onClose, onSubmit }: RegisterStudentModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<StudentFormData>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      registrationDate: new Date().toISOString().split("T")[0],
      status: "active",
    },
  });

  const handleFormSubmit = async (data: StudentFormData) => {
    await new Promise((r) => setTimeout(r, 400)); // simulate async
    onSubmit(data);
    onClose();
  };

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Panel */}
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
          <div>
            <h2 id="modal-title" className="text-lg font-semibold text-gray-900">
              Student Registration
            </h2>
            <p className="text-sm text-gray-500">Fill in the details to register a new student</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
          <div className="grid grid-cols-1 gap-4 px-6 py-5 sm:grid-cols-2">

            {/* Full Name */}
            <div className="sm:col-span-2">
              <Input
                id="name"
                label="Full Name"
                placeholder="e.g. Eric Manzi"
                error={errors.name?.message}
                {...register("name")}
              />
            </div>

            {/* Student ID */}
            <Input
              id="studentId"
              label="Student ID"
              placeholder="e.g. IGR-2024-001"
              error={errors.studentId?.message}
              {...register("studentId")}
            />

            {/* Email */}
            <Input
              id="email"
              label="Email"
              type="email"
              placeholder="student@igire.rw"
              error={errors.email?.message}
              {...register("email")}
            />

            {/* Phone */}
            <Input
              id="phone"
              label="Phone"
              type="tel"
              placeholder="+250 780 000 000"
              error={errors.phone?.message}
              {...register("phone")}
            />

            {/* Gender */}
            <Select
              id="gender"
              label="Gender"
              placeholder="Select gender"
              options={genderOptions}
              error={errors.gender?.message}
              {...register("gender")}
            />

            {/* Training Program */}
            <Select
              id="program"
              label="Training Program"
              placeholder="Select program"
              options={programOptions}
              error={errors.program?.message}
              {...register("program")}
            />

            {/* Registration Date */}
            <Input
              id="registrationDate"
              label="Registration Date"
              type="date"
              error={errors.registrationDate?.message}
              {...register("registrationDate")}
            />

            {/* Status */}
            <Select
              id="status"
              label="Status"
              placeholder="Select status"
              options={statusOptions}
              error={errors.status?.message}
              {...register("status")}
            />

          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 border-t border-gray-100 px-6 py-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" isLoading={isSubmitting}>
              Register Student
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
