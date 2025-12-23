import BooksDataTable from "@/components/dashboard/books/BooksDataTable";
import CreateBookButton from "@/components/dashboard/books/CreateBookButton";
import PageHead from "@/components/dashboard/PageHead";
import { getBooks } from "@/Services/server/services";
import { getPaginationInfo } from "@/utils";

const AllBooks = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const { search = "", page } = await searchParams;
  const { from, to, page: pageNumber, limit } = getPaginationInfo(String(page));
  const { data: books, count } = await getBooks(search, from, to);

  return (
    <div>
      <PageHead />

      <div className="bg-white mx-6 p-5 rounded-[14px] mt-10">
        <div className="flex items-center mb-[23px] justify-between">
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
