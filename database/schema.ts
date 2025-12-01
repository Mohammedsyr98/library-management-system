import {
  pgTable,
  unique,
  pgPolicy,
  uuid,
  text,
  varchar,
  integer,
  date,
  timestamp,
  pgEnum,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const borrowStatus = pgEnum("borrow_status", ["BORROWED", "RETURNED"]);
export const role = pgEnum("role", ["USER", "ADMIN"]);
export const status = pgEnum("status", ["PENDING", "APPROVED", "REJECTED"]);

export const users = pgTable(
  "users",
  {
    id: uuid().primaryKey().notNull(),
    email: text().notNull(),
    fullName: varchar("full_name", { length: 255 }),
    universityId: integer("university_id"),
    role: role().default("USER"),
    status: status().default("PENDING"),
    lastActivityDate: date("last_activity_date").defaultNow(),
    createdAt: timestamp("created_at", {
      withTimezone: true,
      mode: "string",
    }).defaultNow(),
  },
  (table) => [
    unique("users_email_unique").on(table.email),
    pgPolicy("admins_can_read_all_users", {
      as: "permissive",
      for: "select",
      to: ["authenticated"],
      using: sql`(role = 'ADMIN'::role)`,
    }),
    pgPolicy("users_can_read_own_data", {
      as: "permissive",
      for: "select",
      to: ["public"],
    }),
  ],
);
