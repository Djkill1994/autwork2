import { createFileRoute } from "@tanstack/react-router";
import { AdminDashboard } from "~/features/Admin/components";
import { useAdminRedirect } from "~/features/Auth/hooks/useAdminRedirect";

const Admin = () => {
  useAdminRedirect();
  return <AdminDashboard />;
};

export const Route = createFileRoute("/_auth/admin")({
  component: Admin,
});
