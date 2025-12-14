import BookForm from "@/components/dashboard/books/BookForm";
import { createClient } from "@/utils/supabase/supabase-server";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const supabase = await createClient();
  const bookId = (await params).id;
  const { data: book } = await supabase
    .from("books")
    .select("*")
    .eq("id", Number(bookId));

  console.log(book);
  return (
    <div className="mt-[120px] px-6">
      {book?.[0] && <BookForm editBook={book?.[0]} />}
    </div>
  );
};

export default page;
