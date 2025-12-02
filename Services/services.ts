import { supabase } from "@/lib/supabaseClient";

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
