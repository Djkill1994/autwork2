import { useMutation } from "@tanstack/react-query";
import { supabaseClient } from "~/libs/core";
import { toast } from "react-hot-toast";

export interface IRegistrationForm {
  userName: string;
  email: string;
  password: string;
}

export const useSignUpApi = () => {
  return useMutation({
    mutationFn: async (data: IRegistrationForm) => {
      const { data: userData, error } = await supabaseClient.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: { user_name: data.userName },
        },
      });
      if (error) {
        throw new Error(error.message);
      }

      if (userData && userData?.user?.id) {
        await supabaseClient.rpc("create_work_hours_for_user", {
          user_id: userData?.user?.id,
        });
        return userData;
      }
    },
    onSuccess: (userData) => {
      toast.success(
        `Пользователь ${userData?.user?.user_metadata.user_name} успешно зарегистрирован`,
      );
    },
    onError: (error: Error) => {
      toast.error(`Ошибка при регистрации: ${error.message}`);
    },
  });
};
