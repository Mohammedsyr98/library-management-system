import {
  deleteUser,
  updateAccountRequest,
  updateUserRole,
} from "@/services/actions/actions.user";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

export const useUpdateUserRole = (): UseMutationResult<
  { message: string },
  IErrorResponse,
  UpdateUserRolePayload
> => {
  return useMutation<
    { message: string },
    IErrorResponse,
    UpdateUserRolePayload
  >({
    mutationFn: ({ newRole, userId }) => updateUserRole({ newRole, userId }),
  });
};

export const useDeleteUser = (): UseMutationResult<
  { message: string },
  IErrorResponse,
  { userId: string }
> => {
  return useMutation<{ message: string }, IErrorResponse, { userId: string }>({
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
