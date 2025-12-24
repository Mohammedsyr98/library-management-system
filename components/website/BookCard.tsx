import Image from "next/image";
import Link from "next/link";
import { getBookImageUrl } from "@/utils";

const BookCard = ({ book }: { book: BookRow }) => {
  return (
    <Link
      href={`/book-details?id=${book.id}`}
      prefetch={true}
      className="flex flex-col group w-full">
      <div className="relative aspect-2/3 w-full overflow-hidden rounded-md bg-[#232839]">
        <Image
          src={`${getBookImageUrl(book.image)}?v=${book.updated_at}`}
          alt={book.title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 200px"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Book Info */}
      <div className="flex flex-col mt-3">
        <p className="text-sm font-semibold text-white line-clamp-2 leading-tight">
          {book.title}
        </p>
        <p className="text-xs italic text-white/70 mt-1">{book.genre}</p>
      </div>
    </Link>
  );
};

export default BookCard;
