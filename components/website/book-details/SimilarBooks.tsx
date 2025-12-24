import { getSimilarBooks } from "@/Services/server/services";
import { getBookImageUrl } from "@/utils";
import Image from "next/image";
import Link from "next/link";

const SimilarBooks = async ({
  currentBook,
}: {
  currentBook: BookRow | null;
}) => {
  if (!currentBook) return null;
  const { data: books } = await getSimilarBooks(
    currentBook.genre,
    currentBook.author,
    currentBook.id
  );
  return (
    <section className="mt-12">
      <h2 className="text-white text-2xl sm:text-3xl font-semibold">
        More Similar Books
      </h2>

      <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-10">
        {books?.map((book) => (
          <Link
            href={`/book-details?id=${book.id}`}
            prefetch={true}
            key={book.id}
            className="flex flex-col">
            <Image
              src={`${getBookImageUrl(book.image)}?v=${book.updated_at}`}
              alt={book.title}
              width={200}
              height={270}
              className="w-full min-h-[270px] max-h-[270px] rounded-md"
            />

            <p className="mt-3 text-sm sm:text-base font-semibold text-white line-clamp-2">
              {book.title}
            </p>

            <p className="text-xs sm:text-sm italic text-white/70">
              {book.genre}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default SimilarBooks;
