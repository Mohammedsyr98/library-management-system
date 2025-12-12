"use client";
import { Database } from "@/type/database.types";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import React, { useState } from "react";
import DataTable from "../DataTable";
import { FaRegTrashAlt } from "react-icons/fa";
import { Pen } from "lucide-react";

type BooksRow = Database["public"]["Tables"]["books"]["Row"];
const BooksDataTable = ({
  data,
  total,
  page,
  limit,
}: ResourceTableProps<BooksRow>) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedBook, setSelectedBook] = useState<BooksRow | null>(null);
  const columns: ColumnDef<BooksRow>[] = [
    {
      accessorKey: "title",

      cell: ({ row }) => (
        <div className="flex items-center gap-x-2 min-w-0">
          <Image
            src={row.original.image ?? ""}
            width={40}
            height={50}
            alt={`${row.original.title} book image`}
          />
          <p className="font-semibold">{row.original.title}</p>
        </div>
      ),
      header: () => <span>Book Title</span>,
    },
    {
      accessorKey: "author",
      header: () => <span>Author</span>,
    },
    {
      accessorKey: "genre",
      header: () => <span>Genre</span>,
    },
    {
      accessorKey: "created_at",
      cell: ({ getValue }) =>
        new Date(getValue() as string).toLocaleDateString("En", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
      header: () => <span>Date Joined</span>,
    },
  ];

  const Actions = ({ row }: { row: BooksRow }) => {
    return (
      <>
        <button
          onClick={() => {
            setSelectedBook(row);
            setIsOpen(true);
          }}
          className="text-[#0089F1]  hover:text-[#006FCC] transition-colors duration-200">
          <Pen className="w-4.5 h-4.5" />
        </button>
        <button
          onClick={() => {
            setSelectedBook(row);
            setIsOpen(true);
          }}
          className="ml-4 text-red-600 hover:text-red-700 transition-colors duration-200">
          <FaRegTrashAlt />
        </button>
      </>
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

export default BooksDataTable;
