import RequestsDataTable from "@/components/dashboard/borrow-requests/RequestsDataTabel";
import PageHead from "@/components/dashboard/PageHead";
import { getPaginationInfo } from "@/utils";
import { createClient } from "@/utils/supabase/supabase-server";
import { Suspense } from "react";

const BarrowRequests = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const { search = "", page } = await searchParams;
  const { from, to, page: pageNumber, limit } = getPaginationInfo(String(page));

  const supabase = await createClient();
  const { data } = await supabase.rpc("search_borrow_requests", {
    search_text: Array.isArray(search) ? search[0] : search || "",
    limit_count: to - from + 1,
    offset_count: from,
  });
  return (
    <div>
      <Suspense fallback={<div></div>}>
        <PageHead />
      </Suspense>
      <div className="bg-white mx-6 p-5 rounded-[14px] mt-10">
        <div className="flex items-end mb-[23px] justify-between">
          <p className="text-[20px] font-semibold text-[#1E293B]">
            Borrow Book Requests
          </p>{" "}
        </div>

        <RequestsDataTable
          data={data ?? []}
          limit={limit}
          page={pageNumber}
          total={data?.[0]?.total_count ?? 0}
        />
      </div>
    </div>
  );
};

export default BarrowRequests;
