import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabaseClient } from "~/libs/core";

interface IUseSignInWithPasswordApiParams {
  email: string;
  password: string;
}

export const useSignInWithPasswordApi = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ email, password }: IUseSignInWithPasswordApiParams) =>
      supabaseClient.auth.signInWithPassword({
        email,
        password,
      }),
    onSuccess: async () => {
      await queryClient.resetQueries();
    },
  });
};
