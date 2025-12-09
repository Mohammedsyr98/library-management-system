import PageHead from "@/components/dashboard/PageHead";
import UsersDataTable from "@/components/dashboard/users/UsersDataTable";
import { getPaginationInfo } from "@/utils";
import { createClient } from "@/utils/supabase/supabase-server";
import { Suspense } from "react";

const AllUsers = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const { search = "", page } = await searchParams;
  const { from, to, page: pageNumber, limit } = getPaginationInfo(String(page));

  const supabase = await createClient();

  const { data: users, count } = await supabase
    .from("users")
    .select("*", { count: "exact" })
    .or(`full_name.ilike.%${search}%,email.ilike.%${search}%`)
    .order("created_at", { ascending: false })
    .range(from, to);
  const { data: currentUser } = await supabase.rpc("get_current_user");

  return (
    <div>
      <Suspense fallback={<div></div>}>
        <PageHead />
      </Suspense>
      <div className="bg-white mx-6 p-5 rounded-[14px] mt-10">
        <p className="text-[20px] font-semibold text-[#1E293B] mb-[23px]">
          All Users
        </p>
        <UsersDataTable
          data={users ?? []}
          total={count ?? 0}
          page={pageNumber}
          limit={limit}
          currentUserId={currentUser?.data?.id ?? ""}
        />
      </div>
    </div>
  );
};

export default AllUsers;
