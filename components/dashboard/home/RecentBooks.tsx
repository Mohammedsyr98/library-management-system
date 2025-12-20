import BookRow from "./BookRow";
import SectionHeader from "./SectionHeader";

const RecentBooks = ({ books }: { books: BookRow[] }) => {
  return (
    <div className="bg-white w-full rounded-[14px] px-4 py-5 flex flex-col min-h-0">
      <SectionHeader title="Recently Added Books" href="/dashboard/books" />

      <div className="space-y-2.5 mt-3.5 flex-1 overflow-y-auto">
        {books.map((book) => (
          <BookRow
            key={book.id}
            image={book.image ?? ""}
            title={book.title}
            author={book.author}
            genre={book.genre}
            date={book.created_at}
          />
        ))}
      </div>
    </div>
  );
};
export default RecentBooks;
