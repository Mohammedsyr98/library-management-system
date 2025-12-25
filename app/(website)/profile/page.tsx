import { getBorrowRequests } from "@/Services/server/services";
import { getBookImageUrl } from "@/utils";
import Image from "next/image";
import { Calendar, CheckCircle2, AlertTriangle, Clock } from "lucide-react";

const formatDate = (date: string) => {
  const d = new Date(date);

  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
  });
};

const getDaysLeft = (dueDate: string) => {
  const due = new Date(dueDate).setHours(0, 0, 0, 0);
  const today = new Date().setHours(0, 0, 0, 0);

  const diff = due - today;
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};

const Profile = async () => {
  const { data: borrow_requests } = await getBorrowRequests();

  return (
    <section>
      <h2 className="text-white text-2xl sm:text-3xl font-semibold">
        Borrowed Books
      </h2>

      <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-6 md:gap-10">
        {borrow_requests?.map((book) => {
          const daysLeft = getDaysLeft(book.due_date);
          const isOverdue = daysLeft < 0;
          const isReturned = Boolean(book.returned_at);

          return (
            <div
              key={book.book_id}
              className={`p-5 rounded-[10px] bg-[#12141D] ${
                isOverdue ? "border border-red-500/40" : ""
              }`}>
              {/* Book Image */}
              <div className="relative aspect-2/3 w-full overflow-hidden rounded-md bg-[#232839]">
                <Image
                  src={`${getBookImageUrl(
                    book.book_image
                  )}?v=${book.borrowed_at}&${book.due_date}`}
                  alt={book.book_title}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 200px"
                  className="object-cover"
                />
              </div>

              {/* Book Info */}
              <div className="flex flex-col mt-3 min-h-[54px]">
                <p className="text-sm font-semibold text-white line-clamp-2 leading-tight">
                  {book.book_title}
                </p>
                <p className="text-xs italic text-white/70 mt-1">
                  {book.book_genre}
                </p>
              </div>

              {/* Borrowed On */}
              <div className="mt-3 flex items-start gap-2 text-sm text-white/80">
                <Calendar size={16} className="mt-0.5" />
                <div>
                  <span className="text-xs text-white/60">
                    Borrowed on {formatDate(book.borrowed_at)}
                  </span>
                </div>
              </div>

              {/* Status */}
              {isReturned && (
                <div className="mt-2 flex items-center gap-2 text-green-400 text-xs whitespace-nowrap">
                  <CheckCircle2 size={16} />
                  <span>Returned on {formatDate(book.returned_at)}</span>
                </div>
              )}

              {!isReturned && isOverdue && (
                <div className="mt-2 flex items-center gap-2 text-red-400 text-xs whitespace-nowrap">
                  <AlertTriangle size={16} />
                  <span>Overdue</span>
                </div>
              )}

              {!isReturned && !isOverdue && (
                <div className="mt-2 flex items-center gap-2 text-yellow-400 text-xs whitespace-nowrap">
                  <Clock size={16} />
                  <span>{daysLeft} days left</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Profile;
