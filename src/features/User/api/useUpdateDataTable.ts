import { useMutation } from "@tanstack/react-query";
import { supabaseClient } from "~/libs/core";
import { TableRow } from "~/features/User/components/UserDashboard";

// обновлять таблицу после каждого измеения необходимо, что бы на сервере totalHours считал время
// пофиксить ошибки
export const useUpdateDataTable = () => {
  return useMutation({
    mutationFn: async (data: Partial<TableRow>[]) => {
      const updatePromises = data.map((update) => {
        if (update.id !== undefined) {
          return supabaseClient
            .from("users_work_hours")
            .update({
              project: update.project,
              hours_from: update.hours_from,
              hours_to: update.hours_to,
              break_time: update.break_time,
            })
            .eq("id", update.id);
        } else {
          // Handle case when id is undefined
          console.error("Cannot update row with undefined id:", update);
          return null; // or handle it differently based on your requirements
        }
      });

      const results = await Promise.all(updatePromises.filter(Boolean));

      results.forEach((result, index) => {
        if (result.error) {
          console.error(`Error updating row ${data[index].id}:`, result.error);
        } else {
          console.log(`Successfully updated row ${data[index].id}`);
        }
      });
    },
  });
};
