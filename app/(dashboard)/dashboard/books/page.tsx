import BooksDataTable from "@/components/dashboard/books/BooksDataTable";
import CreateBookButton from "@/components/dashboard/books/CreateBookButton";
import PageHead from "@/components/dashboard/PageHead";
import { getPaginationInfo } from "@/utils";
import { createClient } from "@/utils/supabase/supabase-server";
import { Suspense } from "react";

const AllBooks = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const { search = "", page } = await searchParams;
  const { from, to, page: pageNumber, limit } = getPaginationInfo(String(page));

  const supabase = await createClient();
  const { data: books, count } = await supabase
    .from("books")
    .select("*", { count: "exact" })
    .or(`title.ilike.%${search}%,author.ilike.%${search}%,genre.cs.{${search}}`)
    .order("created_at", { ascending: false })
    .range(from, to);

  return (
    <div>
      <Suspense fallback={<div></div>}>
        <PageHead />
      </Suspense>
      <div className="bg-white mx-6 p-5 rounded-[14px] mt-10">
        <div className="flex items-end mb-[23px] justify-between">
          <p className="text-[20px] font-semibold text-[#1E293B]">All Books</p>{" "}
          <CreateBookButton />
        </div>

        <BooksDataTable
          data={books ?? []}
          total={count ?? 0}
          page={pageNumber}
          limit={limit}
        />
      </div>
    </div>
  );
};

export default AllBooks;
