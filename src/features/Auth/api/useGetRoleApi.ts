import { useQuery } from "@tanstack/react-query";
import { ApiKeys } from "~/libs/core";
import { supabaseClient } from "~/libs/core";

export const useGetRoleApi = (userId: string) =>
  useQuery({
    queryKey: [ApiKeys.getUsers],
    queryFn: async () =>
      supabaseClient
        .from("users")
        .select("role")
        .eq("id", userId)
        .then(({ data }) => data),
  });
