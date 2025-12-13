import {
  pgTable,
  pgPolicy,
  bigint,
  text,
  jsonb,
  timestamp,
  foreignKey,
  unique,
  uuid,
  varchar,
  integer,
  date,
  pgEnum,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const borrowStatus = pgEnum("borrow_status", ["BORROWED", "RETURNED"]);
export const role = pgEnum("role", ["USER", "ADMIN"]);
export const status = pgEnum("status", ["PENDING", "APPROVED", "REJECTED"]);

export const books = pgTable(
  "books",
  {
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity({
      name: "books_id_seq",
      startWith: 1,
      increment: 1,
      minValue: 1,
      maxValue: 9223372036854775807,
      cache: 1,
    }),
    title: text().default("").notNull(),
    image: text(),
    author: text().default("").notNull(),
    genre: text().array().default([]).notNull(),
    summary: text().default("").notNull(),
    createdAt: timestamp("created_at", { mode: "string" })
      .default(sql`(now() AT TIME ZONE 'utc'::text)`)
      .notNull(),
  },
  (table) => [
    pgPolicy("Authenticated users can read books", {
      as: "permissive",
      for: "select",
      to: ["authenticated"],
      using: sql`true`,
    }),
    pgPolicy("books_delete", {
      as: "permissive",
      for: "delete",
      to: ["authenticated"],
    }),
    pgPolicy("books_update", {
      as: "permissive",
      for: "update",
      to: ["authenticated"],
    }),
  ]
);

export const users = pgTable(
  "users",
  {
    id: uuid().primaryKey().notNull(),
    email: text().notNull(),
    fullName: varchar("full_name", { length: 255 }).notNull(),
    universityId: integer("university_id"),
    role: role().default("USER").notNull(),
    status: status().default("PENDING").notNull(),
    lastActivityDate: date("last_activity_date").defaultNow(),
    createdAt: timestamp("created_at", {
      withTimezone: true,
      mode: "string",
    }).defaultNow(),
    borrowedBooks: integer("Borrowed_books").default(0).notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.id],
      foreignColumns: [table.id],
      name: "users_auth_fk",
    }).onDelete("cascade"),
    unique("users_email_unique").on(table.email),
    pgPolicy("users_delete_based_on_role", {
      as: "permissive",
      for: "delete",
      to: ["authenticated"],
      using: sql`(((((auth.jwt() -> 'user_metadata'::text) ->> 'role'::text) = 'USER'::text) AND (id = auth.uid())) OR (((auth.jwt() -> 'user_metadata'::text) ->> 'role'::text) = 'ADMIN'::text))`,
    }),
    pgPolicy("users_read_based_on_role", {
      as: "permissive",
      for: "select",
      to: ["authenticated"],
    }),
    pgPolicy("users_update_based_on_role", {
      as: "permissive",
      for: "update",
      to: ["authenticated"],
    }),
  ]
);
