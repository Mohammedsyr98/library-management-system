import { supabase } from "@/lib/supabaseClient";

export function getPaginationInfo(pageParam: string | undefined) {
  const limit = 6;
  const page = Number(pageParam) || 1;
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  return { page, from, to, limit };
}
export function getPaginationRange(current: number, total: number) {
  const delta = 2;
  const range: (number | "...")[] = [];

  const left = Math.max(2, current - delta);
  const right = Math.min(total - 1, current + delta);

  range.push(1);

  if (left > 2) range.push("...");

  for (let i = left; i <= right; i++) range.push(i);

  if (right < total - 1) range.push("...");

  if (total > 1) range.push(total);

  return range;
}

export const getBookImageUrl = (path?: string | null) => {
  if (!path) return "/images/book-placeholder.png";

  const { data } = supabase.storage.from("media").getPublicUrl(path);

  return data.publicUrl;
};
