import { createClient } from "@/utils/supabase/supabase-server";
import { cacheLife, cacheTag } from "next/cache";

export const getAllUsers = async (search: string, from: number, to: number) => {
  "use cache: private";
  cacheTag("users");
  cacheLife({ stale: 300, expire: 600 });

  const supabase = await createClient();
  return await supabase
    .from("users")
    .select("*", { count: "exact" })
    .or(`full_name.ilike.%${search}%,email.ilike.%${search}%`)
    .order("created_at", { ascending: false })
    .range(from, to);
};

export const getAccountRequests = async (
  search: string,
  from: number,
  to: number
) => {
  "use cache: private";
  cacheTag("account-requests");
  cacheLife({ stale: 60, expire: 300 });

  const supabase = await createClient();
  return await supabase
    .from("users")
    .select("*", { count: "exact" })
    .filter("status", "eq", "PENDING")
    .or(`full_name.ilike.%${search}%,email.ilike.%${search}%`)
    .order("created_at", { ascending: false })
    .range(from, to);
};
