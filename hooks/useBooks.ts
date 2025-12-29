import {
  addBook,
  borrowBook,
  deleteBook,
  editBook,
  updateBorrowStatus,
} from "@/services/actions/actions.books";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

export const useAddBook = (): UseMutationResult<
  MutationResult,
  Error,
  FormData
> => {
  return useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await addBook(formData);
      if (!res.success) throw new Error(res.message);
      return res as MutationResult;
    },
  });
};

export const useUpdateBook = (): UseMutationResult<
  MutationResult,
  Error,
  {
    BookFormData: FormData;
    bookId: number;
    imageKey: string;
  }
> => {
  return useMutation({
    mutationFn: async ({ BookFormData, bookId, imageKey }) => {
      const res = await editBook({ BookFormData, bookId, imageKey });
      if (!res.success) throw new Error(res.message);
      return res as MutationResult;
    },
  });
};

export const useBorrowBook = (): UseMutationResult<
  MutationResult,
  Error,
  { book_id: number }
> => {
  return useMutation({
    mutationFn: async ({ book_id }) => {
      const res = await borrowBook({ book_id });
      if (!res.success) throw new Error(res.message);
      return res as MutationResult;
    },
  });
};

export const useUpdateBorrowStatus = (): UseMutationResult<
  MutationResult,
  Error,
  UpdateBorrowStatusParams
> => {
  return useMutation({
    mutationFn: async ({ newStatus, borrowId }) => {
      const res = await updateBorrowStatus({ borrowId, newStatus });
      if (!res.success) throw new Error(res.message);
      return res as MutationResult;
    },
  });
};

export const useDeleteBook = (): UseMutationResult<
  MutationResult,
  Error,
  { bookId: number }
> => {
  return useMutation({
    mutationFn: async ({ bookId }) => {
      const res = await deleteBook({ bookId });
      if (!res.success) throw new Error(res.message);
      return res as MutationResult;
    },
  });
};
