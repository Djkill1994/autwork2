import { useQuery } from "@tanstack/react-query";
import { ApiKeys } from "~/libs/core";
import { supabaseClient } from "~/libs/core";

export const useGetUserTableApi = () =>
  useQuery({
    queryKey: [ApiKeys.getUserTable],
    queryFn: async () =>
      supabaseClient
        .from("user_table")
        .select("*")
        .order("date", { ascending: true })
        .then(({ data }) => data),
  });
