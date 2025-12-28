"use server";

import { createClient } from "@/utils/supabase/supabase-server";

export const signIn = async (data: SignInFormData) => {
  const supabase = await createClient();
  const { email, password } = data;

  const { data: authData, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    throw new Error(error.message);
  }
  const { error: RPCError } = await supabase.rpc("get_current_user");
  if (RPCError) {
    throw new Error(RPCError.message || "Failed to fetch user profile");
  }

  return {
    user: authData.user,
    session: authData.session,
    message: "Welcome back! You have logged in successfully.",
  };
};

export const signUp = async (data: SignUpFormData) => {
  const supabase = await createClient();
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

  if (error) {
    throw new Error(error.message);
  }

  return {
    user: authData.user,
    session: authData.session,
    message:
      "Account created successfully. Please wait for admin approval to activate your account.",
  };
};

export const signOut = async () => {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(error.message);
  }
  return { message: "Signed out successfully" };
};

export const getCurrentUser = async () => {
  const supabase = await createClient();
  const { data: userData, error } = await supabase.rpc("get_current_user");
  if (error) {
    throw new Error(error.message);
  }
  return userData;
};
