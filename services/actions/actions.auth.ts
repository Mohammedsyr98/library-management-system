"use server";

import { createClient } from "@/utils/supabase/supabase-server";

export const signIn = async (data: SignInFormData) => {
  const supabase = await createClient();
  const { email, password } = data;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return {
      success: false,
      message: error.message || "Login failed. Please try again.",
    };
  }
  const { error: RPCError } = await supabase.rpc("get_current_user");
  if (RPCError) {
    await supabase.auth.signOut();
    return {
      success: false,
      message:
        RPCError.message ||
        "Access denied. Your account may be pending approval.",
    };
  }
  return {
    success: true,
    message: "Welcome back! You have logged in successfully.",
  };
};

export const signUp = async (data: SignUpFormData) => {
  const supabase = await createClient();
  const { email, password, university_id, full_name } = data;

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name,
        university_id,
      },
    },
  });
  await supabase.auth.signOut();
  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  return {
    success: true,
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
