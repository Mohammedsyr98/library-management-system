"use client";
import { PopoverMenu } from "@/components/PopoverMenu";
import {
  BORROW_STATUS_BY_LABEL,
  BORROW_STATUS_LABELS,
} from "@/constants/constants";
import { getBookImageUrl } from "@/utils";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import DataTable from "../DataTable";
import { useUpdateBorrowStatus } from "@/hooks/useBooks";
import { useToast } from "@/hooks/useToast";
import { useRouter } from "next/navigation";

const RequestsDataTable = ({
  data,
  total,
  page,
  limit,
}: ResourceTableProps<BookRequestRow>) => {
  const { showToast } = useToast();
  const router = useRouter();
  const { mutate: updateBorrowStatus } = useUpdateBorrowStatus();

  const handleUpdateBorrowStatus = ({
    borrowId,
    newStatus,
  }: UpdateBorrowStatusParams) => {
    updateBorrowStatus(
      { borrowId, newStatus },
      {
        onSuccess: (data) => {
          showToast(data.message, "success");
          router.refresh();
        },
        onError: (error: { message: string }) => {
          showToast(error.message, "error");
        },
      }
    );
  };

  const columns: ColumnDef<BookRequestRow>[] = [
    {
      accessorKey: "title",

      cell: ({ row }) => (
        <div className="flex items-center gap-x-2 min-w-0">
          <Image
            src={`${getBookImageUrl(row.original.book_image)}?v=${row.original.borrowed_at}`}
            width={40}
            height={50}
            alt={`${row.original.book_title} book image`}
          />
          <p className="font-semibold">{row.original.book_title}</p>
        </div>
      ),
      header: () => <span>Book</span>,
    },
    {
      accessorKey: "user_requested",
      header: () => <span>User Requested</span>,
      cell: ({ row }) => (
        <div className="flex items-center gap-x-2 min-w-0">
          {" "}
          <div className="border rounded-[7px] w-[34px] text-center p-1 font-semibold text-green-600">
            {row.original.user_full_name
              .split(" ")
              .map((n) => n[0])
              .slice(0, 2)
              .join("")
              .toUpperCase()}
          </div>
          <div className="overflow-hidden">
            <p className="text-brand3 text-[14px] font-semibold truncate">
              {row.original.user_full_name}
            </p>
            <p className="text-brand4 truncate"> {row.original.user_email}</p>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "borrow_status",
      cell: ({ row }) => (
        <PopoverMenu
          trigger={
            <button
              className={`rounded-2xl py-0.5 min-w-10 px-2.5 text-sm font-medium
                 ${
                   row.original.borrow_status === "borrowed"
                     ? "text-[#6941C6] bg-[#F9F5FF]"
                     : row.original.borrow_status === "returned"
                       ? "text-[#026AA2] bg-[#F0F9FF]"
                       : "text-[#C01048] bg-[#FFF1F3]"
                 }`}>
              {row.original.borrow_status
                .replace(/_/g, " ")
                .replace(/^\w/, (c) => c.toUpperCase())}
            </button>
          }
          value={BORROW_STATUS_LABELS[row.original.borrow_status]}
          options={Object.values(BORROW_STATUS_LABELS)}
          onUpdate={(label) => {
            handleUpdateBorrowStatus({
              borrowId: row.original.id,
              newStatus: BORROW_STATUS_BY_LABEL[label],
            });
          }}
        />
      ),
      header: () => <span>Borrow Status</span>,
    },
    {
      accessorKey: "borrowed_at",
      cell: ({ getValue }) =>
        new Date(getValue() as string).toLocaleDateString("En", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
      header: () => <span>Borrowed Date</span>,
    },
    {
      accessorKey: "returned_at",
      cell: ({ getValue }) =>
        getValue()
          ? new Date(getValue() as string).toLocaleDateString("En", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })
          : "-",
      header: () => <span>Return Date</span>,
    },
    {
      accessorKey: "due_date",
      cell: ({ getValue }) =>
        new Date(getValue() as string).toLocaleDateString("En", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
      header: () => <span>Due Date</span>,
    },
  ];
  return (
    <DataTable
      data={data}
      columns={columns}
      total={total ?? 0}
      page={page}
      limit={limit}
    />
  );
};

export default RequestsDataTable;
