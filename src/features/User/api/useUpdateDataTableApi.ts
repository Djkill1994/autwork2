import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiKeys, supabaseClient } from "~/libs/core";
import { IUserTableRowTypes } from "~/libs/types";
import { toast } from "react-hot-toast";

export const useUpdateDataTableApi = () => {
  const queryClient = useQueryClient();
  return useMutation({
    onSuccess: () => {
      toast.success("Изменения успешно сохранены");
      queryClient.invalidateQueries({ queryKey: [ApiKeys.getUserTable] });
    },
    onError: (error) => {
      toast.error(`Ошибка даных ${error.message}`);
    },
    mutationFn: async (data: Partial<IUserTableRowTypes>[]) =>
      Promise.all(
        data.map((update) => {
          if (update.id) {
            return supabaseClient
              .from("users_work_hours")
              .update({
                project: update.project,
                hours_from: update.hours_from,
                hours_to: update.hours_to,
                break_time: update.break_time,
              })
              .eq("id", update.id);
          }
        }),
      ),
  });
};
