import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  date,
  boolean,
  jsonb,
  unique,
  index,
} from "drizzle-orm/pg-core";

// 1. MASTER UNIT SEKOLAH & TAHUN AJARAN
export const schoolUnits = pgTable("school_units", {
  id: uuid("id").defaultRandom().primaryKey(),
  code: varchar("code", { length: 30 }).notNull().unique(),
  name: varchar("name", { length: 150 }).notNull(),
  address: text("address"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  deletedAt: timestamp("deleted_at", { withTimezone: true }),
});

export const academicYears = pgTable(
  "academic_years",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    schoolUnitId: uuid("school_unit_id")
      .notNull()
      .references(() => schoolUnits.id),
    name: varchar("name", { length: 50 }).notNull(),
    semester: varchar("semester", { length: 20 }).notNull(),
    isActive: boolean("is_active").default(false),
    startDate: date("start_date"),
    endDate: date("end_date"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  },
  (t) => [unique().on(t.schoolUnitId, t.name, t.semester)]
);

export const classes = pgTable("classes", {
  id: uuid("id").defaultRandom().primaryKey(),
  schoolUnitId: uuid("school_unit_id")
    .notNull()
    .references(() => schoolUnits.id),
  academicYearId: uuid("academic_year_id")
    .notNull()
    .references(() => academicYears.id),
  gradeLevel: varchar("grade_level", { length: 10 }).notNull(),
  className: varchar("class_name", { length: 50 }).notNull(),
  homeroomTeacherName: varchar("homeroom_teacher_name", { length: 150 }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

// 2. USERS & RBAC
export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: varchar("email", { length: 150 }).notNull().unique(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  fullName: varchar("full_name", { length: 150 }).notNull(),
  role: varchar("role", { length: 30 }).notNull(), // 'BK', 'BOD', 'WALI_MURID'
  phoneNumber: varchar("phone_number", { length: 25 }),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

// 3. STUDENTS & PARENT RELATIONS
export const students = pgTable("students", {
  id: uuid("id").defaultRandom().primaryKey(),
  schoolUnitId: uuid("school_unit_id").references(() => schoolUnits.id),
  nis: varchar("nis", { length: 30 }).notNull().unique(),
  fullName: varchar("full_name", { length: 150 }).notNull(),
  className: varchar("class_name", { length: 50 }).notNull(),
  homeroomTeacher: varchar("homeroom_teacher", { length: 150 }).notNull(),
  status: varchar("status", { length: 30 }).default("ACTIVE"),
  metadata: jsonb("metadata").default({}),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const parentStudents = pgTable(
  "parent_students",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    parentUserId: uuid("parent_user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    studentId: uuid("student_id")
      .notNull()
      .references(() => students.id, { onDelete: "cascade" }),
  },
  (t) => [unique().on(t.parentUserId, t.studentId)]
);

// 4. CREATABLE DROPDOWNS MASTER DATA
export const problemAspects = pgTable("problem_aspects", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 100 }).notNull().unique(),
  createdBy: uuid("created_by").references(() => users.id),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const problemIndicators = pgTable("problem_indicators", {
  id: uuid("id").defaultRandom().primaryKey(),
  aspectId: uuid("aspect_id").references(() => problemAspects.id, {
    onDelete: "set null",
  }),
  name: varchar("name", { length: 150 }).notNull().unique(),
  createdBy: uuid("created_by").references(() => users.id),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const behaviorItems = pgTable("behavior_items", {
  id: uuid("id").defaultRandom().primaryKey(),
  indicatorId: uuid("indicator_id").references(() => problemIndicators.id, {
    onDelete: "set null",
  }),
  name: varchar("name", { length: 200 }).notNull().unique(),
  createdBy: uuid("created_by").references(() => users.id),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const actionTypes = pgTable("action_types", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 100 }).notNull().unique(),
  createdBy: uuid("created_by").references(() => users.id),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

// 5. COUNSELING REPORTS (CORE 15 COLUMNS)
export const counselingReports = pgTable(
  "counseling_reports",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    reportNumber: varchar("report_number", { length: 50 }).notNull().unique(),
    counselingDate: date("counseling_date").notNull(),
    studentId: uuid("student_id")
      .notNull()
      .references(() => students.id),
    counselorId: uuid("counselor_id")
      .notNull()
      .references(() => users.id),
    aspect: varchar("aspect", { length: 100 }).notNull(),
    indicator: varchar("indicator", { length: 150 }).notNull(),
    behaviorItem: varchar("behavior_item", { length: 200 }).notNull(),
    problemLevel: varchar("problem_level", { length: 20 }).notNull(), // 'RINGAN', 'SEDANG', 'BERAT'
    counselingMethod: varchar("counseling_method", { length: 50 }).notNull(),
    bapContent: text("bap_content").notNull(),
    counselorAdvice: text("counselor_advice").notNull(),
    status: varchar("status", { length: 30 }).notNull().default("MONITORING"),
    action: varchar("action", { length: 100 }).notNull(),
    metadata: jsonb("metadata").default({}),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updated_at: timestamp("updated_at", { withTimezone: true }).defaultNow(),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),
  },
  (t) => [
    index("idx_reports_student").on(t.studentId),
    index("idx_reports_date").on(t.counselingDate),
    index("idx_reports_level").on(t.problemLevel),
  ]
);

// 6. NOTIFICATIONS
export const notifications = pgTable(
  "notifications",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    reportId: uuid("report_id").references(() => counselingReports.id, {
      onDelete: "cascade",
    }),
    channel: varchar("channel", { length: 30 }).default("IN_APP"),
    title: varchar("title", { length: 200 }).notNull(),
    message: text("message").notNull(),
    isRead: boolean("is_read").default(false),
    readAt: timestamp("read_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  },
  (t) => [index("idx_notifications_user_unread").on(t.userId, t.isRead)]
);
