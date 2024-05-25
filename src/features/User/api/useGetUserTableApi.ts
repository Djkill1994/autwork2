import { useQuery } from "@tanstack/react-query";
import { ApiKeys } from "~/libs/core";
import { supabaseClient } from "~/libs/core";

export const useGetUserTableApi = () =>
  useQuery({
    queryKey: [ApiKeys.getUserTable],
    queryFn: async () => {
      const {
        data: { session },
      } = await supabaseClient.auth.getSession();
      if (!session) {
        throw new Error("User is not authenticated");
      }

      const userId = session.user.id;

      const tableName = `user_data_${userId.replace(/-/g, "_")}`;

      // Запрос к таблице авторизованного пользователя
      const { data, error } = await supabaseClient
        .from(tableName)
        .select("*")
        .order("day", { ascending: true });

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
  });
