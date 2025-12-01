import { signIn, signUp } from "@/Services/services";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

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
