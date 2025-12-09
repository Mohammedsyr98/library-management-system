"use client";
import { ColumnDef } from "@tanstack/react-table";
import DataTable from "../DataTable";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { AiOutlineCheck } from "react-icons/ai";
import { FaRegTrashAlt } from "react-icons/fa";
import { useDeleteUser, useUpdateUserRole } from "@/hooks/useUsers";
import { useToast } from "@/hooks/useToast";
import { useRouter } from "next/navigation";
import { Database } from "@/type/database.types";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Oval } from "react-loader-spinner";

const UsersDataTable = ({
  data,
  currentUserId,
  total,
  page,
  limit,
}: {
  data: Database["public"]["Tables"]["users"]["Row"][];
  currentUserId: string;
  total: number;
  page: number;
  limit: number;
}) => {
  const [dialogOpen, setIsDialogOpen] = useState<boolean>(false);

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
        onSuccess: () => {
          showToast("User role updated successfully.", "success");
          setIsDialogOpen(false);
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
        onSuccess: (data) => {
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
          {" "}
          <div className="border rounded-[7px] w-[34px] text-center p-1 font-semibold text-green-600">
            {row.original.full_name
              .split(" ")
              .map((n) => n[0])
              .slice(0, 2)
              .join("")
              .toUpperCase()}
          </div>
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
        <Popover>
          <PopoverTrigger asChild>
            <button
              className={`rounded-2xl py-0.5 min-w-10 px-2.5 text-sm font-medium
        ${
          row.original.role === "ADMIN"
            ? "text-[#027A48] bg-[#ECFDF3]"
            : "text-pink-700 bg-[#FDF2FA]"
        }`}>
              {row.original.role}
            </button>
          </PopoverTrigger>

          <PopoverContent align="start" className="w-44 p-2">
            <div className="flex flex-col gap-1">
              {["ADMIN", "USER"].map((role) => (
                <button
                  onClick={() =>
                    row.original.role !== role &&
                    handleUpdateUserRole({
                      userId: row.original.id,
                      newRole: role as "USER" | "ADMIN",
                    })
                  }
                  key={role}
                  className={`flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm
            hover:bg-gray-100 transition
            ${row.original.role === role ? "font-semibold" : "text-gray-700"}`}>
                  {role}

                  {row.original.role === role && (
                    <AiOutlineCheck className="w-4 h-4 text-green-600 font-bold" />
                  )}
                </button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
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
      <Dialog open={dialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <button className="text-black hover:text-red-600 transition">
            <FaRegTrashAlt />
          </button>
        </DialogTrigger>

        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete{" "}
              <span className="font-semibold">{row.full_name}</span>? <br />
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="mt-4 flex justify-end gap-2">
            <DialogClose asChild>
              <button
                disabled={pendingDelete}
                onClick={() => setIsDialogOpen(false)}
                className="px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 disabled:opacity-50">
                Cancel
              </button>
            </DialogClose>

            <DialogClose asChild>
              <button
                disabled={pendingDelete}
                onClick={() => handleDeleteUser({ userId: row.id })}
                className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 disabled:opacity-50 flex items-center gap-2">
                {pendingDelete ? (
                  <Oval
                    height={20}
                    width={20}
                    color="#4fa94d"
                    visible={true}
                    ariaLabel="oval-loading"
                    secondaryColor="#4fa94d"
                    strokeWidth={2}
                    strokeWidthSecondary={2}
                  />
                ) : null}
                Delete
              </button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };
  return (
    <DataTable
      data={data}
      columns={columns}
      Actions={Actions}
      total={total ?? 0}
      page={page}
      limit={limit}
    />
  );
};

export default UsersDataTable;
