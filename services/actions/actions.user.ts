"use server";

import { createClient } from "@/utils/supabase/supabase-server";
import { updateTag } from "next/cache";

/* -- User Role Management -- */

export const updateUserRole = async ({
  userId,
  newRole,
}: UpdateUserRolePayload) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("users")
    .update({ role: newRole })
    .eq("id", userId)
    .select();

  if (error) {
    return { success: false, message: error.message };
  }

  if (!data || data.length === 0) {
    return { success: false, message: "Update failed. No rows were updated." };
  }

  updateTag("users");
  return { success: true, message: "Role updated successfully" };
};

/* -- Account Requests -- */

export const updateAccountRequest = async ({
  userId,
  action,
}: UpdateAccountRequestPayload) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("users")
    .update({ status: action })
    .eq("id", userId)
    .select();

  if (error) {
    return { success: false, message: error.message };
  }

  if (!data || data.length === 0) {
    return { success: false, message: "Update failed. No rows were updated." };
  }

  updateTag("users");
  updateTag("account-requests");

  return {
    success: true,
    message:
      action === "APPROVED"
        ? "Account approved and access granted."
        : "Account request rejected.",
  };
};

/* -- User Deletion (Edge Function) -- */

export const deleteUser = async ({ userId }: { userId: string }) => {
  const supabase = await createClient();

  // Security: Verify user server-side
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();
  if (authError || !user) {
    return { success: false, message: "Unauthorized access." };
  }

  const { data: sessionData } = await supabase.auth.getSession();
  const token = sessionData.session?.access_token;

  if (!token) {
    return { success: false, message: "No active session found." };
  }

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
    return { success: false, message: data.message || "Delete failed." };
  }

  updateTag("users");
  return {
    success: true,
    message: data.message || "User deleted successfully",
  };
};
