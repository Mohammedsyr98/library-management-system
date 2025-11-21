import { sql } from "drizzle-orm";
import {
  varchar,
  uuid,
  integer,
  text,
  pgTable,
  date,
  pgEnum,
  timestamp,
  pgPolicy,
} from "drizzle-orm/pg-core";

export const STATUS_ENUM = pgEnum("status", [
  "PENDING",
  "APPROVED",
  "REJECTED",
]);
export const ROLE_ENUM = pgEnum("role", ["USER", "ADMIN"]);
export const BORROW_STATUS_ENUM = pgEnum("borrow_status", [
  "BORROWED",
  "RETURNED",
]);

export const users = pgTable(
  "users",
  {
    id: uuid("id").notNull().primaryKey().defaultRandom(),
    fullName: varchar("full_name", { length: 255 }).notNull(),
    email: text("email").notNull().unique(),
    universityId: integer("university_id").notNull().unique(),
    password: text("password").notNull(),
    //   universityCard: text("university_card").notNull(),
    status: STATUS_ENUM("status").default("PENDING"),
    role: ROLE_ENUM("role").default("USER"),
    lastActivityDate: date("last_activity_date").defaultNow(),
    createdAt: timestamp("created_at", {
      withTimezone: true,
    }).defaultNow(),
  },
  () => [
    pgPolicy("users_can_read_own_data", {
      as: "restrictive",
      for: "select",
      to: "public",
      using: sql`id = auth.uid() AND status = 'APPROVED'`,
    }),
    pgPolicy("admins_can_read_all_users", {
      as: "restrictive",
      for: "select",
      to: "authenticated",
      using: sql`role = 'ADMIN'`,
    }),
  ]
).enableRLS();
