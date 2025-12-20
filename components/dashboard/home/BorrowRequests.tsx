import SectionHeader from "./SectionHeader";
import BookRow from "./BookRow";

const BorrowRequests = ({ requests }: { requests: BookRequestRow[] }) => {
  return (
    <div className="bg-white w-full rounded-[14px] px-4 py-5">
      <SectionHeader
        title="Borrow Requests"
        href="/dashboard/borrow-requests"
      />

      <div className="space-y-2.5 mt-3.5">
        {requests.map((request) => (
          <BookRow
            key={request.id}
            image={request.book_image}
            title={request.book_title}
            author={request.author}
            genre={request.book_genre}
            date={request.borrowed_at}
            userName={request.user_full_name}
          />
        ))}
      </div>
    </div>
  );
};

export default BorrowRequests;
