import { createClient } from "@/utils/supabase/supabase-server";
import { cacheLife, cacheTag } from "next/cache";

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
