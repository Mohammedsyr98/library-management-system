import {
  deleteUser,
  updateAccountRequest,
  updateUserRole,
} from "@/services/actions/actions.user";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
export const useUpdateUserRole = (): UseMutationResult<
  MutationResult,
  Error,
  UpdateUserRolePayload
> => {
  return useMutation({
    mutationFn: async ({ newRole, userId }) => {
      const res = await updateUserRole({ newRole, userId });
      if (!res.success) throw new Error(res.message);
      return res as MutationResult;
    },
  });
};

export const useDeleteUser = (): UseMutationResult<
  MutationResult,
  Error,
  { userId: string }
> => {
  return useMutation({
    mutationFn: async ({ userId }) => {
      const res = await deleteUser({ userId });
      if (!res.success) throw new Error(res.message);
      return res as MutationResult;
    },
  });
};

export const useUpdateAccountStatus = (): UseMutationResult<
  MutationResult,
  Error,
  UpdateAccountRequestPayload
> => {
  return useMutation({
    mutationFn: async ({ action, userId }) => {
      const res = await updateAccountRequest({ userId, action });
      if (!res.success) throw new Error(res.message);
      return res as MutationResult;
    },
  });
};
