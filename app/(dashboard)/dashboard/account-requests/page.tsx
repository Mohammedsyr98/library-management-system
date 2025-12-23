import AccountRequestsDataTable from "@/components/dashboard/account-request/AccountRequestsDataTable";
import PageHead from "@/components/dashboard/PageHead";
import { getAccountRequests } from "@/Services/server/services";
import { getPaginationInfo } from "@/utils";

const AccountRequest = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const { search = "", page } = await searchParams;
  const { from, to, page: pageNumber, limit } = getPaginationInfo(String(page));
  const { data: users, count } = await getAccountRequests(search, from, to);

  return (
    <div>
      <PageHead />
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
