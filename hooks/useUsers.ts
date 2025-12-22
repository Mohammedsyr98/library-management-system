import {
  deleteUser,
  updateAccountRequest,
  updateUserRole,
} from "@/Services/client/services";
import { User } from "@supabase/supabase-js";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

export const useUpdateUserRole = (): UseMutationResult<
  IResponse["data"][],
  IErrorResponse,
  UpdateUserRolePayload
> => {
  return useMutation<
    IResponse["data"][],
    IErrorResponse,
    UpdateUserRolePayload
  >({
    mutationFn: ({ newRole, userId }) => updateUserRole({ newRole, userId }),
  });
};

export const useDeleteUser = (): UseMutationResult<
  User,
  IErrorResponse,
  { userId: string }
> => {
  return useMutation<User, IErrorResponse, { userId: string }>({
    mutationFn: ({ userId }) => deleteUser({ userId }),
  });
};

export const useUpdateAccountStatus = (): UseMutationResult<
  { message: string },
  IErrorResponse,
  UpdateAccountRequestPayload
> => {
  return useMutation<
    { message: string },
    IErrorResponse,
    UpdateAccountRequestPayload
  >({
    mutationFn: ({ action, userId }) =>
      updateAccountRequest({ userId, action }),
  });
};
