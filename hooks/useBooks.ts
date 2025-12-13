import { AddBook, deleteBook } from "@/Services/services";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

export const useAddBook = (): UseMutationResult<
  { message: string },
  IErrorResponse,
  {
    BookFormData: BookFormData;
  }
> => {
  return useMutation<
    { message: string },
    IErrorResponse,
    {
      BookFormData: BookFormData;
    }
  >({
    mutationFn: ({ BookFormData }) => AddBook({ BookFormData }),
  });
};

export const useDeleteBook = (): UseMutationResult<
  { message: string },
  IErrorResponse,
  { bookId: BookRow["id"] }
> => {
  return useMutation<
    { message: string },
    IErrorResponse,
    { bookId: BookRow["id"] }
  >({
    mutationFn: ({ bookId }) => deleteBook({ bookId }),
  });
};
