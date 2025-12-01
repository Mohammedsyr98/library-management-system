"use client";

import { useEffect } from "react";
import { useToast } from "../hooks/useToast";
import Cookies from "js-cookie";
export function ToastHandler() {
  const toastKey = Cookies.get("toast");
  const toastType = Cookies.get("toastType") as "error" | "success" | undefined;
  const { showToast } = useToast();

  useEffect(() => {
    if (toastKey) {
      showToast(toastKey, toastType || "error");
    }
  }, [showToast, toastKey, toastType]);

  return null;
}
