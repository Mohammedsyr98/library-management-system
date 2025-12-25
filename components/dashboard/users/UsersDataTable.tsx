"use client";
import { ColumnDef } from "@tanstack/react-table";
import DataTable from "../DataTable";
import { FaRegTrashAlt } from "react-icons/fa";
import { useDeleteUser, useUpdateUserRole } from "@/hooks/useUsers";
import { useToast } from "@/hooks/useToast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ConfirmDeleteUserModal from "./ConfirmDeleteUserModal";
import { PopoverMenu } from "@/components/PopoverMenu";
import { ROLES } from "@/constants/constants";
import { invalidate } from "@/Services/server/actions";
import ProfileInitials from "@/components/ProfileInitials";

const UsersDataTable = ({
  data,
  currentUserId,
  total,
  page,
  limit,
}: ResourceTableProps<IUser>) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

  const { mutate: updateUserRole } = useUpdateUserRole();
  const { mutate: deleteUser, isPending: pendingDelete } = useDeleteUser();

  const { showToast } = useToast();
  const router = useRouter();

  const handleUpdateUserRole = ({ userId, newRole }: UpdateUserRolePayload) => {
    if (userId === currentUserId && newRole === "USER") {
      showToast("You cannot remove your own admin privileges.", "error");
      return;
    }
    updateUserRole(
      { newRole, userId },
      {
        onSuccess: async () => {
          await invalidate("users");
          showToast("User role updated successfully.", "success");
          setIsOpen(false);
          router.refresh();
        },
        onError: (error: { message: string }) => {
          showToast(error.message, "error");
        },
      }
    );
  };

  const handleDeleteUser = ({ userId }: { userId: string }) => {
    if (userId === currentUserId) {
      showToast("You cannot delete your account.", "error");
      return;
    }

    deleteUser(
      { userId },
      {
        onSuccess: () => {
          setIsOpen(false);
          showToast("User deleted successfully.", "success");

          router.refresh();
        },
        onError: (error: { message: string }) => {
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
        new Date(getValue() as string).toLocaleDateString(),
      header: () => <span>Date Joined</span>,
    },

    {
      accessorKey: "role",
      cell: ({ row }) => (
        <PopoverMenu
          trigger={
            <button
              className={`rounded-2xl py-0.5 min-w-10 px-2.5 text-sm font-medium
      ${
        row.original.role === "ADMIN"
          ? "text-[#027A48] bg-[#ECFDF3]"
          : "text-pink-700 bg-[#FDF2FA]"
      }`}>
              {row.original.role}
            </button>
          }
          value={row.original.role}
          options={ROLES}
          onUpdate={(newRole) =>
            handleUpdateUserRole({
              userId: row.original.id,
              newRole: newRole,
            })
          }
        />
      ),
      header: () => "Role",
    },
    {
      id: "books_borrowed",
      accessorFn: (row) => row.Borrowed_books,
      header: () => <span>Books Borrowed</span>,
    },
  ];

  const Actions = ({ row }: { row: IUser }) => {
    return (
      <button
        onClick={() => {
          setSelectedUser(row);
          setIsOpen(true);
        }}
        className="text-black hover:text-red-600 transition-colors duration-200">
        <FaRegTrashAlt />
      </button>
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
      {selectedUser && (
        <ConfirmDeleteUserModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          selectedUser={selectedUser}
          isPending={pendingDelete}
          setSelectedUser={setSelectedUser}
          onDelete={() => handleDeleteUser({ userId: selectedUser.id })}
        />
      )}
    </>
  );
};

export default UsersDataTable;
