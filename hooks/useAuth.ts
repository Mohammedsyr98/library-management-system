import {
  getCurrentUser,
  signIn,
  signOut,
  signUp,
} from "@/Services/actions.auth";
import { AuthResponse } from "@supabase/supabase-js";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";

export const useSignIn = (): UseMutationResult<
  AuthResponse["data"] & { message: string },
  IErrorResponse,
  SignInFormData
> => {
  return useMutation<
    AuthResponse["data"] & { message: string },
    IErrorResponse,
    SignInFormData
  >({
    mutationFn: (data) => signIn(data),
  });
};

export const useSignUp = (): UseMutationResult<
  AuthResponse["data"] & { message: string },
  IErrorResponse,
  SignUpFormData
> => {
  return useMutation<
    AuthResponse["data"] & { message: string },
    IErrorResponse,
    SignUpFormData
  >({
    mutationFn: (data) => signUp(data),
  });
};

export const useGetCurrentUser = (): UseQueryResult<IResponse, Error> => {
  return useQuery({
    queryKey: ["current-user"],
    queryFn: getCurrentUser,
    retry: false,
    staleTime: 0,
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
