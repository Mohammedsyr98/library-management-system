import { getBooks } from "@/Services/server/services";
import Image from "next/image";
import NoResults from "@/public/images/noResults.png";
import BookCard from "../BookCard";

const SearchResults = async ({
  search,
  from,
  to,
}: {
  search: string;
  from: number;
  to: number;
}) => {
  const { data: books } = await getBooks(search, from, to);

  return (
    <div className="min-h-[600px]">
      {books?.length === 0 && (
        <div className=" mt-16 absolute left-1/2 -translate-x-1/2  flex flex-col items-center">
          <Image src={NoResults} height={200} width={200} alt="No-results" />
          <span className="text-[#E7C9A5] text-[24px] font-semibold mt-4">
            No Results Found
          </span>
          <span className="text-white mt-2">
            We couldn’t find any books matching your search.
            <br />
            Try using different keywords or check for typos.
          </span>
        </div>
      )}
      <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-6 md:gap-10">
        {books?.map((book) => (
          <BookCard book={book} key={book.id} />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
