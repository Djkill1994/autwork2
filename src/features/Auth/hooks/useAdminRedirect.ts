import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useGetRoleApi } from "~/features/Auth/api";

export const useAdminRedirect = () => {
  const { data, isLoading, error } = useGetRoleApi();
  const navigate = useNavigate();

  useEffect(() => {
    if (!(isLoading || error)) {
      const targetPath = data?.role === "admin" ? "/admin" : "/user";
      navigate({ to: targetPath });
    }
  }, [data, isLoading, error, navigate]);
};
