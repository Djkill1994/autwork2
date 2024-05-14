import { useQuery } from "@tanstack/react-query";
import { ApiKeys } from "~/libs/core/apiKeys";
import { supabaseClient } from "~/libs/core/supabaseClient";

export const useGetUsersApi = () =>
  useQuery({
    queryKey: [ApiKeys.getUsers],
    queryFn: async () =>
      supabaseClient
        .from("users")
        .select()
        .then(({ data }) => data),
  });
