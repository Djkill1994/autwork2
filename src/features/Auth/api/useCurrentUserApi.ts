import { useQuery } from "@tanstack/react-query";
import { ApiKeys, supabaseClient } from "~/libs/core";

export const useCurrentUserApi = () =>
  useQuery({
    queryKey: [ApiKeys.currentUser],
    queryFn: async () => {
      const { data } = await supabaseClient.auth.getUser();
      return data;
    },
  });
