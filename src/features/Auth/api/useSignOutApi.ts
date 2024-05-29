import { useQuery } from "@tanstack/react-query";
import { ApiKeys, supabaseClient } from "~/libs/core";

export const useSignOutApi = () =>
  useQuery({
    queryKey: [ApiKeys.currentUser],
    queryFn: async () => {
      await supabaseClient.auth.signOut();
    },
  });
