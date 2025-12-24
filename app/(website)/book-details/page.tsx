import SimilarBooks from "@/components/website/book-details/SimilarBooks";
import FeaturedBook from "@/components/website/home/FeaturedBook";
import { getBook } from "@/Services/server/services";

const BookDetails = async ({
  searchParams,
}: {
  searchParams: Promise<{ id: string }>;
}) => {
  const bookId = (await searchParams).id;
  const { data: books } = await getBook(bookId);

  return (
    <>
      <FeaturedBook book={books && books[0]} />
      <SimilarBooks currentBook={books && books[0]} />
    </>
  );
};

export default BookDetails;
