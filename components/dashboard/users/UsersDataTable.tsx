"use client";
import { ColumnDef } from "@tanstack/react-table";
import DataTable from "../DataTable";
import { Database } from "@/type/database.types";

const UsersDataTable = ({ data }: { data: IUsers[] }) => {
  const columns: ColumnDef<IUsers>[] = [
    {
      accessorKey: "full_name",
      cell: (info) => info.getValue(),
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
