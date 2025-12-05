"use client";
import { ColumnDef } from "@tanstack/react-table";
import DataTable from "../DataTable";
import { Database } from "@/type/database.types";

const UsersDataTable = ({ data }: { data: IUsers[] }) => {
  const columns: ColumnDef<IUsers>[] = [
    {
      accessorKey: "full_name",
      cell: ({ row }) => (
        <div className="flex items-center gap-x-2">
          {" "}
          <div className="border rounded-[7px] w-[34px] text-center p-1 font-semibold text-green-600">
            {row.original.full_name
              .split(" ")
              .map((n) => n[0])
              .slice(0, 2)
              .join("")
              .toUpperCase()}
          </div>
          <div>
            <p className="text-brand3 text-[14px] font-semibold">
              {row.original.full_name}
            </p>
            <p className="text-brand4"> {row.original.email}</p>
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
      header: () => "Role",
    },
    {
      id: "books_borrowed",
      accessorFn: (row) => row.Borrowed_books,
      header: () => <span>Books Borrowed</span>,
    },
  ];

  const Actions = ({ row }: { row: IUsers }) => {
    return (
      <div>
        <button className="text-black">delete</button>
      </div>
    );
  };
  return <DataTable data={data} columns={columns} Actions={Actions} />;
};

export default UsersDataTable;
