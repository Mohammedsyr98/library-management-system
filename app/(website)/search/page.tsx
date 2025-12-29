import ResultsLoadingSpinner from "@/components/website/search/ResultsLoadingSpinner";
import ResultsPagination from "@/components/website/search/ResultsPagination";
import SearchBar from "@/components/website/search/SearchBar";
import SearchResults from "@/components/website/search/SearchResults";
import { getBooks } from "@/services/queries/books";
import { getPaginationInfo } from "@/utils";
import React, { Suspense } from "react";

const Search = async ({
  searchParams,
}: {
  searchParams: Promise<{ [search: string]: string | undefined }>;
}) => {
  const { search = "", page = "1" } = await searchParams;
  const suspenseKey = `${search}-${page}`;

  const {
    from,
    to,
    page: pageNumber,
    limit,
  } = getPaginationInfo(String(page), 14);
  const { count } = await getBooks(search, from, to);
  return (
    <>
      <section className="flex flex-col items-center text-center px-4">
        <p className="text-[#D6E0FF] text-base md:text-[18px] font-semibold tracking-wide mb-2">
          Discover Your Next Great Read:
        </p>

        <h1 className="text-2xl md:text-5xl lg:text-[56px] font-bold text-white leading-tight max-w-[700px]">
          Explore and Search for
          <span className="text-[#FFE1BD] block sm:inline"> Any Book</span> In
          Our Library
        </h1>

        <SearchBar />
      </section>
      <span className="text-[30px] font-semibold text-white mt-6">
        Search Results for <span className="text-[#E7C9A5]">{search}</span>
      </span>
      <section className="flex flex-col  justify-between relative">
        <Suspense
          key={suspenseKey}
          fallback={
            <div className="absolute z-10 flex items-center justify-center  mt-20  left-1/2 -translate-x-1/2">
              <ResultsLoadingSpinner />
            </div>
          }>
          <SearchResults search={search} from={from} to={to} />
          {count !== 0 && (
            <ResultsPagination
              page={pageNumber}
              limit={limit}
              total={Number(count)}
            />
          )}
        </Suspense>
      </section>
    </>
  );
};

export default Search;
