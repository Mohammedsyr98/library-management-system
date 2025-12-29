import { createClient } from "@/utils/supabase/supabase-server";
import { cacheLife, cacheTag } from "next/cache";

/**
 * DATA ACCESS LAYER (DAL) - CACHING STRATEGY
 * -----------------------------------------
 * This file serves as the single source of truth for database operations.
 * * 1. AUTH & RLS SAFETY: We use "use cache: private" to ensure that cached results
 * are scoped to the individual user's browser session. This prevents data leaks
 * between users while still allowing the functions to access cookies/auth headers.
 * * 2. PERFORMANCE: By using "use cache", we reduce database load. Repeated visits
 * to the same page (or back-navigation) are served instantly from the browser's
 * memory cache, eliminating the "loading spinner" flicker.
 * * 3. DYNAMIC SEARCH: Search terms are included in the cache key. Next.js creates
 * unique cache entries for each search string to ensure results are accurate.
 * * 4. INVALIDATION: We use cacheTag() so that Server Actions can trigger immediate
 * updates across the app using updateTag('tag_name') after mutations.
 */

export const getBooks = async (search: string, from: number, to: number) => {
  "use cache: private";
  cacheTag("books");
  cacheLife({ stale: 120, expire: 300 });

  const supabase = await createClient();
  return await supabase
    .from("books")
    .select("*", { count: "exact" })
    .or(`title.ilike.%${search}%,author.ilike.%${search}%,genre.cs.{${search}}`)
    .order("created_at", { ascending: false })
    .range(from, to);
};
export const getBook = async (id: string) => {
  "use cache: private";
  cacheTag(`book-${id}`, "books");
  cacheLife({ stale: 120, expire: 300 });
  const supabase = await createClient();
  return await supabase
    .from("books")
    .select("*", { count: "exact" })
    .eq("id", Number(id));
};
export const getSimilarBooks = async (
  genre: string[],
  author: string,
  currentBookId: number
) => {
  "use cache: private";
  cacheTag("books", "similar-books");
  cacheLife({ stale: 120, expire: 300 });
  const supabase = await createClient();
  const { data } = await supabase
    .from("books")
    .select("*")
    .neq("id", currentBookId)
    .or(`author.eq."${author}",genre.cs.{${genre.join(",")}}`)
    .limit(7);

  if (!data || data.length === 0) {
    const { data: fallbackData } = await supabase
      .from("books")
      .select("*")
      .neq("id", currentBookId)
      .order("title", { ascending: false })
      .limit(7);
    return { data: fallbackData, isFallback: true };
  }

  return { data, isFallback: false };
};
export const getBorrowRequests = async (
  search?: string,
  from?: number,
  to?: number
) => {
  "use cache: private";
  cacheTag("borrows");
  cacheLife({ stale: 60, expire: 300 });

  const supabase = await createClient();

  const hasPagination = from !== undefined && to !== undefined;

  return supabase.rpc("search_borrow_requests", {
    search_text: search ?? null,
    limit_count: hasPagination ? to - from + 1 : null,
    offset_count: hasPagination ? from : null,
  });
};
export const getAllUsers = async (search: string, from: number, to: number) => {
  "use cache: private";
  cacheTag("users");
  cacheLife({ stale: 300, expire: 600 });

  const supabase = await createClient();
  return await supabase
    .from("users_with_borrowed_count")
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

export const getDashboardInsights = async () => {
  "use cache: private";
  cacheTag("dashboard-insights");
  cacheLife({ stale: 300, expire: 900 });

  const supabase = await createClient();
  return await supabase.rpc("get_dashboard_insights");
};
