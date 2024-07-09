import { useQuery } from "@tanstack/react-query";
import { ApiKeys, supabaseClient } from "~/libs/core";
import { useCurrentUserApi } from "~/features/Auth/api";

export const useGetRoleApi = () => {
  const {
    data: currentUser,
    isLoading: isLoadingUser,
    error: userError,
  } = useCurrentUserApi();

  return useQuery({
    enabled: !!currentUser?.user?.id && !isLoadingUser && !userError,
    queryKey: [ApiKeys.getUsers, currentUser?.user?.id],
    queryFn: async () => {
      const { data, error } = await supabaseClient
        .from("users")
        .select("role")
        .eq("id", currentUser?.user?.id as string)
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
  });
};
