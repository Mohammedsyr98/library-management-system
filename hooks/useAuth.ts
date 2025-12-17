import { getCurrentUser, signIn, signOut, signUp } from "@/services/services";
import { AuthResponse } from "@supabase/supabase-js";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";

export const useSignIn = (): UseMutationResult<
  AuthResponse["data"],
  IErrorResponse,
  SignInFormData
> => {
  return useMutation<AuthResponse["data"], IErrorResponse, SignInFormData>({
    mutationFn: (data) => signIn(data),
  });
};

export const useSignUp = (): UseMutationResult<
  AuthResponse["data"],
  IErrorResponse,
  SignUpFormData
> => {
  return useMutation<AuthResponse["data"], IErrorResponse, SignUpFormData>({
    mutationFn: (data) => signUp(data),
  });
};

export const useGetCurrentUser = (): UseQueryResult<IResponse, Error> => {
  return useQuery({
    queryKey: ["current-user"],
    queryFn: getCurrentUser,
  });
};
export const useSignOut = (): UseMutationResult<
  ISignOutResponse,
  IErrorResponse,
  void
> => {
  return useMutation<ISignOutResponse, IErrorResponse, void>({
    mutationFn: () => signOut(),
  });
};
