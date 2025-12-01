"use client";

import toast from "react-hot-toast";

const toastMessages: Record<string, string> = {
  ACCESS_DENIED:
    "You don’t have access to this page. If you think this is a mistake, please contact support.",
};

export function useToast() {
  function showToast(key: string, type: "error" | "success" = "error") {
    const message = toastMessages[key] || key;

    if (type === "success") toast.success(message);
    else toast.error(message);
  }

  return { showToast };
}
