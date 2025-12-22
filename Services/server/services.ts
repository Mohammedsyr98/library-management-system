import { createClient } from "@/utils/supabase/supabase-server";
import { unstable_cache } from "next/cache";

/**
 * DATA ACCESS LAYER - CACHING STRATEGY
 * ------------------------------------
 * PURPOSE: Optimizes performance and database costs using a hybrid approach.
 * * 1. SEARCH (DYNAMIC): Bypasses 'unstable_cache' to prevent "Cache Bloat."
 * Since search queries are unpredictable, caching them consumes excessive
 * storage/memory for results that are rarely reused.
 * * 2. PAGINATION (CACHED): Uses 'unstable_cache' for standard table browsing.
 * Commonly accessed pages (e.g., Page 1) are served instantly from the server.
 * * 3. INVALIDATION: All cached results are tagged (e.g., 'books', 'users').
 * Call 'revalidateTag(tag)' in Server Actions after any INSERT/UPDATE/DELETE
 * to ensure all users see fresh data.
 */

const supabase = await createClient();

export const getBooks = async (search: string, from: number, to: number) => {
  if (search) {
    return supabase
      .from("books")
      .select("*", { count: "exact" })
      .or(
        `title.ilike.%${search}%,author.ilike.%${search}%,genre.cs.{${search}}`
      )
      .order("created_at", { ascending: false })
      .range(from, to);
  }
  const getCachedBooks = unstable_cache(
    async (start, end) => {
      return supabase
        .from("books")
        .select("*", { count: "exact" })
        .order("created_at", { ascending: false })
        .range(start, end);
    },
    ["books-list"],
    {
      revalidate: 3600,
      tags: ["books"],
    }
  );
  return getCachedBooks(from, to);
};

export const getBorrowRequests = async (
  search: string,
  from: number,
  to: number
) => {
  if (search) {
    return supabase.rpc("search_borrow_requests", {
      search_text: Array.isArray(search) ? search[0] : search || "",
      limit_count: to - from + 1,
      offset_count: from,
    });
  }
  const getCachedRequests = unstable_cache(
    async (start, end) => {
      return supabase.rpc("search_borrow_requests", {
        search_text: Array.isArray(search) ? search[0] : search || "",
        limit_count: end - start + 1,
        offset_count: start,
      });
    },
    ["borrow-requests-list"],
    {
      revalidate: 3600,
      tags: ["borrows"],
    }
  );
  return getCachedRequests(from, to);
};
export const getAllUsers = async (search: string, from: number, to: number) => {
  if (search) {
    return supabase
      .from("users")
      .select("*", { count: "exact" })
      .or(`full_name.ilike.%${search}%,email.ilike.%${search}%`)
      .order("created_at", { ascending: false })
      .range(from, to);
  }
  const getCachedUsers = unstable_cache(
    async (start, end) => {
      return supabase
        .from("users")
        .select("*", { count: "exact" })
        .order("created_at", { ascending: false })
        .range(start, end);
    },
    ["users-list"],
    {
      revalidate: 3600,
      tags: ["users"],
    }
  );
  return getCachedUsers(from, to);
};

export const getAccountRequests = async (
  search: string,
  from: number,
  to: number
) => {
  if (search) {
    return supabase
      .from("users")
      .select("*", { count: "exact" })
      .filter("status", "eq", "PENDING")
      .or(`full_name.ilike.%${search}%,email.ilike.%${search}%`)
      .order("created_at", { ascending: false })
      .range(from, to);
  }
  const getCachedAccountRequests = unstable_cache(
    async (start, end) => {
      return supabase
        .from("users")
        .select("*", { count: "exact" })
        .filter("status", "eq", "PENDING")
        .order("created_at", { ascending: false })
        .range(start, end);
    },
    ["account-requests-list"],
    {
      revalidate: 3600,
      tags: ["account-requests"],
    }
  );
  return getCachedAccountRequests(from, to);
};
export const getDashboardInsights = async () => {
  const getCachedDashboardInsights = unstable_cache(
    async () => {
      return supabase.rpc("get_dashboard_insights");
    },
    ["dashboard-insights"],
    {
      revalidate: 3600,
      tags: ["dashboard-insights"],
    }
  );
  return getCachedDashboardInsights();
};
