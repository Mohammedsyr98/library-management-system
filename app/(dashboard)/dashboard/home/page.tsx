import AccountRequests from "@/components/dashboard/home/AccountRequests";
import BorrowRequests from "@/components/dashboard/home/BorrowRequests";
import RecentBooks from "@/components/dashboard/home/RecentBooks";
import StatCard from "@/components/dashboard/home/StatCard";
import { getDashboardInsights } from "@/services/queries/dashboard";
import { createClient } from "@/utils/supabase/supabase-server";

const Home = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: dashboardInsights } = await getDashboardInsights();

  return (
    <div className="p-5 pt-16 lg:pt-5">
      <div className="mb-10">
        <p className="text-xl md:text-2xl font-semibold">
          Welcome, {user?.user_metadata?.full_name}
        </p>
        <p className="text-[#8D8D8D]">
          Here’s an overview of today’s library activity
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
        {dashboardInsights?.stats.map((state) => (
          <StatCard key={state.label} title={state.label} count={state.value} />
        ))}
      </div>

      <div className="flex flex-col xl:flex-row gap-5 mt-5 lg:h-[1048px]">
        {/* Requests Column */}
        <div className="flex flex-col w-full gap-5">
          <BorrowRequests
            requests={dashboardInsights?.recent.borrow_requests ?? []}
          />
          <AccountRequests
            requests={dashboardInsights?.recent.account_requests ?? []}
          />
        </div>

        {/* Recently Added Books */}

        <div className="w-full ">
          <RecentBooks
            books={dashboardInsights?.recent.recently_added_books ?? []}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
