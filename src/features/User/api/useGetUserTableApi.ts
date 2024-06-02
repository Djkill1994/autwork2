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

      const { data, error } = await supabaseClient
        .from("users_work_hours")
        .select("*")
        .eq("user_id", userId)
        .order("day", { ascending: true });

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
  });
