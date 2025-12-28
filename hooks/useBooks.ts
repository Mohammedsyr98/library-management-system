import {
  addBook,
  borrowBook,
  deleteBook,
  editBook,
  updateBorrowStatus,
} from "@/Services/actions.books";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

export const useAddBook = (): UseMutationResult<
  { message: string },
  IErrorResponse,
  FormData
> => {
  return useMutation({
    mutationFn: (formData: FormData) => addBook(formData),
  });
};

export const useUpdateBook = (): UseMutationResult<
  { message: string },
  IErrorResponse,
  {
    BookFormData: FormData;
    bookId: BookRow["id"];
    imageKey: string;
  }
> => {
  return useMutation<
    { message: string },
    IErrorResponse,
    {
      BookFormData: FormData;
      bookId: BookRow["id"];
      imageKey: string;
    }
  >({
    mutationFn: ({ BookFormData, bookId, imageKey }) =>
      editBook({ BookFormData, bookId, imageKey }),
  });
};

export const useBorrowBook = (): UseMutationResult<
  { message: string },
  IErrorResponse,
  { book_id: number }
> => {
  return useMutation<{ message: string }, IErrorResponse, { book_id: number }>({
    mutationFn: ({ book_id }) => borrowBook({ book_id }),
  });
};
export const useUpdateBorrowStatus = (): UseMutationResult<
  { message: string },
  IErrorResponse,
  UpdateBorrowStatusParams
> => {
  return useMutation<
    { message: string },
    IErrorResponse,
    UpdateBorrowStatusParams
  >({
    mutationFn: ({ newStatus, borrowId }) =>
      updateBorrowStatus({ borrowId, newStatus }),
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
