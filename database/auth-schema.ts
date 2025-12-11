/**
 * This file defines a minimal Drizzle schema for the Supabase `auth.users` table.
 * Supabase owns and manages all tables in the `auth` schema — we DO NOT migrate or
 * modify them. This exists only to allow safe foreign-key relations and typing in
 * our application code.
 */

import { pgSchema, uuid } from "drizzle-orm/pg-core";

export const usersInAuth = pgSchema("auth").table("users", {
  id: uuid("id").primaryKey(),
});
