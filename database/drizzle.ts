"use server";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import config from "@/lib/config";

const sql = neon(config.env.databaseUrl!);

export const db = drizzle(sql);
console.log("DB URL:", config.env.databaseUrl);
