import {
  addBook,
  deleteBook,
  editBook,
  updateBorrowStatus,
} from "@/Services/services";
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
    mutationFn: ({ BookFormData }) => addBook({ BookFormData }),
  });
};

export const useUpdateBook = (): UseMutationResult<
  { message: string },
  IErrorResponse,
  {
    BookFormData: BookFormData;
    bookId: BookRow["id"];
    imageKey: string;
  }
> => {
  return useMutation<
    { message: string },
    IErrorResponse,
    {
      BookFormData: BookFormData;
      bookId: BookRow["id"];
      imageKey: string;
    }
  >({
    mutationFn: ({ BookFormData, bookId, imageKey }) =>
      editBook({ BookFormData, bookId, imageKey }),
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
