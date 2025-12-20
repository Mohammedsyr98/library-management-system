import AccountRequests from "@/components/dashboard/home/AccountRequests";
import BorrowRequests from "@/components/dashboard/home/BorrowRequests";
import RecentBooks from "@/components/dashboard/home/RecentBooks";
import StatCard from "@/components/dashboard/home/StatCard";
import { createClient } from "@/utils/supabase/supabase-server";

const Home = async () => {
  const supabase = await createClient();
  const { data: userData } = await supabase.rpc("get_current_user");
  const { data: dashboardInsights } = await supabase.rpc(
    "get_dashboard_insights"
  );

  return (
    <div className="p-5">
      <div className="mb-10">
        <p className="text-2xl font-semibold">
          Welcome, {userData?.data?.full_name}
        </p>
        <p className="text-[#8D8D8D]">
          Here’s an overview of today’s library activity
        </p>
      </div>
      <div className="flex items-center gap-5  w-full">
        {dashboardInsights?.stats.map((state) => (
          <StatCard key={state.label} title={state.label} count={state.value} />
        ))}
      </div>
      <div className="flex gap-5 mt-5 h-[1048px] min-h-0">
        <div className="flex flex-col w-full gap-5">
          <BorrowRequests
            requests={dashboardInsights?.recent.borrow_requests ?? []}
          />
          <AccountRequests
            requests={dashboardInsights?.recent.account_requests ?? []}
          />
        </div>
        <RecentBooks
          books={dashboardInsights?.recent.recently_added_books ?? []}
        />
      </div>
    </div>
  );
};

export default Home;
