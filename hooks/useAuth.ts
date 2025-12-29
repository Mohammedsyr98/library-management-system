import {
  getCurrentUser,
  signIn,
  signOut,
  signUp,
} from "@/services/actions/actions.auth";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";

export const useSignIn = (): UseMutationResult<
  MutationResult,
  IErrorResponse,
  SignInFormData
> => {
  return useMutation<MutationResult, IErrorResponse, SignInFormData>({
    mutationFn: (data) => signIn(data),
  });
};

export const useSignUp = (): UseMutationResult<
  MutationResult,
  IErrorResponse,
  SignUpFormData
> => {
  return useMutation<MutationResult, IErrorResponse, SignUpFormData>({
    mutationFn: async (data) => {
      const res = await signUp(data);
      if (!res.success) throw new Error(res.message);
      return res as MutationResult;
    },
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
