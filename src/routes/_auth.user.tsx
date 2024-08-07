import { createFileRoute } from "@tanstack/react-router";
import { UserDashboard } from "~/features/User/components";

const User = () => {
  return <UserDashboard />;
};

export const Route = createFileRoute("/_auth/user")({
  component: User,
});
