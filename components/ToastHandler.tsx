"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useToast } from "../hooks/useToast";
import Cookies from "js-cookie";
export function ToastHandler() {
  const searchParams = useSearchParams();
  const { showToast } = useToast();

  useEffect(() => {
    const toastKey = Cookies.get("toast");
    const toastType = Cookies.get("toastType") as
      | "error"
      | "success"
      | undefined;

    if (toastKey) {
      showToast(toastKey, toastType || "error");
    }
  }, [searchParams, showToast]);

  return null;
}
