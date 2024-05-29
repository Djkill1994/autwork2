import { createFileRoute } from "@tanstack/react-router";
import { AdminDashboard } from "~/features/Admin/components";
import { authGuard } from "~/features/Auth/helpers";

const Admin = () => {
  return (
    <>
      <AdminDashboard />
    </>
  );
};

export const Route = createFileRoute("/admin")({
  component: Admin,
  beforeLoad: ({ location }) => authGuard(location),
});
