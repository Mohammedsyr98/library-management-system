import BookCard from "../BookCard";

const PopularBooks = ({ books }: { books: BookRow[] | null }) => {
  if (!books) return null;

  return (
    <section className="mt-12">
      <h2 className="text-white text-2xl sm:text-3xl font-semibold">
        Popular Books
      </h2>

      <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-10">
        {books.map((book) => (
          <BookCard book={book} key={book.id} />
        ))}
      </div>
    </section>
  );
};

export default PopularBooks;
