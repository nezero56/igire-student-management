// ─── User & Auth ─────────────────────────────────────────────────────────────

export type Role = "admin" | "trainer" | "student";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
  createdAt: string;
}

// ─── Student ─────────────────────────────────────────────────────────────────

export interface Student {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  cohort: string;
  program: string;
  enrolledAt: string;
  status: "active" | "inactive" | "graduated";
  trainerId: string;
}

// ─── Trainer ─────────────────────────────────────────────────────────────────

export interface Trainer {
  id: string;
  userId: string;
  name: string;
  email: string;
  specialization: string;
  assignedStudents: string[];
}

// ─── Training / Course ────────────────────────────────────────────────────────

export interface Course {
  id: string;
  title: string;
  description: string;
  trainerId: string;
  duration: string; // e.g. "12 weeks"
  startDate: string;
  endDate: string;
  status: "upcoming" | "ongoing" | "completed";
}

// ─── Attendance ───────────────────────────────────────────────────────────────

export interface AttendanceRecord {
  id: string;
  studentId: string;
  courseId: string;
  date: string;
  status: "present" | "absent" | "late";
  notes?: string;
}

// ─── Assignment ───────────────────────────────────────────────────────────────

export interface Assignment {
  id: string;
  title: string;
  description: string;
  courseId: string;
  dueDate: string;
  maxScore: number;
  createdBy: string; // trainerId
}

export interface AssignmentSubmission {
  id: string;
  assignmentId: string;
  studentId: string;
  submittedAt: string;
  score?: number;
  feedback?: string;
  status: "pending" | "submitted" | "graded";
}

// ─── Performance ──────────────────────────────────────────────────────────────

export interface PerformanceRecord {
  studentId: string;
  courseId: string;
  averageScore: number;
  attendanceRate: number;
  assignmentsCompleted: number;
  assignmentsTotal: number;
  grade: "A" | "B" | "C" | "D" | "F" | "N/A";
}

// ─── Report ───────────────────────────────────────────────────────────────────

export interface Report {
  id: string;
  title: string;
  type: "attendance" | "performance" | "assignment" | "cohort";
  generatedAt: string;
  generatedBy: string;
  data: unknown;
}

// ─── Dashboard Stats ──────────────────────────────────────────────────────────

export interface DashboardStats {
  totalStudents: number;
  totalTrainers: number;
  totalCourses: number;
  attendanceRate: number;
  activeStudents: number;
  pendingAssignments: number;
}
