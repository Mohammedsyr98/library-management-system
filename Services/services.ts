import { supabase } from "@/lib/supabaseClient";

/* -- Auth -- */
export const signIn = async (data: SignInFormData) => {
  const { email, password } = data;

  const { data: userData, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw { message: error.message } as IErrorResponse;

  return userData as IResponse;
};

export const signUp = async (data: SignUpFormData) => {
  const { email, password, university_id, full_name } = data;

  const { data: userData, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name,
        university_id,
      },
    },
  });
  const userId = userData.user?.id;

  if (error) throw { message: error.message } as IErrorResponse;
  if (!userId) throw new Error("User ID not found after signup");
  if (error) throw error;
  return userData as IResponse;
};

export const getCurrentUser = async () => {
  const { data: userData, error } = await supabase.rpc("get_current_user");

  if (error) throw { message: error.message } as IErrorResponse;

  if (error) throw error;
  return userData as IResponse;
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
  return data as IResponse["data"][];
};

export const deleteUser = async ({ userId }: { userId: string }) => {
  const { data, error } = await supabase
    .from("users")
    .delete()
    .eq("id", userId)
    .select();
  if (error) throw { message: error.message } as IErrorResponse;
  if (!data || data.length === 0) {
    throw { message: "Delete failed." } as IErrorResponse;
  }
  return data as IResponse["data"][];
};
