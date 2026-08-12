import type {
  Student,
  Trainer,
  Course,
  AttendanceRecord,
  Assignment,
  AssignmentSubmission,
  PerformanceRecord,
  DashboardStats,
  User,
} from "@/src/types";

// ─── Users ────────────────────────────────────────────────────────────────────

export const mockUsers: User[] = [
  {
    id: "u1",
    name: "Alice Uwimana",
    email: "alice@igire.rw",
    role: "admin",
    createdAt: "2024-01-01",
  },
  {
    id: "u2",
    name: "Jean Paul Nkurunziza",
    email: "jp@igire.rw",
    role: "trainer",
    createdAt: "2024-01-05",
  },
  {
    id: "u3",
    name: "Marie Claire Ineza",
    email: "mc@igire.rw",
    role: "trainer",
    createdAt: "2024-01-05",
  },
  {
    id: "u4",
    name: "Eric Manzi",
    email: "eric@igire.rw",
    role: "student",
    createdAt: "2024-02-01",
  },
  {
    id: "u5",
    name: "Diane Ishimwe",
    email: "diane@igire.rw",
    role: "student",
    createdAt: "2024-02-01",
  },
  {
    id: "u6",
    name: "Patrick Hakizimana",
    email: "patrick@igire.rw",
    role: "student",
    createdAt: "2024-02-01",
  },
];

// ─── Trainers ─────────────────────────────────────────────────────────────────

export const mockTrainers: Trainer[] = [
  {
    id: "t1",
    userId: "u2",
    name: "Jean Paul Nkurunziza",
    email: "jp@igire.rw",
    specialization: "Web Development",
    assignedStudents: ["s1", "s2"],
  },
  {
    id: "t2",
    userId: "u3",
    name: "Marie Claire Ineza",
    email: "mc@igire.rw",
    specialization: "Data Science",
    assignedStudents: ["s3"],
  },
];

// ─── Students ─────────────────────────────────────────────────────────────────

export const mockStudents: Student[] = [
  {
    id: "s1",
    userId: "u4",
    name: "Eric Manzi",
    email: "eric@igire.rw",
    phone: "+250780000001",
    cohort: "Cohort 5",
    program: "Web Development",
    enrolledAt: "2024-02-01",
    status: "active",
    trainerId: "t1",
  },
  {
    id: "s2",
    userId: "u5",
    name: "Diane Ishimwe",
    email: "diane@igire.rw",
    phone: "+250780000002",
    cohort: "Cohort 5",
    program: "Web Development",
    enrolledAt: "2024-02-01",
    status: "active",
    trainerId: "t1",
  },
  {
    id: "s3",
    userId: "u6",
    name: "Patrick Hakizimana",
    email: "patrick@igire.rw",
    phone: "+250780000003",
    cohort: "Cohort 4",
    program: "Data Science",
    enrolledAt: "2023-09-01",
    status: "graduated",
    trainerId: "t2",
  },
];

// ─── Courses ──────────────────────────────────────────────────────────────────

export const mockCourses: Course[] = [
  {
    id: "c1",
    title: "Full Stack Web Development",
    description: "HTML, CSS, JavaScript, React, Node.js, and databases.",
    trainerId: "t1",
    duration: "16 weeks",
    startDate: "2024-02-05",
    endDate: "2024-06-01",
    status: "ongoing",
  },
  {
    id: "c2",
    title: "Data Science Fundamentals",
    description: "Python, statistics, machine learning basics.",
    trainerId: "t2",
    duration: "12 weeks",
    startDate: "2023-09-04",
    endDate: "2023-11-25",
    status: "completed",
  },
  {
    id: "c3",
    title: "UI/UX Design",
    description: "Design thinking, Figma, user research.",
    trainerId: "t1",
    duration: "8 weeks",
    startDate: "2024-07-01",
    endDate: "2024-08-23",
    status: "upcoming",
  },
];

// ─── Attendance ───────────────────────────────────────────────────────────────

export const mockAttendance: AttendanceRecord[] = [
  { id: "a1", studentId: "s1", courseId: "c1", date: "2024-02-05", status: "present" },
  { id: "a2", studentId: "s1", courseId: "c1", date: "2024-02-06", status: "present" },
  { id: "a3", studentId: "s1", courseId: "c1", date: "2024-02-07", status: "absent", notes: "Sick" },
  { id: "a4", studentId: "s2", courseId: "c1", date: "2024-02-05", status: "present" },
  { id: "a5", studentId: "s2", courseId: "c1", date: "2024-02-06", status: "late" },
  { id: "a6", studentId: "s2", courseId: "c1", date: "2024-02-07", status: "present" },
];

// ─── Assignments ──────────────────────────────────────────────────────────────

export const mockAssignments: Assignment[] = [
  {
    id: "as1",
    title: "Build a Landing Page",
    description: "Create a responsive landing page using HTML & CSS.",
    courseId: "c1",
    dueDate: "2024-02-20",
    maxScore: 100,
    createdBy: "t1",
  },
  {
    id: "as2",
    title: "JavaScript Todo App",
    description: "Build a fully functional todo app with vanilla JS.",
    courseId: "c1",
    dueDate: "2024-03-05",
    maxScore: 100,
    createdBy: "t1",
  },
];

export const mockSubmissions: AssignmentSubmission[] = [
  {
    id: "sub1",
    assignmentId: "as1",
    studentId: "s1",
    submittedAt: "2024-02-19",
    score: 88,
    feedback: "Great work! Clean layout.",
    status: "graded",
  },
  {
    id: "sub2",
    assignmentId: "as1",
    studentId: "s2",
    submittedAt: "2024-02-20",
    score: 75,
    feedback: "Good effort, improve responsiveness.",
    status: "graded",
  },
  {
    id: "sub3",
    assignmentId: "as2",
    studentId: "s1",
    submittedAt: "2024-03-04",
    status: "submitted",
  },
];

// ─── Performance ──────────────────────────────────────────────────────────────

export const mockPerformance: PerformanceRecord[] = [
  {
    studentId: "s1",
    courseId: "c1",
    averageScore: 88,
    attendanceRate: 93,
    assignmentsCompleted: 1,
    assignmentsTotal: 2,
    grade: "A",
  },
  {
    studentId: "s2",
    courseId: "c1",
    averageScore: 75,
    attendanceRate: 87,
    assignmentsCompleted: 1,
    assignmentsTotal: 2,
    grade: "B",
  },
  {
    studentId: "s3",
    courseId: "c2",
    averageScore: 91,
    attendanceRate: 98,
    assignmentsCompleted: 5,
    assignmentsTotal: 5,
    grade: "A",
  },
];

// ─── Dashboard Stats ──────────────────────────────────────────────────────────

export const mockDashboardStats: DashboardStats = {
  totalStudents: 3,
  totalTrainers: 2,
  totalCourses: 3,
  attendanceRate: 88,
  activeStudents: 2,
  pendingAssignments: 1,
};
