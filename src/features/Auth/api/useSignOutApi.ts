import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiKeys, supabaseClient } from "~/libs/core";

export const useSignOutApi = () => {
  const queryClient = useQueryClient();

  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ApiKeys.currentUser] });
    },
    mutationFn: async () => {
      await supabaseClient.auth.signOut();
    },
  });
};
