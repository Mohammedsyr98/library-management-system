import { getCurrentUser, signIn, signOut, signUp } from "@/services/services";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";

export const useSignIn = (): UseMutationResult<
  IResponse,
  IErrorResponse,
  SignInFormData
> => {
  return useMutation<IResponse, IErrorResponse, SignInFormData>({
    mutationFn: (data) => signIn(data),
  });
};

export const useSignUp = (): UseMutationResult<
  IResponse,
  IErrorResponse,
  SignUpFormData
> => {
  return useMutation<IResponse, IErrorResponse, SignUpFormData>({
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
