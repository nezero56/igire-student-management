import { z } from "zod";

// ─── Auth ─────────────────────────────────────────────────────────────────────

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

// ─── Student ──────────────────────────────────────────────────────────────────

export const studentSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Enter a valid phone number"),
  cohort: z.string().min(1, "Cohort is required"),
  program: z.string().min(1, "Program is required"),
  trainerId: z.string().min(1, "Trainer is required"),
});

export type StudentFormData = z.infer<typeof studentSchema>;

// ─── Assignment ───────────────────────────────────────────────────────────────

export const assignmentSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  courseId: z.string().min(1, "Course is required"),
  dueDate: z.string().min(1, "Due date is required"),
  maxScore: z.coerce.number().min(1).max(1000),
});

export type AssignmentFormData = z.infer<typeof assignmentSchema>;

// ─── Attendance ───────────────────────────────────────────────────────────────

export const attendanceSchema = z.object({
  studentId: z.string().min(1, "Student is required"),
  courseId: z.string().min(1, "Course is required"),
  date: z.string().min(1, "Date is required"),
  status: z.enum(["present", "absent", "late"]),
  notes: z.string().optional(),
});

export type AttendanceFormData = z.infer<typeof attendanceSchema>;
