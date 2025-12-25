import Image from "next/image";
import { CalendarIcon, UserCircle2 } from "lucide-react";
import { getBookImageUrl } from "@/utils";

interface BookRowProps {
  image: string;
  title: string;
  author: string;
  genre: string[];
  date: string;
  userName?: string;
}

const BookRow = ({
  image,
  title,
  author,
  genre,
  date,
  userName,
}: BookRowProps) => {
  return (
    <div className="flex items-start gap-4 bg-[#F8F8FF] rounded-[10px] p-3.5 shadow-sm border border-gray-200">
      <div className="shrink-0">
        <Image
          width={50}
          height={65}
          src={`${getBookImageUrl(image)}?v=${date}`}
          alt={title}
          className="rounded-sm object-cover"
        />
      </div>

      <div className="flex-1 min-w-0 space-y-1">
        <p className="font-semibold text-[15px] md:text-[16px] truncate">
          {title}
        </p>

        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-[#64748B] text-[13px]">
          <p className="truncate">By {author}</p>
          <span className="hidden sm:inline">|</span>
          <p className="truncate">{genre.join(", ")}</p>
        </div>

        <div className="text-[#3A354E] text-[12px] md:text-[13px] flex flex-wrap items-center gap-x-4 gap-y-2 pt-1">
          {userName && (
            <div className="flex items-center gap-1.5 min-w-[120px]">
              <UserCircle2 className="h-4 w-4 text-[#64748B]" />
              <p className="truncate">{userName}</p>
            </div>
          )}

          <div className="flex items-center gap-1.5">
            <CalendarIcon className="h-4 w-4 text-[#64748B]" />
            <p>
              {new Intl.DateTimeFormat("en-US", {
                month: "numeric",
                day: "numeric",
                year: "2-digit",
              }).format(new Date(date))}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BookRow;
