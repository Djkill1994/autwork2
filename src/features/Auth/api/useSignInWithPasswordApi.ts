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
      const userId = data.user.id;
      const { data: userRoleData, error: roleError } = await supabaseClient
        .from("users")
        .select("role")
        .eq("id", userId)
        .single();

      if (roleError) {
        throw new Error(roleError.message);
      }

      return { ...data, role: userRoleData.role };
    },
    onSuccess: async (data) => {
      await queryClient.resetQueries();
      toast.success(`Здравствуйте ${data.user.user_metadata.user_name}`);
    },
    onError: (error) => {
      toast.error(`Ошибка входа: ${error.message}`);
    },
  });
};
