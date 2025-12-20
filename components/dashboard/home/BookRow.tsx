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
    <div className="flex items-start gap-2.5 bg-[#F8F8FF] rounded-[10px] p-3.5 shadow-sm border border-gray-200">
      <Image
        width={50}
        height={65}
        src={`${getBookImageUrl(image)}?v=${date}`}
        alt={title}
      />

      <div className="space-y-1.5">
        <p className="font-semibold text-[16px]">{title}</p>

        <div className="flex items-center gap-2 text-[#64748B]">
          <p>By {author}</p> | <p>{genre.join("")}</p>
        </div>

        <div className="text-[#3A354E] text-[13px] flex items-center gap-2">
          {userName && (
            <div className="flex items-center min-w-[120px]">
              <UserCircle2 className="h-5" />
              <p>{userName}</p>
            </div>
          )}

          <div className="flex items-center">
            <CalendarIcon className="h-5" />
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
