"use server";
import { updateTag } from "next/cache";

type CashTag =
  | "books"
  | "borrows"
  | "users"
  | "account-requests"
  | "dashboard-insights";
export async function invalidate(cashTag: CashTag) {
  updateTag(cashTag);
  updateTag("dashboard-insights");
}
