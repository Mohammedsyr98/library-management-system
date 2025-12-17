import AccountRequestsDataTable from "@/components/dashboard/account-request/AccountRequestsDataTable";
import PageHead from "@/components/dashboard/PageHead";
import { getPaginationInfo } from "@/utils";
import { createClient } from "@/utils/supabase/supabase-server";
import { Suspense } from "react";

const AccountRequest = async ({
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
    .filter("status", "eq", "PENDING")
    .or(`full_name.ilike.%${search}%,email.ilike.%${search}%`)
    .order("created_at", { ascending: false })
    .range(from, to);
  return (
    <div>
      <Suspense fallback={<div></div>}>
        <PageHead />
      </Suspense>
      <div className="bg-white mx-6 p-5 rounded-[14px] mt-10">
        <p className="text-[20px] font-semibold text-[#1E293B] mb-[23px]">
          All Users
        </p>
        <AccountRequestsDataTable
          data={users ?? []}
          total={count ?? 0}
          page={pageNumber}
          limit={limit}
        />
      </div>
    </div>
  );
};

export default AccountRequest;
