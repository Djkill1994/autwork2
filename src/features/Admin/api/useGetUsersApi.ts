import { useQuery } from "@tanstack/react-query";
import { ApiKeys } from "~/libs/core";
import { supabaseClient } from "~/libs/core";

export const useGetUsersApi = () =>
  useQuery({
    queryKey: [ApiKeys.getUsers],
    queryFn: async () =>
      supabaseClient.auth.admin.listUsers().then(({ data }) => data),
  });
