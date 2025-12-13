"use client";

import { Button } from "@/components/ui/Button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

const CreateBookButton = () => {
  const router = useRouter();
  return (
    <Button
      className="w-[180px]! h-10! justify-start!"
      prefixIcon={<Plus className="text-white h-5 ml-1" />}
      variant="brand1"
      label="Create new book"
      onClick={() => router.push("books/new-book")}
    />
  );
};

export default CreateBookButton;
