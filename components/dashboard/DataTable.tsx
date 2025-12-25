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
      <div className="border border-gray-200 rounded-lg overflow-x-hidden bg-white">
        <div className="relative min-h-[62.9vh] max-h-[62.9vh] overflow-y-auto">
          {isPending && (
            <div className="absolute inset-0 z-30 flex items-center justify-center bg-white/50 backdrop-blur-[1px]">
              <Oval color="#25388c" height={40} width={40} />
            </div>
          )}

          {data.length === 0 && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-gray-500">
              <AiOutlineFileSearch size={48} className="mb-2 text-gray-400" />
              <p className="text-lg">No data found</p>
            </div>
          )}

          <table className="min-w-[800px] lg:min-w-full table-fixed border-collapse">
            <thead className="bg-gray-100 sticky top-0 z-20">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className={`p-3 text-left font-medium bg-gray-100 ${
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
                  {Actions && (
                    <th className="p-3 font-medium bg-gray-100">Actions</th>
                  )}
                </tr>
              ))}
            </thead>

            {data.length > 0 && (
              <tbody className="bg-white">
                {isPending
                  ? null
                  : table.getRowModel().rows.map((row) => (
                      <tr
                        key={row.id}
                        className="border-t hover:bg-gray-50 transition-colors">
                        {row.getVisibleCells().map((cell) => (
                          <td key={cell.id} className="p-3 font-medium ">
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
      </div>

      {/* PAGINATION UI */}
      <div className="flex flex-col sm:flex-row items-center justify-end gap-4">
        <div className="flex items-center justify-between w-full sm:w-auto gap-2">
          <button
            className="flex-1 sm:flex-none px-4 py-2 border rounded disabled:opacity-40 bg-white"
            disabled={page === 1}
            onClick={() => table.previousPage()}>
            Previous
          </button>

          <div className="hidden sm:flex items-center gap-2">
            {getPaginationRange(page, pageCount).map((item, idx) => (
              <button
                key={idx}
                className={`px-3 py-1 rounded border ${
                  item === page ? "bg-brand1 text-white" : "bg-white"
                }`}
                onClick={() =>
                  typeof item === "number" && table.setPageIndex(item - 1)
                }>
                {item}
              </button>
            ))}
          </div>

          <button
            className="flex-1 sm:flex-none px-4 py-2 border rounded disabled:opacity-40 bg-white"
            disabled={pageCount === 0 || page === pageCount}
            onClick={() => table.nextPage()}>
            Next
          </button>
        </div>

        {/* Page Indicator for mobile only */}
        <div className="sm:hidden text-sm text-gray-500">
          Page {page} of {pageCount}
        </div>
      </div>
    </div>
  );
};

export default DataTable;
