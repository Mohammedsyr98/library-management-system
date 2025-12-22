import RequestsDataTable from "@/components/dashboard/borrow-requests/RequestsDataTabel";
import PageHead from "@/components/dashboard/PageHead";
import { getBorrowRequests } from "@/Services/server/services";
import { getPaginationInfo } from "@/utils";
import { Suspense } from "react";

const BarrowRequests = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const { search = "", page } = await searchParams;
  const { from, to, page: pageNumber, limit } = getPaginationInfo(String(page));
  const { data } = await getBorrowRequests(search, from, to);

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
