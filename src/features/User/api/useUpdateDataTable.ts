import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabaseClient } from "~/libs/core";

interface IUseUpdateDataTable {
  id: number;
  project: string | null;
  start_hour: string | null;
  end_hour: string | null;
  break_time: string | null;
}
// ищменить мутацию , что бы обновлялся только один объект, переписать ресет на onSuccess
export const useUpdateDataTable = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: IUseUpdateDataTable[]) => {
      const updatePromises = data.map((update) =>
        supabaseClient
          .from("user_table")
          .update({
            project: update.project,
            start_hour: update.start_hour,
            end_hour: update.end_hour,
            break_time: update.break_time,
          })
          .eq("id", update.id),
      );

      const results = await Promise.all(updatePromises);

      results.forEach((result, index) => {
        if (result.error) {
          console.error(`Error updating row ${data[index].id}:`, result.error);
        } else {
          console.log(`Successfully updated row ${data[index].id}`);
        }
      });
    },
    onSuccess: async () => {
      await queryClient.resetQueries();
    },
  });
};
