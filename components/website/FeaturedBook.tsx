import { getBookImageUrl } from "@/utils";
import Image from "next/image";
import BorrowButton from "./BorrowButton";

const FeaturedBook = ({ book }: { book: BookRow | null }) => {
  if (!book) return null;

  return (
    <section className="flex flex-col-reverse lg:flex-row h-full gap-10">
      {/* Content */}
      <div className="flex-1 text-white flex flex-col justify-between">
        <div>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-semibold mb-6">
            {book.title}
          </h1>

          {/* Author & Category */}
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <p>
              By{" "}
              <span className="text-[#E7C9A5] font-semibold">
                {book.author}
              </span>
            </p>

            <p>
              Category:
              <span className="text-[#E7C9A5] ml-1 font-semibold">
                {book.genre}
              </span>
            </p>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 mt-5">
            <p>
              Total Books:
              <span className="text-[#E7C9A5] ml-1 font-semibold">
                {book.total_books}
              </span>
            </p>
            <p>
              Available Books:
              <span className="text-[#E7C9A5] ml-1 font-semibold">
                {book.available_books}
              </span>
            </p>
          </div>

          {/* Summary */}
          <p className="mt-6 text-sm sm:text-base line-clamp-6 leading-relaxed">
            {book.summary}
          </p>
        </div>

        {/* Action */}
        <div className="mt-8 lg:mt-0">
          <BorrowButton bookId={book.id} />
        </div>
      </div>

      {/* Image */}
      <div className="flex-1 flex justify-center lg:justify-end">
        <Image
          key={book.id}
          placeholder="blur"
          blurDataURL={
            "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzUwIiBoZWlnaHQ9IjUwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzUwIiBoZWlnaHQ9IjUwMCIgZmlsbD0iI2YzZjRmNiIvPjwvc3ZnPg=="
          }
          src={`${getBookImageUrl(book.image)}?v=${book.updated_at}`}
          alt={book.title}
          width={350}
          height={500}
          className="w-full max-w-60 sm:max-w-[300px] max-h-[500px] lg:max-w-[350px]"
        />
      </div>
    </section>
  );
};

export default FeaturedBook;
