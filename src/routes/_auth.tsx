import {
  createFileRoute,
  Outlet,
  useNavigate,
  useRouterState,
} from "@tanstack/react-router";
import { useEffect } from "react";
import { useCurrentUserApi } from "~/features/Auth/api";

const Auth = () => {
  const navigate = useNavigate();
  const { location } = useRouterState();
  const { error: userError } = useCurrentUserApi();

  useEffect(() => {
    if (userError) navigate({ to: "/", search: { redirect: location.href } });
  }, [userError]);

  return (
    <>
      <Outlet />
    </>
  );
};

export const Route = createFileRoute("/_auth")({
  component: Auth,
});
