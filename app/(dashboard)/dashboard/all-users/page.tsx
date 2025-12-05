import PageHead from "@/components/dashboard/PageHead";
import UsersDataTable from "@/components/dashboard/users/UsersDataTable";
import { createClient } from "@/utils/supabase/supabase-server";
import { Suspense } from "react";

const AllUsers = async () => {
  const supabase = await createClient();

  const { data: users } = await supabase.from("users").select("*");

  return (
    <div>
      <Suspense fallback={<div></div>}>
        <PageHead />
      </Suspense>
      <div className="bg-white mx-6 p-5 rounded-[14px] mt-10">
        <p className="text-[20px] font-semibold text-[#1E293B] mb-[23px]">
          All Users
        </p>
        <UsersDataTable data={users ?? []} />
      </div>
    </div>
  );
};

export default AllUsers;
