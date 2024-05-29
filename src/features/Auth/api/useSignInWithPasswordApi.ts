import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabaseClient } from "~/libs/core";
import { toast } from "react-hot-toast";

interface IUseSignInWithPasswordApiParams {
  email: string;
  password: string;
}

export const useSignInWithPasswordApi = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      email,
      password,
    }: IUseSignInWithPasswordApiParams) => {
      const { data, error } = await supabaseClient.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
    onSuccess: async (data) => {
      await queryClient.resetQueries();
      console.log(data.user.user_metadata.user_name);
      toast.success(`Здравствуйте ${data.user.user_metadata.user_name}`);
    },
    onError: (error) => {
      toast.error(`Ошибка входа: ${error.message}`);
    },
  });
};
