"use client";
import { useTransition } from "react";
import { getPaginationRange } from "@/utils";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useRouter, useSearchParams } from "next/navigation";
import { AiOutlineFileSearch } from "react-icons/ai";
import { Oval } from "react-loader-spinner";

interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  Actions?: React.ComponentType<{ row: T }>;
  total: number;
  page: number;
  limit: number;
}

const DataTable = <T,>({
  data,
  columns,
  Actions,
  total,
  page,
  limit,
}: DataTableProps<T>) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const pageCount = Math.ceil(total / limit);

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    pageCount,
    manualPagination: true,
    state: {
      pagination: {
        pageIndex: page - 1,
        pageSize: limit,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    onPaginationChange: (updater) => {
      const next =
        typeof updater === "function"
          ? updater(table.getState().pagination)
          : updater;

      startTransition(() => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", String(next.pageIndex + 1));
        router.push(`?${params.toString()}`);
      });
    },
  });

  return (
    <div className="space-y-6">
      {/* TABLE */}
      <div className="border relative border-gray-200 rounded-lg overflow-y-auto min-h-[62.9vh] max-h-[62.9vh] ">
        {isPending && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/50 backdrop-blur-[1px]">
            <Oval color="#25388c" height={40} width={40} />
          </div>
        )}
        {data.length === 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500">
            <AiOutlineFileSearch size={48} className="mb-2 text-gray-400" />
            <p className="text-lg">No data found</p>
          </div>
        )}
        <table className="min-w-full max-h-full  table-fixed">
          <thead className="bg-gray-100 sticky top-0">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className={`p-3 text-left font-medium ${
                      header.column.columnDef.meta ?? ""
                    }`}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
                {Actions && <th className="p-3 font-medium">Actions</th>}
              </tr>
            ))}
          </thead>

          {data.length > 0 && (
            <tbody>
              {isPending
                ? null
                : table.getRowModel().rows.map((row) => (
                    <tr key={row.id} className="border-t">
                      {row.getVisibleCells().map((cell) => (
                        <td key={cell.id} className="p-3 font-medium">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                      {Actions && (
                        <td className="p-3">
                          <Actions row={row.original} />
                        </td>
                      )}
                    </tr>
                  ))}
            </tbody>
          )}
        </table>
      </div>

      {/* PAGINATION UI */}
      <div className="flex items-center justify-between">
        {/* Previous */}
        <button
          className="px-4 py-2 border rounded disabled:opacity-40"
          disabled={page === 1}
          onClick={() => table.previousPage()}>
          Previous
        </button>

        {/* Pagination numbers */}
        <div className="flex items-center gap-2">
          {getPaginationRange(page, pageCount).map((item, idx) => {
            if (item === "...") {
              return (
                <span key={idx} className="px-2">
                  …
                </span>
              );
            }

            return (
              <button
                key={idx}
                className={`px-3 py-1 rounded border ${
                  item === page
                    ? "bg-brand1 text-white border-brand1"
                    : "bg-white"
                }`}
                onClick={() => table.setPageIndex(Number(item) - 1)}>
                {item}
              </button>
            );
          })}
        </div>

        {/* Next */}
        <button
          className="px-4 py-2 border rounded disabled:opacity-40"
          disabled={pageCount === 0 || page === pageCount}
          onClick={() => table.nextPage()}>
          Next
        </button>
      </div>
    </div>
  );
};

export default DataTable;
