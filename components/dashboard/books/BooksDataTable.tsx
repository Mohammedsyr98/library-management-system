"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import React, { useState } from "react";
import DataTable from "../DataTable";
import { FaRegTrashAlt } from "react-icons/fa";
import { Pen } from "lucide-react";
import ConfirmDeleteBookModal from "./ConfirmDeleteBookModal";
import { useDeleteBook } from "@/hooks/useBooks";
import { useToast } from "@/hooks/useToast";
import { useRouter } from "next/navigation";
import { getBookImageUrl } from "@/utils";

const BooksDataTable = ({
  data,
  total,
  page,
  limit,
}: ResourceTableProps<BookRow>) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedBook, setSelectedBook] = useState<BookRow | null>(null);

  const { showToast } = useToast();
  const router = useRouter();

  const { mutate: deleteBook, isPending: pendingDelete } = useDeleteBook();

  const handleDeleteBook = ({ bookId }: { bookId: BookRow["id"] }) => {
    deleteBook(
      { bookId },
      {
        onSuccess: async (data) => {
          setIsOpen(false);
          showToast(data.message, "success");

          router.refresh();
        },
        onError: (error: { message: string }) => {
          showToast(error.message, "error");
        },
      }
    );
  };

  const columns: ColumnDef<BookRow>[] = [
    {
      accessorKey: "title",

      cell: ({ row }) => (
        <div className="flex items-center gap-x-2 min-w-0">
          <Image
            src={`${getBookImageUrl(row.original.image)}?v=${row.original.updated_at}`}
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

  const Actions = ({ row }: { row: BookRow }) => {
    return (
      <>
        <button
          onClick={() => {
            router.push(`/dashboard/books/${row.id}`);
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
    <>
      <DataTable
        data={data}
        columns={columns}
        Actions={Actions}
        total={total ?? 0}
        page={page}
        limit={limit}
      />
      {selectedBook && (
        <ConfirmDeleteBookModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          selectedBook={selectedBook}
          isPending={pendingDelete}
          setSelectedBook={setSelectedBook}
          onDelete={() => handleDeleteBook({ bookId: selectedBook.id })}
        />
      )}
    </>
  );
};

export default BooksDataTable;
