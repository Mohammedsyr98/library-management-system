"use client";

import { Button } from "@/components/ui/Button";
import { useBorrowBook } from "@/hooks/useBooks";
import { useToast } from "@/hooks/useToast";

const BorrowButton = ({ bookId }: { bookId: number }) => {
  const { mutate, isPending } = useBorrowBook();
  const { showToast } = useToast();

  const handleBorrow = () => {
    mutate(
      { book_id: bookId },
      {
        onSuccess: (res) => {
          showToast(res.message || "Book borrowed successfully", "success");
        },
        onError: (error) => {
          showToast(error.message || "Book borrowed successfully", "error");
        },
      }
    );
  };

  return (
    <Button
      label={"Borrow Book Request"}
      labelWhenPending="Borrowing..."
      variant="lightOrange"
      className="lg:w-[217px]!"
      disabled={isPending}
      onClick={handleBorrow}
    />
  );
};

export default BorrowButton;
