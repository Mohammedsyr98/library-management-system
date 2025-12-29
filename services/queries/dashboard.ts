import { createClient } from "@/utils/supabase/supabase-server";
import { cacheLife, cacheTag } from "next/cache";

export const getDashboardInsights = async () => {
  "use cache: private";
  cacheTag("dashboard-insights");
  cacheLife({ stale: 300, expire: 900 });

  const supabase = await createClient();
  return await supabase.rpc("get_dashboard_insights");
};
