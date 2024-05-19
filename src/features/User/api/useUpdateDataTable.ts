import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabaseClient } from "~/libs/core";

interface IUseUpdateDataTable {
  id: number;
  project: string | null;
  start_hour: string | null;
  end_hour: string | null;
  break_time: string | null;
}

export const useUpdateDataTable = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: IUseUpdateDataTable) =>
      supabaseClient.from("user_table").update(data).eq("id", data.id),
    onSuccess: async () => {
      await queryClient.resetQueries();
    },
  });
};
