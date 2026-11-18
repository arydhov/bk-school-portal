export type UserRole = "BK" | "BOD" | "WALI_MURID";

export type ProblemLevel = "RINGAN" | "SEDANG" | "BERAT";

export type CaseStatus = "MONITORING" | "REFERRAL" | "CLEAR";

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  phoneNumber?: string;
}

export interface Student {
  id: string;
  nis: string;
  fullName: string;
  className: string;
  homeroomTeacher: string;
  parentId?: string;
}

export interface CounselingReport {
  id: string;
  reportNumber: string;
  counselingDate: string;
  studentId: string;
  studentName: string;
  className: string;
  homeroomTeacher: string;
  counselorId: string;
  counselorName: string;
  aspect: string;
  indicator: string;
  behaviorItem: string;
  problemLevel: ProblemLevel;
  counselingMethod: string;
  bapContent: string;
  counselorAdvice: string;
  status: CaseStatus;
  action: string;
  createdAt: string;
}

export interface AppNotification {
  id: string;
  userId: string;
  reportId: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export interface DropdownOptions {
  aspects: string[];
  indicators: string[];
  behaviorItems: string[];
  actions: string[];
  methods: string[];
  statuses: CaseStatus[];
}
