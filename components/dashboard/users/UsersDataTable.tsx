"use client";
import { ColumnDef } from "@tanstack/react-table";
import DataTable from "../DataTable";

const UsersDataTable = ({ data }: { data: IUsers[] }) => {
  const columns: ColumnDef<IUsers>[] = [
    {
      accessorKey: "fullName",
      cell: (info) => info.getValue(),
      header: () => <span>Name</span>,
    },
    {
      id: "created_at",
      accessorFn: (row) => row.created_at,
      cell: (info) => info.getValue(),
      header: () => <span>Date Joined</span>,
    },

    {
      accessorKey: "role",
      header: () => "Role",
    },
    {
      id: "books_borrowed",
      accessorFn: (row) => row.books_borrowed.length,
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
