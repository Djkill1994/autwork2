import { useMutation } from "@tanstack/react-query";
import { supabaseClient } from "~/libs/core";
import { useNavigate } from "@tanstack/react-router";

export const useSignOutApi = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => supabaseClient.auth.signOut(),
    onSuccess: () => navigate({ to: "/" }),
  });
};
