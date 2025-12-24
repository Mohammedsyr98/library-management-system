import { getBookImageUrl } from "@/utils";
import Image from "next/image";

const PopularBooks = ({ books }: { books: BookRow[] | null }) => {
  if (!books) return null;

  return (
    <section className="mt-12">
      <h2 className="text-white text-2xl sm:text-3xl font-semibold">
        Popular Books
      </h2>

      <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-10">
        {books.map((book) => (
          <div key={book.id} className="flex flex-col">
            <Image
              src={`${getBookImageUrl(book.image)}?v=${book.updated_at}`}
              alt={book.title}
              width={200}
              height={300}
              className="w-full h-auto rounded-md"
            />

            <p className="mt-3 text-sm sm:text-base font-semibold text-white line-clamp-2">
              {book.title}
            </p>

            <p className="text-xs sm:text-sm italic text-white/70">
              {book.genre}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularBooks;
