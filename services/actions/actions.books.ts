"use server";
import { createClient } from "@/utils/supabase/supabase-server";
import { updateTag } from "next/cache";

/* -- Books Actions -- */

export const addBook = async (formData: FormData) => {
  const supabase = await createClient();

  const imageFile = formData.get("image") as File;
  if (!imageFile) {
    return { success: false, message: "Image is required" };
  }

  const title = formData.get("title") as string;
  const author = formData.get("author") as string;
  const genre = formData.get("genre") as string;
  const summary = formData.get("summary") as string;
  const total_books = Number(formData.get("total_books"));

  const { data, error: uploadImageError } = await supabase.storage
    .from("media")
    .upload(`books/photos/${crypto.randomUUID()}.png`, imageFile, {
      upsert: true,
    });

  if (uploadImageError) {
    return { success: false, message: uploadImageError.message };
  }

  const { error: insertError } = await supabase.from("books").insert([
    {
      title,
      author,
      genre: genre
        .split(/[,\s]+/)
        .map((g) => g.trim())
        .filter(Boolean),
      summary,
      image: data.path,
      total_books,
      available_books: total_books,
    },
  ]);

  if (insertError) {
    await supabase.storage.from("media").remove([data.path]);
    return { success: false, message: insertError.message };
  }

  updateTag("books");
  updateTag("dashboard-insights");
  return { success: true, message: "Book added successfully" };
};

export const editBook = async ({
  BookFormData,
  bookId,
  imageKey,
}: {
  BookFormData: FormData;
  bookId: number;
  imageKey: string;
}) => {
  const supabase = await createClient();
  const imageFile = BookFormData.get("image") as File;

  const { data, error: uploadImageError } = await supabase.storage
    .from("media")
    .upload(`books/photos/${imageKey}`, imageFile, {
      upsert: true,
      cacheControl: "0",
    });

  if (uploadImageError) {
    return { success: false, message: uploadImageError.message };
  }

  const title = BookFormData.get("title") as string;
  const author = BookFormData.get("author") as string;
  const genre = BookFormData.get("genre") as string;
  const summary = BookFormData.get("summary") as string;
  const total_books = Number(BookFormData.get("total_books"));

  const { error: updateError } = await supabase
    .from("books")
    .update({
      title,
      author,
      genre: genre
        .split(/[,\s]+/)
        .map((g) => g.trim())
        .filter(Boolean),
      summary,
      image: data.path,
      total_books,
    })
    .eq("id", bookId);

  if (updateError) {
    await supabase.storage.from("media").remove([data.path]);
    return { success: false, message: updateError.message };
  }

  updateTag("books");
  updateTag("dashboard-insights");
  return { success: true, message: "Book updated successfully" };
};

export const deleteBook = async ({ bookId }: { bookId: number }) => {
  const supabase = await createClient();
  const { error } = await supabase.from("books").delete().eq("id", bookId);

  if (error) {
    return { success: false, message: error.message || "Delete failed." };
  }

  updateTag("books");
  updateTag("dashboard-insights");
  return { success: true, message: "Book deleted successfully" };
};

/* -- Book borrows -- */

export const borrowBook = async ({ book_id }: { book_id: number }) => {
  const supabase = await createClient();
  const { error } = await supabase
    .from("borrow_requests")
    .insert({ book_id, borrow_status: "borrowed" });

  if (error) {
    return { success: false, message: error.message };
  }

  updateTag("books");
  updateTag("borrows");
  updateTag("dashboard-insights");
  return { success: true, message: "Book borrowed successfully" };
};

export const updateBorrowStatus = async ({
  borrowId,
  newStatus,
}: {
  borrowId: number;
  newStatus: "borrowed" | "returned" | "late_return";
}) => {
  const supabase = await createClient();
  const { error } = await supabase
    .from("borrow_requests")
    .update({ borrow_status: newStatus })
    .eq("id", borrowId);

  if (error) {
    return { success: false, message: error.message };
  }

  updateTag("books");
  updateTag("borrows");
  updateTag("dashboard-insights");
  return {
    success: true,
    message: "Borrow request status updated successfully",
  };
};
