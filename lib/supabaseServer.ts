import { createClient } from "@/utils/supabase/supabase-server";

export const supabase = await createClient();
