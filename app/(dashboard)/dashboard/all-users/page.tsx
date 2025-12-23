import PageHead from "@/components/dashboard/PageHead";
import UsersDataTable from "@/components/dashboard/users/UsersDataTable";
import { getAllUsers } from "@/Services/server/services";
import { getPaginationInfo } from "@/utils";
import { createClient } from "@/utils/supabase/supabase-server";

const AllUsers = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const { search = "", page } = await searchParams;
  const supabase = await createClient();
  const { from, to, page: pageNumber, limit } = getPaginationInfo(String(page));
  const { data: currentUser } = await supabase.rpc("get_current_user");
  const { data: users, count } = await getAllUsers(search, from, to);

  return (
    <div>
      <PageHead />
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
