"use client";

import { getPaginationRange } from "@/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

const ResultsPagination = ({
  total,
  page,
  limit,
}: {
  total: number;
  page: number;
  limit: number;
}) => {
  const pageCount = Math.ceil(total / limit);
  const searchParams = useSearchParams();
  const router = useRouter();
  const navigateToPage = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(pageNumber));
    router.push(`?${params.toString()}`);
  };
  return (
    <>
      <div className="flex items-center justify-end">
        {/* Previous */}
        <button
          className="px-2.5 py-2 bg-brand3 text-[#D6E0FF] mr-2 rounded disabled:opacity-40 disabled:cursor-not-allowed!"
          disabled={page === 1}
          onClick={() => navigateToPage(page - 1)}>
          <ArrowLeft />
        </button>

        {/* Pagination numbers */}
        <div className="flex items-center gap-2">
          {getPaginationRange(page, pageCount).map((item, idx) => {
            if (item === "...") {
              return (
                <span
                  key={idx}
                  className=" px-3 py-1 rounded bg-brand3 text-[#D6E0FF]">
                  …
                </span>
              );
            }

            return (
              <button
                key={idx}
                onClick={() => navigateToPage(item)}
                className={`px-3 py-1 rounded ${
                  item === page
                    ? "bg-[#E7C9A5] text-black"
                    : "bg-brand3 text-[#D6E0FF]"
                }`}>
                {item}
              </button>
            );
          })}
        </div>

        {/* Next */}
        <button
          className="px-2.5 py-2 bg-brand3 text-[#D6E0FF] ml-2 rounded disabled:opacity-40 disabled:cursor-not-allowed!"
          disabled={pageCount === 0 || page === pageCount}
          onClick={() => navigateToPage(page + 1)}>
          <ArrowRight />
        </button>
      </div>
    </>
  );
};

export default ResultsPagination;
