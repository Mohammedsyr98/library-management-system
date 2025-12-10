import { deleteUser, updateUserRole } from "@/Services/services";
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
