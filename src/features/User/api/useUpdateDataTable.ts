import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabaseClient } from "~/libs/core";

interface IUseUpdateDataTable {
  id: number;
  project: string | null;
  hours_from: string | null;
  hours_to: string | null;
  break_time: string | null;
}
// ищменить мутацию , что бы обновлялся только один объект, переписать ресет на onSuccess
export const useUpdateDataTable = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: IUseUpdateDataTable[]) => {
      const {
        data: { session },
      } = await supabaseClient.auth.getSession();
      if (!session) {
        throw new Error("User is not authenticated");
      }

      const userId = session.user.id;

      const tableName = `user_data_${userId.replace(/-/g, "_")}`;
      const updatePromises = data.map((update) =>
        supabaseClient
          .from(tableName)
          .update({
            project: update.project,
            hours_from: update.hours_from,
            hours_to: update.hours_to,
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
