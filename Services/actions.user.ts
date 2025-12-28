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

  if (error) throw new Error(error.message);

  if (!data || data.length === 0) {
    throw new Error("Update failed. No rows were updated.");
  }

  updateTag("users");
  return { message: "Role updated successfully" };
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

  if (error) throw new Error(error.message);

  if (!data || data.length === 0) {
    throw new Error("Update failed. No rows were updated.");
  }

  updateTag("users");

  return {
    message:
      action === "APPROVED"
        ? "Account approved and access granted."
        : "Account request rejected.",
  };
};

/* -- User Deletion (Edge Function) -- */

export const deleteUser = async ({ userId }: { userId: string }) => {
  const supabase = await createClient();

  const { data: sessionData } = await supabase.auth.getSession();

  const token = sessionData.session?.access_token;

  if (!token) throw new Error("Unauthorized: No active session.");

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
    throw new Error(data.message);
  }

  updateTag("users");
  return { message: data.message || "User deleted successfully" };
};
