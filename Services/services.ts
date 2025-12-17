import { supabase } from "@/lib/supabaseClient";

/* -- Auth -- */
export const signIn = async (data: SignInFormData) => {
  const { email, password } = data;

  const { data: authData, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw { message: error.message } as IErrorResponse;

  return authData;
};

export const signUp = async (data: SignUpFormData) => {
  const { email, password, university_id, full_name } = data;

  const { data: authData, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name,
        university_id,
      },
    },
  });
  const userId = authData.user?.id;

  if (error) throw { message: error.message } as IErrorResponse;
  if (!userId) throw new Error("User ID not found after signup");
  if (error) throw error;
  return authData;
};

export const getCurrentUser = async () => {
  const { data: userData, error } = await supabase.rpc("get_current_user");

  if (error) throw { message: error.message } as IErrorResponse;

  if (error) throw error;
  return userData;
};
export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
  return { message: "Signed out successfully" };
};

/* -- Users -- */
export async function getUsers() {
  const { data: users, error } = await supabase.from("users").select("*");

  if (error) throw new Error(error.message);
  return users ?? [];
}

export const updateUserRole = async ({
  userId,
  newRole,
}: UpdateUserRolePayload) => {
  const { data, error } = await supabase
    .from("users")
    .update({ role: newRole })
    .eq("id", userId)
    .select();

  if (error) throw { message: error.message } as IErrorResponse;
  // Check for no rows updated
  if (!data || data.length === 0) {
    throw { message: "Update failed. No rows were updated." } as IErrorResponse;
  }
  return data;
};
export const updateAccountRequest = async ({
  userId,
  action,
}: UpdateAccountRequestPayload) => {
  const { data, error } = await supabase
    .from("users")
    .update({ status: action })
    .eq("id", userId)
    .select();

  if (error) throw { message: error.message } as IErrorResponse;
  if (!data || data.length === 0) {
    throw { message: "Update failed. No rows were updated." } as IErrorResponse;
  }
  return {
    message:
      action === "APPROVED"
        ? "Account approved and access granted."
        : "Account request rejected.",
  };
};

export const deleteUser = async ({ userId }: { userId: string }) => {
  const token = (await supabase.auth.getSession()).data.session?.access_token;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/bright-worker`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ userId }),
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw { message: data.message || "Delete failed." };
  }

  return data;
};

/* -- Books -- */

export const addBook = async ({
  BookFormData,
}: {
  BookFormData: BookFormData;
}) => {
  const { data, error: uploadImageError } = await supabase.storage
    .from("media")
    .upload(`books/photos/${crypto.randomUUID()}.png`, BookFormData.image!, {
      upsert: true,
    });
  if (uploadImageError)
    throw { message: uploadImageError.message } as IErrorResponse;
  const { error: insertError } = await supabase
    .from("books")
    .insert([
      {
        title: BookFormData.title,
        author: BookFormData.author,
        genre: BookFormData.genre
          .split(/[,\s]+/)
          .map((g) => g.trim())
          .filter(Boolean),
        summary: BookFormData.summary,
        image: data.path,
        total_books: BookFormData.total_books,
        available_books: BookFormData.total_books,
      },
    ])
    .select();
  if (insertError) {
    await supabase.storage.from("media").remove([data.path]);
    throw insertError;
  }
  return { message: "Book added successfully" };
};

export const editBook = async ({
  BookFormData,
  bookId,
  imageKey,
}: {
  BookFormData: BookFormData;
  bookId: BookRow["id"];
  imageKey: string;
}) => {
  const { data, error: uploadImageError } = await supabase.storage
    .from("media")
    .upload(`books/photos/${imageKey}`, BookFormData.image!, {
      upsert: true,
      cacheControl: "0",
    });
  if (uploadImageError)
    throw { message: uploadImageError.message } as IErrorResponse;
  const { error: insertError } = await supabase
    .from("books")
    .update({
      title: BookFormData.title,
      author: BookFormData.author,
      genre: BookFormData.genre
        .split(/[,\s]+/)
        .map((g) => g.trim())
        .filter(Boolean),
      summary: BookFormData.summary,
      image: data.path,
      total_books: BookFormData.total_books,
    })
    .eq("id", bookId)
    .select();
  if (insertError) {
    await supabase.storage.from("media").remove([data.path]);
    throw insertError;
  }
  return { message: "Book updated successfully" };
};

export const deleteBook = async ({ bookId }: { bookId: BookRow["id"] }) => {
  const { error } = await supabase.from("books").delete().eq("id", bookId);

  if (error) {
    throw { message: error.message || "Delete failed." };
  }

  return { message: "Book deleted successfully" };
};

/* -- Book borrows -- */

export const updateBorrowStatus = async ({
  borrowId,
  newStatus,
}: UpdateBorrowStatusParams) => {
  const { error } = await supabase
    .from("borrow_requests")
    .update({ borrow_status: newStatus })
    .eq("id", borrowId)
    .select();
  if (error) throw { message: error.message } as IErrorResponse;
  return { message: "Borrow request status updated successfully" };
};
