import { getBooks } from "@/Services/server/services";
import { getBookImageUrl } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import NoResults from "@/public/images/noResults.png";

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
    <>
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
          <Link
            href={`/book-details?id=${book.id}`}
            prefetch={true}
            key={book.id}
            className="flex flex-col group">
            <div className="relative aspect-2/3 w-full overflow-hidden rounded-md bg-[#232839]">
              <Image
                src={`${getBookImageUrl(book.image)}?v=${book.updated_at}`}
                alt={book.title}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 200px"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            <p className="mt-3 text-sm font-semibold text-white line-clamp-2 ">
              {book.title}
            </p>

            <p className="text-xs italic text-white/70">{book.genre}</p>
          </Link>
        ))}
      </div>
    </>
  );
};

export default SearchResults;
