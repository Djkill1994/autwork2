import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiKeys, supabaseClient } from "~/libs/core";
import { IUserTableRowTypes } from "~/libs/types";
import { toast } from "react-hot-toast";

export const useUpdateDateFormDataApi = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, { data: IUserTableRowTypes; id: number }>({
    onSuccess: () => {
      toast.success("Изменения успешно сохранены");
      queryClient.invalidateQueries({ queryKey: [ApiKeys.getUserTable] });
    },
    onError: (error: Error) => {
      toast.error(`Ошибка данных ${error.message}`);
    },
    mutationFn: async ({ data, id }) => {
      if (data) {
        await supabaseClient
          .from("users_work_hours")
          .update({
            project: data.project,
            hours_from: data.hours_from,
            hours_to: data.hours_to,
            break_time: data.break_time,
          })
          .eq("id", id);
      }
    },
  });
};
