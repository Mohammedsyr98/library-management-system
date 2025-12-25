"use client";
import { ColumnDef } from "@tanstack/react-table";
import DataTable from "../DataTable";
import { useToast } from "@/hooks/useToast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { X } from "lucide-react";
import AccountRequestActionModal from "./AccountRequestActionModal";
import { useUpdateAccountStatus } from "@/hooks/useUsers";
import { invalidate } from "@/Services/server/actions";
import ProfileInitials from "@/components/ProfileInitials";

const AccountRequestsDataTable = ({
  data,
  total,
  page,
  limit,
}: ResourceTableProps<IUser>) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedRequest, setSelectedRequest] =
    useState<AccountRequestDecision | null>(null);

  const { showToast } = useToast();
  const router = useRouter();

  const { mutate: updateAccountStatus, isPending } = useUpdateAccountStatus();

  const handleAccountRequestAction = () => {
    if (selectedRequest)
      updateAccountStatus(
        {
          action:
            selectedRequest.action === "Approve" ? "APPROVED" : "REJECTED",
          userId: selectedRequest.userId,
        },
        {
          onSuccess: async (data) => {
            await invalidate("account-requests");
            showToast(data.message, "success");
            setIsOpen(false);
            router.refresh();
          },
          onError: (error) => {
            showToast(error.message, "error");
          },
        }
      );
  };

  const columns: ColumnDef<IUser>[] = [
    {
      accessorKey: "full_name",

      cell: ({ row }) => (
        <div className="flex items-center gap-x-2 min-w-0">
          {" "}
          <ProfileInitials userFullName={row.original.full_name} />
          <div className="overflow-hidden">
            <p className="text-brand3 text-[14px] font-semibold truncate">
              {row.original.full_name}
            </p>
            <p className="text-brand4 truncate"> {row.original.email}</p>
          </div>
        </div>
      ),
      header: () => <span>Name</span>,
    },
    {
      id: "created_at",
      accessorFn: (row) => row.created_at,
      cell: ({ getValue }) =>
        new Date(getValue() as string).toLocaleDateString("En", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
      header: () => <span>Date Joined</span>,
    },

    {
      accessorKey: "university_id",
      header: () => "University ID No",
    },
  ];

  const Actions = ({ row }: { row: IUser }) => {
    return (
      <div className="flex items-center gap-6">
        {" "}
        <button
          onClick={() => {
            setSelectedRequest({ userId: row.id, action: "Approve" });
            setIsOpen(true);
          }}
          className="bg-[#ECFDF3] hover:bg-[#D1FADF] px-3 py-2 font-semibold text-[#027A48] transition-colors duration-200 rounded-sm">
          <p>Approve Account</p>
        </button>
        <button
          onClick={() => {
            setSelectedRequest({ userId: row.id, action: "Reject" });
            setIsOpen(true);
          }}
          className="group border border-red-600 rounded-full size-6 flex items-center justify-center hover:bg-red-50 transition-colors">
          <X className="text-red-600 size-4.5 group-hover:text-red-700" />
        </button>
      </div>
    );
  };

  return (
    <>
      {" "}
      <DataTable
        data={data}
        columns={columns}
        Actions={Actions}
        total={total ?? 0}
        page={page}
        limit={limit}
      />
      {selectedRequest && (
        <AccountRequestActionModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          selectedRequest={selectedRequest}
          setSelectedRequest={setSelectedRequest}
          isPending={isPending}
          onConfirm={handleAccountRequestAction}
        />
      )}
    </>
  );
};

export default AccountRequestsDataTable;
