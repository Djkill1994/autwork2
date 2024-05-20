import { createFileRoute } from "@tanstack/react-router";
import { AdminDashboard } from "~/features/Admin/components";

const Admin = () => {
  return (
    <>
      <AdminDashboard />
    </>
  );
};

export const Route = createFileRoute("/admin")({
  component: Admin,
});
