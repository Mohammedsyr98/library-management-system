import ProfileInitials from "@/components/ProfileInitials";
import SectionHeader from "./SectionHeader";

const AccountRequests = ({ requests }: { requests: IUser[] }) => {
  return (
    <div className="bg-white w-full rounded-[14px] px-4 py-5">
      <SectionHeader
        title="Account Requests"
        href="/dashboard/account-requests"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 mt-3.5">
        {requests?.map((request) => (
          <div
            key={request.id}
            className="flex flex-col gap-2.5 shadow-sm border border-gray-200 bg-[#F8F8FF] rounded-[10px] p-4 items-center min-w-0 ">
            <ProfileInitials userFullName={request.full_name} />

            <div className="w-full overflow-hidden min-w-0 text-center">
              <p className="text-brand3 text-[14px] font-semibold truncate">
                {request.full_name}
              </p>
              <p className="text-brand4 text-[12px] truncate">
                {request.email}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccountRequests;
